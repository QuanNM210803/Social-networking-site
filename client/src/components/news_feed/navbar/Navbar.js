/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import logo from '../../../assets/xing.svg'
import { IoHome } from 'react-icons/io5'
import { IoPeopleSharp } from 'react-icons/io5'
import { BiSolidVideos } from 'react-icons/bi'
import { MdGroups } from 'react-icons/md'
import { IoGameControllerSharp } from 'react-icons/io5'
import { BiSolidMessageRounded } from 'react-icons/bi'
import { IoNotifications } from 'react-icons/io5'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IoLogOut } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { logout } from '../../../redux/userSlice'
import { logoutServer } from '../../../apis/IndexApi'
import EditUserDetails from '../../EditUserDetails'
import { FaEdit } from 'react-icons/fa'
import { searchUserGroup } from '../../../apis/UserApi'
import Tab from '../../chat/rightbar/Tab'
import moment from 'moment'
import { MdOutlineStorage } from 'react-icons/md'

const navbar = ({ user, socketConnection }) => {
	const location = useLocation()
	const dispatch=useDispatch()
	const navigate=useNavigate()
	const [showOptions, setShowOptions] = useState(false)
	const [showNotification, setShowNotification]=useState(false)
	const [showEdit, setShowEdit] = useState(false)
	const [allNotification, setAllNotification]=useState([])
	const falseNotificationRead = allNotification.filter((notification) => notification?.read === false).length
	const [showSM, setShowSM]=useState(true)

	useEffect(() => {
		if (socketConnection) {
			socketConnection.emit('get-notification', user?._id)
			socketConnection.on('notifications', (data) => {
				setAllNotification(data)
			})
		}
	}, [socketConnection, user])

	const handleShowEdit=() => {
		setShowEdit(!showEdit)
		setShowSM(false)
		setShowOptions(false)
		setShowNotification(false)
	}
	const handleShowOption=() => {
		setShowOptions(!showOptions)
		setShowNotification(false)
	}
	const handleShowNotification=() => {
		socketConnection.emit('seen-notification', { userId: user?._id })
		setShowNotification(!showNotification)
		setShowOptions(false)
	}
	const handleLogout=async() => {
		if (socketConnection) {
			socketConnection.disconnect()
		}
		await logoutServer() //don dep cookie
		dispatch(logout())
		localStorage.clear()
		navigate('/email')
	}
	const [search, setSearch]=useState('')
	const [resultSearchUser, setResultSearchUser]=useState([])
	const [resultSearchGroup, setResultSearchGroup]=useState([])
	useEffect(() => {
		searchUserGroup(search==='' ? null: search).then((data) => {
			setResultSearchUser(data?.dataUser)
			setResultSearchGroup(data?.dataGroup)
		})
	}, [search])

	
	const handleShowSM=() => {
		setShowSM(!showSM)
	}

	useEffect(() => {
		setShowNotification(false)
		setShowOptions(false)
		setShowSM(false)
	}, [navigate])


	const [activeTab, setActiveTab] =useState('Nguời dùng')
	return (
		<div className='w-full h-14 flex items-center sm:justify-between relative justify-center'>
			<div className='md:hidden block absolute left-2'>
				<MdOutlineStorage size={30} className={`hover:text-slate-300 cursor-pointer ${showSM ? 'text-slate-300':'text-slate-800'}`} onClick={() => handleShowSM()}/>
				{showSM && (
					<div className='flex flex-col
                  absolute left-0 top-9 w-[250px] h-auto rounded bg-slate-100 border-[1.5px] border-slate-600 cursor-pointer'>
						<Link to={`/profileUser/${user?._id}`} className='flex items-center gap-1 p-1'>
							<img
								src={user?.profile_pic}
								alt='logo'
								className='rounded-full w-8 h-8 object-cover flex-shrink-0'
							/>
							<p className='text-[15px] text-ellipsis line-clamp-1'>{user?.name}</p>
						</Link>
						<div className='flex flex-col items-center gap-1 p-1'>
							<input
								type='text'
								name='search'
								value={search}
								onChange={(e) => setSearch(e?.target?.value)}
								placeholder='Search'
								className='bg-slate-300 rounded py-1 px-3 placeholder:text-slate-100 w-full'
							/>
							{
								search!=='' && (
									<div className='p-1 w-full bg-white rounded-lg shadow-xl'>
										<div className='flex justify-center'>
											<div className={'w-full flex items-center gap-1'}>
												<Tab label="Nguời dùng" isActive={activeTab === 'Nguời dùng'} onClick={() => setActiveTab('Nguời dùng')}/>
												<Tab label="Nhóm" isActive={activeTab === 'Nhóm'} onClick={() => setActiveTab('Nhóm')}/>
											</div>
										</div>
										{
											activeTab==='Nguời dùng' && (
												<div className='bg-slate-200 rounded-md'>
													{resultSearchUser?.length===0 &&(
														<p className='text-center text-slate-500 py-2'>Not user found!</p>
													)}
													{resultSearchUser?.length>0 && (
														<div className='h-auto max-h-[200px] scroll-container'>
															{resultSearchUser.map((user, index) => {
																return (
																	<Link to={`/profileUser/${user?._id}`} className='flex items-center gap-2 p-2 hover:bg-slate-300 rounded cursor-pointer'>
																		<img
																			src={user?.profile_pic}
																			alt='logo'
																			className='rounded-full w-8 h-8 object-cover'
																		/>
																		<p className='text-[15px]'>{user?.name}</p>
																	</Link>
																)
															})}
														</div>
													)}
												</div>
											)
										}
										{
											activeTab==='Nhóm' && (
												<div className='bg-slate-200 rounded-md'>
													{resultSearchGroup?.length===0 &&(
														<p className='text-center text-slate-500 py-2'>Not group found!</p>
													)}
													{resultSearchGroup?.length>0 && (
														<div className='h-auto max-h-[200px] scroll-container'>
															{resultSearchGroup.map((group, index) => {
																return (
																	<Link to={`/profileGroup/${group?._id}`} className='flex items-center gap-2 p-2 hover:bg-slate-300 rounded cursor-pointer'>
																		<img
																			src={group?.profile_pic}
																			alt='logo'
																			className='rounded-full w-8 h-8 object-cover'
																		/>
																		<p className='text-[15px]'>{group?.name}</p>
																	</Link>
																)
															})}
														</div>
													)}
												</div>
											)
										}
									</div>
								)
							}
						</div>
						<Link to={'/chat'} className='sm:hidden flex items-center gap-1 py-1 px-3 hover:bg-slate-200'>
							<BiSolidMessageRounded size={25} className=''/>
							<p className='text-[15px]'>Message</p>
						</Link>
						<div className='sm:hidden block py-1 px-3 space-y-1 hover:bg-slate-200 ' onClick={() => handleShowNotification()}>
							<div className='flex items-center gap-1 relative'>
								{falseNotificationRead>0 && 
                        <div className='absolute right-0 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center'>
                        	<p className='text-[11px] text-white'>{falseNotificationRead>9 ? '9+':falseNotificationRead}</p>
                        </div>
								}
								<IoNotifications size={25} className=''/>
								<p className='text-[15px]'>Notification</p>
							</div>
							{showNotification && (
								<div className=' w-full rounded shadow-xl'>
									<div className='bg-slate-300 rounded-md'>
										{allNotification?.length===0 &&(
											<p className='text-center text-slate-500 py-2'>Not notification!</p>
										)}
										{allNotification?.length>0 && (
											<div className='h-auto max-h-[300px] space-y-2 scroll-container'>
												{allNotification.map((notification, index) => (
													<React.Fragment key={index}>
														{(notification?.type === 'friend request' || notification?.type === 'accept friendship') && (
															<Link to={`/profileUser/${notification?.related?._id}`} 
																className='flex items-center gap-2 cursor-pointer hover:bg-slate-100 rounded-md'>
																<div className='p-1 flex-shrink-0 rounded'>
																	<img
																		src={notification?.from?.profile_pic}
																		alt='logo'
																		className='rounded-full w-10 h-10 object-cover'
																	/>
																</div>
																<div className='py-1 w-full'>
																	<div className='flex justify-between w-full'>
																		<p className='font-bold'>{notification?.from?.name}</p>
																		<p className='text-[10px] mr-1 flex items-center'>{moment(notification?.createdAt).format('DD/MM/YY HH:mm')}</p>
																	</div>
																	<div className='flex justify-between w-full'>
																		<p className=''>{notification?.type}</p>
																	</div>
																</div>
															</Link>
														)}
														{(notification?.type === 'request join group') && (
															<Link to={`/profileGroup/${notification?.related?._id}`} 
																className='flex items-center gap-2 cursor-pointer hover:bg-slate-100 rounded-md'>
																<div className='p-1 flex-shrink-0 rounded'>
																	<img
																		src={notification?.from?.profile_pic}
																		alt='logo'
																		className='rounded-full w-10 h-10 object-cover'
																	/>
																</div>
																<div className='py-1 w-full'>
																	<div className='flex justify-between w-full'>
																		<p className='font-bold'>{notification?.from?.name}</p>
																		<p className='text-[10px] mr-1 flex items-center'>{moment(notification?.createdAt).format('DD/MM/YY HH:mm')}</p>
																	</div>
																	<div className='flex gap-1 w-full'>
																		<p className='line-clamp-1 text-ellipsis'>{notification?.type} <strong>{notification?.related?.name}</strong></p>
																	</div>
																</div>
															</Link>
														)}
														{(notification?.type === 'group member') && (
															<Link to={`/profileGroup/${notification?.related?._id}`} 
																className='flex items-center gap-2 cursor-pointer hover:bg-slate-100 rounded-md'>
																<div className='p-1 flex-shrink-0 rounded'>
																	<img
																		src={notification?.related?.profile_pic}
																		alt='logo'
																		className='rounded-full w-10 h-10 object-cover'
																	/>
																</div>
																<div className='py-1 w-full'>
																	<div className='flex justify-between w-full'>
																		<p className='font-bold'>{notification?.related?.name}</p>
																		<p className='text-[10px] mr-1 flex items-center'>{moment(notification?.createdAt).format('DD/MM/YY HH:mm')}</p>
																	</div>
																	<div className='flex gap-1 w-full'>
																		<p className='line-clamp-1 text-ellipsis'>You are already {notification?.type}</p>
																	</div>
																</div>
															</Link>
														)}
														{(notification?.type === 'comment' || notification?.type === 'like') && (
															<Link to={`/post/${notification?.related?._id}`} 
																className='flex items-center gap-2 cursor-pointer hover:bg-slate-100 rounded-md'>
																<div className='p-1 flex-shrink-0 rounded'>
																	<img
																		src={notification?.from?.profile_pic}
																		alt='logo'
																		className='rounded-full w-10 h-10 object-cover'
																	/>
																</div>
																<div className='py-1 w-full'>
																	<div className='flex justify-between w-full'>
																		<p className='font-bold'>{notification?.from?.name}</p>
																		<p className='text-[10px] mr-1 flex items-center'>{moment(notification?.createdAt).format('DD/MM/YY HH:mm')}</p>
																	</div>
																	<div className='flex gap-1 w-full'>
																		<p className='line-clamp-1 text-ellipsis'>{notification?.type} a your posts </p>
																	</div>
																</div>
															</Link>
														)}
													</React.Fragment>
												))}
											</div>
										)}
									</div>
								</div>
							)}
						</div>
						<div className='sm:hidden flex items-center gap-1 py-1 px-3 hover:bg-slate-200' onClick={() => handleShowEdit()}>
							<FaEdit size={25} className=''/>
							<p className='text-[15px]'>Edit profile</p>
						</div>
						<div className='sm:hidden flex items-center gap-1 py-1 px-3 hover:bg-slate-200 rounded-b' onClick={() => handleLogout()}>
							<IoLogOut size={25} className=''/>
							<p className='text-[15px]'>Logout</p>
						</div>
					</div>
				)}
			</div>
			<div className='hidden md:w-[20%] md:flex items-center h-auto w-auto gap-3 lg:px-5 flex-shrink-0'>
				<Link to={'/home'}>
					<img
						src={logo}
						alt='logo'
						className='rounded-full w-10 h-10 object-cover lg:block hidden'
					/>
				</Link>
				<div className='relative'>
					<input
						type='text'
						name='search'
						value={search}
						onChange={(e) => setSearch(e?.target?.value)}
						placeholder='Search'
						className='bg-slate-400 rounded-lg py-1 px-2 placeholder:text-slate-300 w-[95%]'
					/>
					{
						search!=='' && (
							<div className='absolute left-0 mt-2 p-2 w-72 bg-white rounded-lg shadow-xl'>
								<div className='flex justify-center'>
									<div className={'w-full flex items-center gap-1'}>
										<Tab label="Nguời dùng" isActive={activeTab === 'Nguời dùng'} onClick={() => setActiveTab('Nguời dùng')}/>
										<Tab label="Nhóm" isActive={activeTab === 'Nhóm'} onClick={() => setActiveTab('Nhóm')}/>
									</div>
								</div>
								{
									activeTab==='Nguời dùng' && (
										<div className='bg-slate-200 rounded-md'>
											{resultSearchUser?.length===0 &&(
												<p className='text-center text-slate-500 py-2'>Not user found!</p>
											)}
											{resultSearchUser?.length>0 && (
												<div className='h-auto max-h-[200px] scroll-container'>
													{resultSearchUser.map((user, index) => {
														return (
															<Link to={`/profileUser/${user?._id}`} className='flex items-center gap-2 p-2 hover:bg-slate-300 rounded cursor-pointer'>
																<img
																	src={user?.profile_pic}
																	alt='logo'
																	className='rounded-full w-10 h-10 object-cover'
																/>
																<p>{user?.name}</p>
															</Link>
														)
													})}
												</div>
											)}
										</div>
									)
								}
								{
									activeTab==='Nhóm' && (
										<div className='bg-slate-200 rounded-md'>
											{resultSearchGroup?.length===0 &&(
												<p className='text-center text-slate-500 py-2'>Not group found!</p>
											)}
											{resultSearchGroup?.length>0 && (
												<div className='h-auto max-h-[200px] scroll-container'>
													{resultSearchGroup.map((group, index) => {
														return (
															<Link to={`/profileGroup/${group?._id}`} className='flex items-center gap-2 p-2 hover:bg-slate-300 rounded cursor-pointer'>
																<img
																	src={group?.profile_pic}
																	alt='logo'
																	className='rounded-full w-10 h-10 object-cover'
																/>
																<p>{group?.name}</p>
															</Link>
														)
													})}
												</div>
											)}
										</div>
									)
								}
							</div>
						)
					}
				</div>
			</div>
			<div className='h-auto w-auto md:w-[60%] sm:w-[75%] justify-center flex items-center lg:gap-5 md:gap-2 gap-2'>
				<Link to={'/home'} className={'md:w-20 sm:w-16 w-11 h-auto flex justify-center'}>
					<IoHome className={`w-8 h-8 cursor-pointer ${location.pathname === '/home' ? 'text-slate-300':'hover:text-slate-300 text-slate-800'}`}/>
				</Link>
				<Link to={'/friend-request'} className='md:w-20 sm:w-16 w-11 h-auto flex justify-center'>
					<IoPeopleSharp className={`w-8 h-8 cursor-pointer ${location.pathname === '/friend-request' ? 'text-slate-300':'hover:text-slate-300 text-slate-800'}`}/>
				</Link> 
				<Link to={'/video'} className='md:w-20 sm:w-16 w-11 h-auto flex justify-center'>
					<BiSolidVideos className={`w-8 h-8 cursor-pointer ${location.pathname === '/video' ? 'text-slate-300':'hover:text-slate-300 text-slate-800'}`}/>
				</Link>
				<Link to={'/groups'} className='md:w-20 sm:w-16 w-11 h-auto flex justify-center'>
					<MdGroups className={`w-8 h-8 cursor-pointer ${location.pathname === '/groups' ? 'text-slate-300':'hover:text-slate-300 text-slate-800'}`}/>
				</Link>
				<Link to={'/games'} className='md:w-20 sm:w-16 w-11 h-auto flex justify-center'>
					<IoGameControllerSharp className={`w-8 h-8 cursor-pointer ${location.pathname === '/games' ? 'text-slate-300':'hover:text-slate-300 text-slate-800'}`}/>
				</Link>
			</div>
			<div className='hidden h-auto w-auto md:w-[20%] sm:w-[25%] sm:justify-end sm:flex items-center px-5 gap-3'>
				<Link to={'/chat'} className={`w-auto h-auto flex justify-center rounded-full p-[5px] 
               ${location.pathname.includes('/chat') ? 'bg-slate-400':'hover:bg-slate-400 bg-slate-600'}`}>
					<BiSolidMessageRounded className='w-7 h-7 text-slate-800  cursor-pointer'/>
				</Link>
				<div className={`w-auto h-auto flex justify-center rounded-full p-[5px] 
               ${showNotification? 'bg-slate-400':'bg-slate-600 hover:bg-slate-400'} relative`}>
					{falseNotificationRead>0 && 
                  <div className='absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center'>
                  	<p className='text-[11px] text-white'>{falseNotificationRead>9 ? '9+':falseNotificationRead}</p>
                  </div>
					}
               
					<IoNotifications className='w-7 h-7 text-slate-800 cursor-pointer' onClick={() => handleShowNotification()}/>
					{showNotification && (
						<div className='absolute right-0 mt-10 p-2 w-80 bg-white rounded-lg shadow-xl'>
							<div className='bg-slate-200 rounded-md'>
								{allNotification?.length===0 &&(
									<p className='text-center text-slate-500 py-2'>Not notification!</p>
								)}
								{allNotification?.length>0 && (
									<div className='h-auto max-h-[300px] space-y-2 scroll-container'>
										{allNotification.map((notification, index) => (
											<React.Fragment key={index}>
												{(notification?.type === 'friend request' || notification?.type === 'accept friendship') && (
													<Link to={`/profileUser/${notification?.related?._id}`} 
														className='flex items-center gap-2 cursor-pointer hover:bg-slate-300 rounded-md'>
														<div className='p-1 flex-shrink-0 rounded'>
															<img
																src={notification?.from?.profile_pic}
																alt='logo'
																className='rounded-full w-10 h-10 object-cover'
															/>
														</div>
														<div className='py-1 w-full'>
															<div className='flex justify-between w-full'>
																<p className='font-bold'>{notification?.from?.name}</p>
																<p className='text-[10px] mr-1 flex items-center'>{moment(notification?.createdAt).format('DD/MM/YY HH:mm')}</p>
															</div>
															<div className='flex justify-between w-full'>
																<p className=''>{notification?.type}</p>
															</div>
														</div>
													</Link>
												)}
												{(notification?.type === 'request join group') && (
													<Link to={`/profileGroup/${notification?.related?._id}`} 
														className='flex items-center gap-2 cursor-pointer hover:bg-slate-300 rounded-md'>
														<div className='p-1 flex-shrink-0 rounded'>
															<img
																src={notification?.from?.profile_pic}
																alt='logo'
																className='rounded-full w-10 h-10 object-cover'
															/>
														</div>
														<div className='py-1 w-full'>
															<div className='flex justify-between w-full'>
																<p className='font-bold'>{notification?.from?.name}</p>
																<p className='text-[10px] mr-1 flex items-center'>{moment(notification?.createdAt).format('DD/MM/YY HH:mm')}</p>
															</div>
															<div className='flex gap-1 w-full'>
																<p className='line-clamp-1 text-ellipsis'>{notification?.type} <strong>{notification?.related?.name}</strong></p>
															</div>
														</div>
													</Link>
												)}
												{(notification?.type === 'group member') && (
													<Link to={`/profileGroup/${notification?.related?._id}`} 
														className='flex items-center gap-2 cursor-pointer hover:bg-slate-300 rounded-md'>
														<div className='p-1 flex-shrink-0 rounded'>
															<img
																src={notification?.related?.profile_pic}
																alt='logo'
																className='rounded-full w-10 h-10 object-cover'
															/>
														</div>
														<div className='py-1 w-full'>
															<div className='flex justify-between w-full'>
																<p className='font-bold'>{notification?.related?.name}</p>
																<p className='text-[10px] mr-1 flex items-center'>{moment(notification?.createdAt).format('DD/MM/YY HH:mm')}</p>
															</div>
															<div className='flex gap-1 w-full'>
																<p className='line-clamp-1 text-ellipsis'>You are already {notification?.type}</p>
															</div>
														</div>
													</Link>
												)}
												{(notification?.type === 'comment' || notification?.type === 'like') && (
													<Link to={`/post/${notification?.related?._id}`} 
														className='flex items-center gap-2 cursor-pointer hover:bg-slate-300 rounded-md'>
														<div className='p-1 flex-shrink-0 rounded'>
															<img
																src={notification?.from?.profile_pic}
																alt='logo'
																className='rounded-full w-10 h-10 object-cover'
															/>
														</div>
														<div className='py-1 w-full'>
															<div className='flex justify-between w-full'>
																<p className='font-bold'>{notification?.from?.name}</p>
																<p className='text-[10px] mr-1 flex items-center'>{moment(notification?.createdAt).format('DD/MM/YY HH:mm')}</p>
															</div>
															<div className='flex gap-1 w-full'>
																<p className='line-clamp-1 text-ellipsis'>{notification?.type} a your posts </p>
															</div>
														</div>
													</Link>
												)}
												{/* {(notification?.type === 'post' || notification?.type === 'post in group') && (
													<Link to={`/post/${notification?.related?._id}`} 
														className='flex items-center gap-2 cursor-pointer hover:bg-slate-300 rounded-md'>
														<div className='p-1 flex-shrink-0 rounded'>
															<img
																src={notification?.from?.profile_pic}
																alt='logo'
																className='rounded-full w-10 h-10 object-cover'
															/>
														</div>
														<div className='py-1 w-full'>
															<div className='flex justify-between w-full'>
																<p className='font-bold'>{notification?.from?.name}</p>
																<p className='text-[10px] mr-1 flex items-center'>{moment(notification?.createdAt).format('DD/MM/YY HH:mm')}</p>
															</div>
															<div className='flex gap-1 w-full'>
																<p className='line-clamp-1 text-ellipsis'>{notification?.type} a your posts </p>
															</div>
														</div>
													</Link>
												)} */}
											</React.Fragment>
										))}
									</div>
								)}
							</div>
						</div>
					)}
				</div>
				<div className='relative flex-shrink-0'>
					<img
						src={user?.profile_pic}
						alt='logo'
						className='rounded-full w-[38px] h-[38px] bg-slate-300 cursor-pointer object-cover'
						onClick={() => handleShowOption()}
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
							<div className='w-full h-auto hover:bg-slate-200 rounded py-2 px-2 mt-2 cursor-pointer' onClick={() => handleShowEdit()}>
								<div className='flex items-center gap-2'>
									<FaEdit size={23} className=''/>
									<p className='text-nomal font-semibold'>Edit profile</p>
								</div>
							</div>
							<div className='w-full h-auto hover:bg-slate-200 rounded py-2 px-2 mt-1 cursor-pointer' onClick={() => handleLogout()}>
								<div className='flex items-center gap-2'>
									<IoLogOut size={23} className=''/>
									<p className='text-nomal font-semibold'>Logout</p>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
			{
				showEdit && (<EditUserDetails onClose={() => handleShowEdit()}/>)
			}
		</div>
	)
}

export default navbar