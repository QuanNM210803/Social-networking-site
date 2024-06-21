/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../../components/chat/sidebar/Sidebar'
import Navbar from '../../components/news_feed/navbar/Navbar'
import logo from '../../assets/xing.svg'
import { initializeSocketConnection } from '../../socket/SocketUtils'

const Home = () => {
	const user=useSelector(state => state?.user)// chính là user trong store.js

	const navigate=useNavigate()
	const location=useLocation()
	const basePath=location.pathname === '/chat'

	const dispatch=useDispatch()
	const [socketConnection, setSocketConnection]=useState(null)
	useEffect(() => {
		if (!user?._id) {
			navigate('/email')
		}
		const socketConnection=initializeSocketConnection(dispatch)
		setSocketConnection(socketConnection)
		return () => {
			socketConnection.disconnect()
		}
	}, [dispatch])

	return (
		<div>
			<div className='sticky top-0 bg-slate-500' style={{ zIndex:1000 }}>
				<Navbar user={user} socketConnection={socketConnection}/>
			</div>
			<div className='flex top-14 left-0 right-0 bottom-0'>
				<div className='h-[calc(100vh-56px)] w-[20%]'>
					<Sidebar socketConnection={socketConnection}/>
				</div>
				<div className='h-[calc(100vh-56px)] w-[80%]'>
					<section className={`${basePath && 'hidden'} h-full w-full`}>
						<Outlet context={socketConnection}/>
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