/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { initializeSocketConnection } from '../socket/SocketUtils'
import { useDispatch, useSelector } from 'react-redux'

const VideoCall = () => {
	const user = useSelector(state => state.user)
	const userId = user?._id
	const otherUserId = userId === '664e30e04851ad8ed21d0842' ? '664e32514851ad8ed21d0846' : '664e30e04851ad8ed21d0842'
	const localVideoRef = useRef(null)
	const remoteVideoRef = useRef(null)
	const peerConnection = useRef(new RTCPeerConnection())
	const socket = useRef(null)
	const [isCallStarted, setIsCallStarted] = useState(false)
	const [isCallIncoming, setIsCallIncoming] = useState(false)
	const [incomingCallFrom, setIncomingCallFrom] = useState(null)
	const dispatch = useDispatch()

	useEffect(() => {
		socket.current = initializeSocketConnection(dispatch)

		socket.current.on('incoming-call', ({ from }) => {
			setIsCallIncoming(true)
			setIncomingCallFrom(from)
		})

		socket.current.on('call-accepted', ({ from, to }) => {
			if (to === userId) {
				startCall()
			}
		})

		socket.current.on('offer', async (data) => {
			if (peerConnection.current.signalingState !== 'stable') {
				console.error('Peer connection is not in stable state')
				return
			}
			try {
				await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.offer))
				const answer = await peerConnection.current.createAnswer()
				await peerConnection.current.setLocalDescription(answer)
				socket.current.emit('answer', { to: data.from, answer })
			} catch (error) {
				console.error('Failed to handle offer:', error)
			}
		})

		socket.current.on('answer', async (data) => {
			if (peerConnection.current.signalingState !== 'have-local-offer') {
				console.error('Peer connection is not in have-local-offer state')
				return
			}
			try {
				await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.answer))
			} catch (error) {
				console.error('Failed to handle answer:', error)
			}
		})

		socket.current.on('candidate', async (data) => {
			try {
				await peerConnection.current.addIceCandidate(new RTCIceCandidate(data.candidate))
			} catch (error) {
				console.error('Failed to add ICE candidate:', error)
			}
		})

		return () => {
			socket.current.disconnect()
			peerConnection.current.close()
		}
	}, [dispatch])

	const startLocalVideo = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
			localVideoRef.current.srcObject = stream
			stream.getTracks().forEach(track => peerConnection.current.addTrack(track, stream))

			peerConnection.current.onicecandidate = event => {
				if (event.candidate) {
					socket.current.emit('candidate', { to: otherUserId, candidate: event.candidate })
				}
			}

			peerConnection.current.ontrack = event => {
				remoteVideoRef.current.srcObject = event.streams[0]
			}
		} catch (error) {
			console.error('Failed to start local video:', error)
		}
	}

	const initiateCall = async () => {
		try {
			await startLocalVideo()
			socket.current.emit('call-user', { from: userId, to: otherUserId })
			startCall() // Start the call immediately after initiating
		} catch (error) {
			console.error('Failed to initiate call:', error)
		}
	}

	const acceptCall = async () => {
		try {
			await startLocalVideo()
			socket.current.emit('accept-call', { from: incomingCallFrom, to: userId })
			setIsCallIncoming(false) // Mark incoming call as accepted
		} catch (error) {
			console.error('Failed to accept call:', error)
		}
	}

	const startCall = async () => {
		try {
			const offer = await peerConnection.current.createOffer()
			await peerConnection.current.setLocalDescription(offer)
			socket.current.emit('offer', { from: userId, to: otherUserId, offer })
			setIsCallStarted(true) // Mark call as started
		} catch (error) {
			console.error('Failed to start call:', error)
		}
	}

	const endCall = () => {
		try {
			peerConnection.current.close()
			socket.current.disconnect()
			setIsCallStarted(false) // Mark call as ended
		} catch (error) {
			console.error('Failed to end call:', error)
		}
	}

	return (
		<div className='flex flex-col gap-5'>
			<div>
				{!isCallStarted && !isCallIncoming ? (
					<button onClick={initiateCall}>Call User</button>
				) : isCallIncoming ? (
					<div>
						<p>Incoming call from {incomingCallFrom}</p>
						<button onClick={acceptCall}>Accept Call</button>
					</div>
				) : (
					<button onClick={endCall}>End Call</button>
				)}
			</div>
			<video ref={localVideoRef} autoPlay playsInline className='w-[200px] h-[200px]'/>
			<video ref={remoteVideoRef} autoPlay playsInline className='w-[200px] h-[200px]'/>
		</div>
	)
}

export default VideoCall
