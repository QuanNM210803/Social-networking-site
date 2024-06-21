/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import logo from '../../../assets/xing.svg'
import { IoHome } from 'react-icons/io5'
import { IoPeopleSharp } from 'react-icons/io5'
import { BiSolidVideos } from 'react-icons/bi'
import { MdGroups } from 'react-icons/md'
import { IoGameControllerSharp } from 'react-icons/io5'
import { IoMenu } from 'react-icons/io5'
import { BiSolidMessageRounded } from 'react-icons/bi'
import { IoNotifications } from 'react-icons/io5'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IoLogOut } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { logout } from '../../../redux/userSlice'
import { logoutServer } from '../../../apis/IndexApi'

const navbar = ({ user, socketConnection }) => {
	const location = useLocation()
	const dispatch=useDispatch()
	const navigate=useNavigate()
	const [showOptions, setShowOptions] = useState(false)
	const handleLogout=async() => {
		if (socketConnection) {
			socketConnection.disconnect()
		}
		await logoutServer() //don dep cookie
		dispatch(logout())
		localStorage.clear()
		navigate('/email')
	}
	return (
		<div className='w-full h-14 flex items-center justify-between'>
			<div className='h-auto w-auto flex items-center gap-3 px-5'>
				<Link to={'/home'}>
					<img
						src={logo}
						alt='logo'
						className='rounded-full w-10 h-10'
					/>
				</Link>
				<div className=''>
					<input
						type='text'
						placeholder='Search'
						className='bg-slate-400 rounded-lg py-1 px-2 placeholder:text-slate-300'
					/>
				</div>
			</div>
			<div className='h-auto w-auto flex items-center gap-5'>
				<Link to={'/home'} className={'w-20 h-auto flex justify-center'}>
					<IoHome className={`w-8 h-8 cursor-pointer ${location.pathname === '/home' ? 'text-slate-300':'hover:text-slate-300 text-slate-800'}`}/>
				</Link>
				<Link to={'/friend-request'} className='w-20 h-auto flex justify-center'>
					<IoPeopleSharp className={`w-8 h-8 cursor-pointer ${location.pathname === '/friend-request' ? 'text-slate-300':'hover:text-slate-300 text-slate-800'}`}/>
				</Link>
				<Link to={'/video'} className='w-20 h-auto flex justify-center'>
					<BiSolidVideos className={`w-8 h-8 cursor-pointer ${location.pathname === '/video' ? 'text-slate-300':'hover:text-slate-300 text-slate-800'}`}/>
				</Link>
				<Link to={'/groups'} className='w-20 h-auto flex justify-center'>
					<MdGroups className={`w-8 h-8 cursor-pointer ${location.pathname === '/groups' ? 'text-slate-300':'hover:text-slate-300 text-slate-800'}`}/>
				</Link>
				<Link to={'/games'} className='w-20 h-auto flex justify-center'>
					<IoGameControllerSharp className={`w-8 h-8 cursor-pointer ${location.pathname === '/games' ? 'text-slate-300':'hover:text-slate-300 text-slate-800'}`}/>
				</Link>
			</div>
			<div className=' h-auto w-auto flex items-center px-5 gap-3'>
				<div className='w-auto h-auto flex justify-center rounded-full bg-slate-600 p-[5px] hover:bg-slate-400'>
					<IoMenu className='w-7 h-7 text-slate-800 cursor-pointer'/>
				</div>
				<Link to={'/chat'} className={`w-auto h-auto flex justify-center rounded-full p-[5px] 
               ${location.pathname.includes('/chat') ? 'bg-slate-400':'hover:bg-slate-400 bg-slate-600'}`}>
					<BiSolidMessageRounded className='w-7 h-7 text-slate-800  cursor-pointer'/>
				</Link>
				<div className='w-auto h-auto flex justify-center rounded-full bg-slate-600 p-[5px] hover:bg-slate-400'>
					<IoNotifications className='w-7 h-7 text-slate-800 cursor-pointer'/>
				</div>
				<div className='relative'>
					<img
						src={user?.profile_pic}
						alt='logo'
						className='rounded-full w-[38px] h-[38px] bg-slate-300 cursor-pointer object-cover'
						onClick={() => setShowOptions(!showOptions)}
					/>
					{showOptions && (
						<div className='absolute right-0 mt-2 p-2 w-72 bg-white rounded-lg shadow-xl'>
							<div className='w-full h-auto bg-slate-200 rounded py-1 px-2'>
								<div className='flex items-center gap-2'>
									<img
										src={user?.profile_pic}
										alt='logo'
										className='rounded-full object-cover w-10 h-10 border-[1px] border-slate-400'
									/>
									<p className='text-nomal font-semibold'>{user?.name}</p>
								</div>
								<div className='flex justify-center mt-2'>
									<hr className='bg-slate-300 h-[1.5px] w-[90%]'/>
								</div>
								<Link to={`/profileUser/${user?._id}`}>
									<p className='text-blue-600 hover:text-blue-800'>Go your profile</p>
								</Link>
							</div>
							<div className='w-full h-auto hover:bg-slate-200 rounded py-2 px-2 mt-2 cursor-pointer' onClick={() => handleLogout()}>
								<div className='flex items-center gap-2'>
									<IoLogOut size={23} className=''/>
									<p className='text-nomal font-semibold'>Logout</p>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default navbar