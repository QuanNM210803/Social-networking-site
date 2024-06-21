/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/news_feed/navbar/Navbar.js'
import Sidebar from '../../components/news_feed/sidebar/Sidebar'
import Rightbar from '../../components/news_feed/rightbar/Rightbar.js'
import Content from '../../components/news_feed/news/Content.js'
import { getUserDetails } from '../../apis/UserApi.js'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, setUser } from '../../redux/userSlice.js'
import { initializeSocketConnection } from '../../socket/SocketUtils.js'

const HomePage = () => {
	const user=useSelector(state => state?.user)
	const dispatch=useDispatch()
	const navigate=useNavigate()
	const [socketConnection, setSocketConnection]=useState(null)
	useEffect(() => {
		getUserDetails().then((data) => {
			if (!data?.data) {
				dispatch(logout())
				navigate('/email')
			} else {
				dispatch(setUser(data?.data))
			}
		})
	}, [])
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
			<div className='bg-slate-300 flex top-14 left-0 right-0 bottom-0'>
				<div className='h-[calc(100vh-56px)] w-[27%] overflow-auto scrollbar-newsfeed'>
					<Sidebar user={user}/>
				</div>
				<div className='h-[calc(100vh-56px)] w-[63%] overflow-auto scrollbar-newsfeed'>
					<Content/>
				</div>
				<div className='h-[calc(100vh-56px)] w-[22%] overflow-auto scrollbar-newsfeed'>
					<Rightbar user={user} socketConnection={socketConnection}/>
				</div>
			</div>
		</div>
	)
}

export default HomePage