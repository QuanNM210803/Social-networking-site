/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/news_feed/navbar/Navbar.js'
import ProfileUser from '../../components/news_feed/DetailsObject/user/ProfileUser.js'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initializeSocketConnection } from '../../socket/SocketUtils.js'

const ProfileUserPage = () => {
	const user=useSelector(state => state?.user)
	const { userId }=useParams()
   
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
			<div className='flex top-14 left-0 right-0 bottom-0' style={{ zIndex:0 }}>
				<div className='h-[calc(100vh-56px)] overflow-auto bg-slate-300 w-full'>
					<ProfileUser idFriend={userId}/>
				</div>
			</div>
		</div>
	)
}

export default ProfileUserPage