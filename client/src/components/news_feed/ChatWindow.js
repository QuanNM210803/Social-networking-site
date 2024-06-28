/* eslint-disable react/jsx-key */
/* eslint-disable no-console */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { FaVideo } from 'react-icons/fa'
import { IoIosCall } from 'react-icons/io'
import { FaImage } from 'react-icons/fa'
import { IoMdSend } from 'react-icons/io'
import { useSelector } from 'react-redux'
import Avatar from '../Avatar'
import { Link } from 'react-router-dom'
import uploadFile from '../../helpers/UploadFile'
import Loading from '../Loading'
import { IoCloseOutline } from 'react-icons/io5'
import moment from 'moment'

const ChatWindow = ({ handleCloseChatWindow, friendChat, socketConnection }) => {
	const user=useSelector(state => state?.user)
	const textareaRef = useRef(null)
	const [loading, setLoading]=useState(false)
	const [message, setMessage] = useState({
		text:'',
		imageUrl:'',
		videoUrl:''
	})

	const [allMessages, setAllMessages]=useState([])
	const currentMessage= useRef()

	useEffect(() => {
		if (currentMessage) {
			currentMessage.current?.scrollIntoView({ behavior:'smooth', block:'end' })
		}
	}, [allMessages])

	useEffect(() => {
		if (socketConnection) {
			socketConnection.emit('message-page', friendChat?._id)
			socketConnection.emit('seen', friendChat?._id)
			socketConnection.on('message-user', (data) => {
				console.log('message-user', data)
			})

			socketConnection.on('message', (data) => {
				setAllMessages(data)
			})

		}
	}, [socketConnection, friendChat?._id, user])

	const handleSendMessage=(e) => {
		// e.preventDefault()
		if (message.text || message.imageUrl || message.videoUrl) {
			if (socketConnection) {
				socketConnection.emit('new-message', {
					sender: user?._id,
					receiver: friendChat?._id,
					text: message.text,
					imageUrl: message.imageUrl,
					videoUrl: message.videoUrl,
					msgByUserId: user?._id
				})
				setMessage({
					text:'',
					imageUrl:'',
					videoUrl:''
				})
				textareaRef.current.style.height='auto'
			}
		}
	}

	const handleChangeFile=async(e) => {
		const file=e?.target?.files[0]
		setLoading(true)
		if (file.type.startsWith('image')) {
			const uploadImage=await uploadFile(file)
			setMessage(prev => ({
				...prev, imageUrl:uploadImage?.url
			}))
		} else if (file.type.startsWith('video')) {
			const uploadVideo=await uploadFile(file)
			setMessage(prev => ({
				...prev, videoUrl:uploadVideo?.url
			}))
		}
		setLoading(false)
	}

	const handleChangeInput = (e) => {
		setMessage(prev => (
			{ ...prev, text:e?.target?.value }
		))
		const textarea = textareaRef?.current
		if (textarea) {
			textarea.style.height='auto'
			textarea.style.height=`${textarea.scrollHeight}px`
		}
	}

	const handleRemoveFile = () => {
		setMessage(prev => ({
			...prev, imageUrl:'', videoUrl:''
		}))
	}

	const [clickedMessageIndex, setClickedMessageIndex] = useState([])
	const handleOnClickMessage = (index) => {
		if (clickedMessageIndex.includes(index)) {
			setClickedMessageIndex(clickedMessageIndex.filter((item) => item!==index))
		} else {
			setClickedMessageIndex([...clickedMessageIndex, index])
		}
	}

	const handleKeyDown=(e) => {
		if (e.key==='Enter' && !e.shiftKey) {
			e.preventDefault()
			handleSendMessage()
		}
	}

	return (
		<div className='absolute w-[22%] h-[65%] bottom-0 right-16 bg-slate-300 rounded-t-lg border-[1px] border-black'>
			<div className='flex items-center justify-between w-full h-[52px] rounded-t-lg px-2 bg-slate-400'>
				<div className='flex items-center gap-3 '>
					<Link to={`/profileUser/${friendChat?._id}`} className='relative w-10 h-10 flex-shrink-0'>
						<Avatar
							imageUrl={friendChat?.profile_pic}
							name={friendChat?.name}
							width={40}
							height={40}
							userId={friendChat?._id}
						/>
					</Link>
					<Link to={`/profileUser/${friendChat?._id}`} className='font-semibold'>{friendChat?.name}</Link>
				</div>
				<div className='flex items-center'>
					<button className='w-7 h-7 flex items-center justify-center rounded-full p-[2px]'>
						<FaVideo size={18}/>
					</button>
					<button className='w-7 h-7 flex items-center justify-center rounded-full p-[2px]'>
						<IoIosCall size={20}/>
					</button>
					<button className='w-7 h-7 flex items-center justify-center rounded-full p-[2px]' onClick={handleCloseChatWindow}>
						<IoMdClose size={25}/>
					</button>
				</div>
			</div>
			<div className='relative w-full h-[404px] '>
				<div className='w-full h-[356px] overflow-auto px-2 py-1 relative'>
					<div className='flex flex-col gap-2 py-2' ref={currentMessage}>
						{
							allMessages?.map((msg, index) => {
								return (
									<div className={`bg-white p-1 py-1 rounded w-fit max-w-[200px]
                              ${user._id===msg?.msgByUserId ? 'ml-auto bg-slate-300':'bg-white'}`} onClick={() => handleOnClickMessage(index)}>
										<div className='w-full space-y-1'>
											{
												msg?.imageUrl && (
													<img
														src={msg?.imageUrl}
														className='w-full h-full object-scale-down'
													/>
												)
											}
											{
												msg?.videoUrl && (
													<video
														src={msg?.videoUrl}
														className='w-full h-full object-scale-down'
														controls
														autoPlay
													/>
												)
											}
										</div>
										<p className='px-2'>
											{msg?.text}
										</p>
										{clickedMessageIndex.includes(index) && <p className='text-xs ml-auto w-fit'>
											{ moment(msg?.createdAt).isSame(moment(), 'day') ? moment(msg?.createdAt).format('HH:mm') : 
												moment(msg?.createdAt).format('DD/MM/YY HH:mm')}
										</p>}
									</div>
								)
							})
						}
					</div>
				</div>
				<div className='absolute bottom-0 px-1 py-2 w-full h-auto bg-slate-400'>
					{!loading ? (
						<div className='space-y-1'>
							{
								(message?.imageUrl || message?.video) &&
                        <div className='flex items-center gap-2 px-2'>
                        	<p>Đã thêm 1 tệp đính kèm</p>
                        	<IoCloseOutline size={20} className='hover:bg-slate-200 cursor-pointer rounded-full'
                        		onClick={() => handleRemoveFile()}/>
                        </div>
							}
							<div className='flex items-end gap-1'>
								<button className='px-1 py-[2px]' onClick={() => document.getElementById('uploadFile').click()}>
									<FaImage size={25}/>
								</button>
								<input
									type='file'
									accept='image/*, video/*'
									className='hidden'
									name='uploadFile'
									id='uploadFile'
									onChange={handleChangeFile}
								/>
								<textarea 
									type='text'
									ref={textareaRef}
									value={message.text}
									className='flex-grow w-56 h-auto max-h-[100px] rounded-lg
                           py-1 px-2 resize-none scrollbar focus:outline-none bg-slate-200'
									placeholder='Aa'
									onChange={handleChangeInput}
									rows={1}
									onKeyDown={handleKeyDown}
								/>
								<button className='px-1 py-1'
									onClick={() => handleSendMessage()}>
									<IoMdSend size={25}/>
								</button>
							</div>
						</div>
					):(
						<div className='flex items-center justify-center py-1'>
							<Loading/>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default ChatWindow