/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { IoChatbubbleEllipses } from 'react-icons/io5'
import { FaUserPlus } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom'
import Avatar from '../../Avatar'
import { useSelector } from 'react-redux'
import { FiArrowUpLeft } from 'react-icons/fi'
import SearchUser from '../SearchUser'
import { FaImage } from 'react-icons/fa6'
import { FaVideo } from 'react-icons/fa6'
import logo from '../../../assets/xing.svg'


const Sidebar = ({ socketConnection }) => {
	const user=useSelector(state => state?.user)
	const [allUser, setAllUser]=useState([])
	const [openSearchUser, setOpenSearchUser]=useState(false)

	useEffect(() => {
		if (socketConnection) {
			socketConnection.emit('sidebar', user._id)
			socketConnection.on('conversation', (data) => {
				const conversationUserData=data.map((conversationUser, index) => {
					if (conversationUser?.sender?._id===conversationUser?.receiver?._id) {
						return {
							...conversationUser,
							userDetails: conversationUser?.sender
						}
					} else if (conversationUser?.receiver?._id!==user?._id) {
						return {
							...conversationUser,
							userDetails: conversationUser?.receiver
						}
					} else {
						return {
							...conversationUser,
							userDetails: conversationUser?.sender
						}
					}
				})
				setAllUser(conversationUserData)
			})
		}
	}, [socketConnection, user])


	return (
		<div className='w-full h-full grid grid-cols-[48px,1fr] bg-white'>
			<div className='bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg
            py-5 text-slate-600 flex flex-col justify-between'>
				<div>
					<NavLink className={({ isActive }) => `w-12 h-12 flex justify-center items-center hover:bg-slate-200 rounded ${isActive && 'bg-slate-200'}`} title='chat'>
						<IoChatbubbleEllipses size={20}/>
					</NavLink>
					<div onClick={() => setOpenSearchUser(true)} className='w-12 h-12 flex justify-center items-center hover:bg-slate-200 rounded' title='Add friend'>
						<FaUserPlus size={20}/>
					</div>
				</div>

				<div className='flex flex-col items-center'>
					<Link to={`/profileUser/${user?._id}`} className='mx-auto' title={user?.name}>
						<Avatar
							width={37}
							height={37}
							name={user?.name}
							imageUrl={user?.profile_pic}
							userId={user?._id}
						/>
					</Link>
				</div>
			</div>
			<div className='w-full h-full'>
				<div className='h-16 flex items-center'>
					<h2 className='text-xl font-bold p-4 text-slate-800 lg:block hidden'>Message</h2>
					<img
						src={logo}
						className='lg:hidden block mx-auto w-10 h-10'
					/>
				</div>
				<div className='bg-slate-200 p-[0.5px]'></div>
				<div className='h-[calc(100%-65px)] overflow-x-hidden overflow-y-auto scrollbar'>
					{
						allUser.length===0 && (
							<div className='mt-12'>
								<div className='flex justify-center items-center my-4 text-slate-500'>
									<FiArrowUpLeft size={50}/>
								</div>
								<p className='text-lg text-center text-slate-400'>Explore users to start a conversation with.</p>
							</div>
						)
					}
					{
						allUser.map((conv, index) => {
							return (
								<NavLink to={'/chat/'+conv?.userDetails?._id} key={conv?._id} className='flex items-center gap-2 py-3 px-2 
                           border border-transparent hover:border-primary rounded hover:bg-slate-100 cursor-pointer'>
									<div>
										<Avatar
											imageUrl={conv?.userDetails?.profile_pic}
											name={conv?.userDetails?.name}
											width={40}
											height={40}
											userId={conv?.userDetails?._id}
										/>
									</div>
									<div className='lg:block hidden'>
										<h3 className='text-ellipsis line-clamp-1 font-semibold text-base'>{conv?.userDetails?.name}</h3>
										<div className='text-slate-500 text-xs flex items-center gap-1'>
											<div className='flex items-center gap-1'>
												{
													conv?.lastMsg?.imageUrl && (
														<div className='flex items-center gap-1'>
															<span><FaImage/></span>
															{!conv?.lastMsg?.text && <span>Image</span>}
														</div>
													)
												}
												{
													conv?.lastMsg?.videoUrl && (
														<div className='flex items-center gap-1'>
															<span><FaVideo/></span>
															{!conv?.lastMsg?.text && <span>Video</span>}
														</div>
													)
												}
											</div>
											<p className='text-ellipsis line-clamp-1'>
												{conv?.lastMsg?.text}
											</p>
										</div>
									</div>
									{
										Boolean(conv?.unseenMsg) && (
											<p className='flex justify-center items-center text-xs w-6 h-6 ml-auto p-1 bg-primary text-white rounded-full font-semibold'>
												{conv?.unseenMsg}
											</p>
										)
									}
									
								</NavLink>
							)
						})
					}
				</div>
			</div>
			{/**search */}
			{
				openSearchUser && (
					<SearchUser onClose={() => setOpenSearchUser(false)}/>
				)
			}
		</div>
	)
}

export default Sidebar