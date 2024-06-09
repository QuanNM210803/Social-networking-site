/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { getUserDetails } from '../../apis/CallAPI'
import { useDispatch, useSelector } from 'react-redux'
import { logout, setOnlineUsers, setSocketConnection, setUser } from '../../redux/userSlice'
import Sidebar from '../../components/chat/sidebar/Sidebar'
import logo from '../../assets/logo.png'
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
			if (data?.data?.logout) {
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

	const basePath=location.pathname === '/'
	return (
		<div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
			<section className={`bg-white ${!basePath && 'hidden'} lg:block`}>
				<Sidebar />
			</section>
			<section className={`${basePath && 'hidden'}`}>
				<Outlet />
			</section>

			<div className={`justify-center items-center flex-col gap-2 hidden
            ${!basePath ? 'hidden':'lg:flex'}`}>
				<div>
					<img
						src={logo}
						width={200}
						alt='logo'
					></img>
				</div>
				<p className='text-lg mt-2 text-slate-500'>Select user to send message</p>
			</div>

		</div>
	)
}

export default Home