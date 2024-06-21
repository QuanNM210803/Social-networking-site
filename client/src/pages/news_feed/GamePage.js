/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/news_feed/navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { initializeSocketConnection } from '../../socket/SocketUtils'

const GamePage = () => {
	const user=useSelector(state => state?.user)

	const [socketConnection, setSocketConnection]=useState(null)
	const dispatch=useDispatch()
	useEffect(() => {
		const socketConnection=initializeSocketConnection(dispatch)
		setSocketConnection(socketConnection)
		return () => {
			socketConnection.disconnect()
		}
	}, [dispatch])
	return (
		<div>
			<div className='sticky top-0 bg-slate-500' style={{ zIndex:1000 }}>
				<Navbar user={user}/>
			</div>
			<div className='flex top-14 left-0 right-0 bottom-0'>
				<div className='h-[calc(100vh-56px)] w-full bg-slate-300 flex items-center justify-center'>
					<p className='text-slate-500 text-2xl font-semibold'>Chưa có game nào được thêm vào dự án.</p>
				</div>
			</div>
		</div>
	)
}

export default GamePage