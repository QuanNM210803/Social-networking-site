/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { getUserDetails } from '../../apis/UserApi'
import { useDispatch, useSelector } from 'react-redux'
import { logout, setOnlineUsers, setSocketConnection, setUser } from '../../redux/userSlice'
import Sidebar from '../../components/chat/sidebar/Sidebar'
import Navbar from '../../components/news_feed/navbar/Navbar'
import logo from '../../assets/xing.svg'
import { io } from 'socket.io-client'

const Home = () => {
	//Khi trạng thái user trong Redux store thay đổi, useSelector sẽ tự động cập nhật lại giá trị của user và re-render component.
	const user=useSelector(state => state?.user)// chính là user trong store.js
	const dispatch=useDispatch()
	const navigate=useNavigate()
	const location=useLocation()

	const [userDetails, setUserDetails]=useState({})
	useEffect(() => {
		getUserDetails().then((data) => {
			if (!data?.data) {
				dispatch(logout())
				navigate('/email')
			} else {
				setUserDetails(data)
				dispatch(setUser(data?.data))
			}
		})
	}, [])

	/** socket connection */
	useEffect(() => {
		const socketConnection=io(process.env.REACT_APP_BACKEND_URL, {
			auth:{
				token: localStorage.getItem('token')
			}
		})

		socketConnection.on('onlineUsers', (data) => {
			dispatch(setOnlineUsers(data))
		})
		dispatch(setSocketConnection(socketConnection))

		return () => {
			socketConnection.disconnect()
		}
	}, [])

	const basePath=location.pathname === '/chat'
	return (
		<div>
			<div className='sticky top-0 bg-slate-500'>
				<Navbar/>
			</div>
			<div className='flex top-14 left-0 right-0 bottom-0'>
				<div className='h-[calc(100vh-56px)] w-[20%]'>
					<Sidebar />
				</div>
				<div className='h-[calc(100vh-56px)] w-[80%]'>
					<section className={`${basePath && 'hidden'} h-full w-full`}>
						<Outlet />
					</section>
					<div className={`justify-center items-center flex-col gap-2 w-full h-full
                  ${!basePath ? 'hidden':'lg:flex'}`}>
						<img
							src={logo}
							width={150}
							alt='logo'
							className=''
						></img>
						<p className='text-lg mt-2 text-slate-500'>Select user to send message</p>
					</div>
				</div>
			</div>
		</div>
		
	)
}

export default Home