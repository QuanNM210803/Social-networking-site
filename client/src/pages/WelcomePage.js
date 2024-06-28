/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/xing.svg'

const WelcomePage = () => {
	const navigate=useNavigate()
	useEffect(() => {
		const timer=setTimeout(() => {
			navigate('/home')
		}, 3500)
		return () => clearTimeout(timer)
	}, [navigate])
	return (
		<div className='flex  items-center flex-col gap-5 h-screen w-screen'>
			<div className='w-[30%] h-[30%] mb-10 mt-16'>
				<img
					src={logo}
					className='w-full h-full object-contain'
				/>
			</div>
			<div className='text-4xl font-bold text-slate-500 mb-5'>
            Welcome to NanQ
			</div>
			<div className='w-[80%] h-[3px] relative bg-slate-300 overflow-hidden'>
				<div className='w-full h-full bg-slate-700 absolute top-0 left-[-100%] progress'>

				</div>
			</div>
		</div>
	)
}

export default WelcomePage