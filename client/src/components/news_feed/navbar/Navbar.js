/* eslint-disable no-unused-vars */
import React from 'react'
import logo from '../../../assets/logoNewsFeed.jpg'
import { IoHome } from 'react-icons/io5'
import { IoPeopleSharp } from 'react-icons/io5'
import { BiSolidVideos } from 'react-icons/bi'
import { MdGroups } from 'react-icons/md'
import { IoGameControllerSharp } from 'react-icons/io5'
import { IoMenu } from 'react-icons/io5'
import { BiSolidMessageRounded } from 'react-icons/bi'
import { IoNotifications } from 'react-icons/io5'

const navbar = () => {
	return (
		<div className='w-full h-14 flex items-center justify-between'>
			<div className='h-auto w-auto flex items-center gap-3 px-5'>
				<div>
					<img
						src={logo}
						alt='logo'
						className='rounded-full w-10 h-10'
					/>
				</div>
				<div className=''>
					<input
						type='text'
						placeholder='Search'
						className='bg-slate-400 rounded-lg py-1 px-2 placeholder:text-slate-300'
					/>
				</div>
			</div>
			<div className='h-auto w-auto flex items-center gap-5'>
				<div className='w-20 h-auto flex justify-center'>
					<IoHome className='w-8 h-8 text-slate-800 hover:text-slate-300 cursor-pointer'/>
				</div>
				<div className='w-20 h-auto flex justify-center'>
					<IoPeopleSharp className='w-8 h-8 text-slate-800 hover:text-slate-300 cursor-pointer'/>
				</div>
				<div className='w-20 h-auto flex justify-center'>
					<BiSolidVideos className='w-8 h-8 text-slate-800 hover:text-slate-300 cursor-pointer'/>
				</div>
				<div className='w-20 h-auto flex justify-center'>
					<MdGroups className='w-8 h-8 text-slate-800 hover:text-slate-300 cursor-pointer'/>
				</div>
				<div className='w-20 h-auto flex justify-center'>
					<IoGameControllerSharp className='w-8 h-8 text-slate-800 hover:text-slate-300 cursor-pointer'/>
				</div>
			</div>
			<div className=' h-auto w-auto flex items-center px-5 gap-3'>
				<div className='w-auto h-auto flex justify-center rounded-full bg-slate-600 p-[5px] hover:bg-slate-400'>
					<IoMenu className='w-7 h-7 text-slate-800 cursor-pointer'/>
				</div>
				<div className='w-auto h-auto flex justify-center rounded-full bg-slate-600 p-[5px] hover:bg-slate-400'>
					<BiSolidMessageRounded className='w-7 h-7 text-slate-800  cursor-pointer'/>
				</div>
				<div className='w-auto h-auto flex justify-center rounded-full bg-slate-600 p-[5px] hover:bg-slate-400'>
					<IoNotifications className='w-7 h-7 text-slate-800 cursor-pointer'/>
				</div>
				<div className='cursor-pointer'>
					<img
						src={logo}
						alt='logo'
						className='rounded-full w-[38px] h-[38px]'
					/>
				</div>
			</div>
		</div>
	)
}

export default navbar