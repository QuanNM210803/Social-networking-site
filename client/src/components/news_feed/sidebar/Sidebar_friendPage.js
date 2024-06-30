/* eslint-disable no-empty */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { IoMdPeople } from 'react-icons/io'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'
import { FaAngleRight } from 'react-icons/fa6'
import { FaArrowLeft } from 'react-icons/fa6'
import { acceptFriend, deleteFriendRequest, getFriendRequest, getFriendsSuggest, getListFriend, getUserDetails, unfriend, friendRequest } from '../../../apis/UserApi'
import { useSelector } from 'react-redux'
import DetailsMutualFriend from '../DetailsObject/DetailsMutualFriend'

const Sidebar_friendPage = ({ handleClickFriend, socketConnection }) => {
	const user=useSelector(state => state?.user)
	const [option, setOption]=useState(null)
	const [friendRequests, setFriendRequests]=useState([])
	const [friends, setFriends]=useState([])
	const [friendsSuggest, setFriendsSuggest]=useState([])

	const [self, setSelf]=useState({})

	useEffect(() => {
		getUserDetails().then((data) => {
			setSelf(data?.data)
		})
	}, [user])

	useEffect(() => {
		getFriendRequest().then((data) => {
			if (data?.data) {
				setFriendRequests(data?.data)
			}
		})
	}, [user])

	const [search, setSearch]=useState('')
	useEffect(() => {
		getListFriend(user?._id, search).then((data) => {
			if (data?.data) {
				setFriends(data?.data)
			}
		})
	}, [user, search])
   
	useEffect(() => {
		getFriendsSuggest().then((data) => {
			if (data?.data) {
				setFriendsSuggest(data?.data)
			}
		})
	}, [user])

	const handleClickedOption=(value) => {
		setOption(value)
	}

	const [isOpenDetailsMutualFriend, setIsOpenDetailsMutualFriend]=useState(false)
	const [mutualFriendWith, setMutualFriendWith]=useState({})
	const handleOpenDetailsMutualFriend=(friend) => {
		setMutualFriendWith(friend)
		setIsOpenDetailsMutualFriend(!isOpenDetailsMutualFriend)
	}

	const handleUnfriend= async(toId) => {
		await unfriend({ toId }).then(async (data) => {
			if (data?.success) {
				await getFriendsSuggest().then((data) => {
					if (data?.data) {
						setFriendsSuggest(data?.data)
					}
				})
				await getListFriend(user?._id, search).then((data) => {
					if (data?.data) {
						setFriends(data?.data)
					}
				})
			}
		})
	}

	const handleAcceptFriendRequest = async (toId) => {
		await acceptFriend({ toId }).then(async (data) => {
			socketConnection.emit('accept-friendship', { senderId:self?._id, receiverId:toId })
			if (data?.success) {
				getUserDetails().then((data) => {
					setSelf(data?.data)
				})
				await getFriendRequest().then((data) => {
					if (data?.data) {
						setFriendRequests(data?.data)
					}
				})
				await getFriendsSuggest().then((data) => {
					if (data?.data) {
						setFriendsSuggest(data?.data)
					}
				})
				await getListFriend(user?._id, search).then((data) => {
					if (data?.data) {
						setFriends(data?.data)
					}
				})
			}
		})
	}

	const handleFriendRequest=async (toId) => {
		await friendRequest({ toId }).then(async(data) => {
			socketConnection.emit('friend-request', { senderId:self?._id, receiverId:toId })
			if (data?.success) {
				await getFriendsSuggest().then((data) => {
					if (data?.data) {
						setFriendsSuggest(data?.data)
					}
				})
			}
		})
	}

	const handleDeleteFriendRequest = async (toId) => {
		await deleteFriendRequest({ toId }).then(async(data) => {
			if (data?.success) {
				getUserDetails().then((data) => {
					setSelf(data?.data)
				})
				await getFriendRequest().then((data) => {
					if (data?.data) {
						setFriendRequests(data?.data)
					}
				})
				await getFriendsSuggest().then((data) => {
					if (data?.data) {
						setFriendsSuggest(data?.data)
					}
				})
			}
		})
	}

	return (
		<div className='h-full'>
			<div className='px-3 py-2 bg-slate-300'>
				<p className='font-bold lg:text-2xl text-xl text-slate-800'>Bạn bè</p>
			</div>
			{option===null && (
				<div>
					<div className='px-3 py-2 flex items-center justify-between hover:bg-slate-200 rounded-md cursor-pointer'
						onClick={() => handleClickedOption(1)}>
						<div className='flex items-center gap-4'>
							<PersonAddIcon sx={{ fontSize: 30 }}/>
							<p className='font-semibold text-nomal'>Lời mời kết bạn</p>
						</div>
						<FaAngleRight size={25}/>
					</div>
					<div className='px-3 py-2 flex items-center justify-between hover:bg-slate-200 rounded-md cursor-pointer'
						onClick={() => handleClickedOption(2)}>
						<div className='flex items-center gap-4'>
							<TipsAndUpdatesIcon sx={{ fontSize: 30 }}/>
							<p className='font-semibold text-nomal'>Gợi ý</p>
						</div>
						<FaAngleRight size={25}/>
					</div>
					<div className='px-3 py-2 flex items-center justify-between hover:bg-slate-200 rounded-md cursor-pointer'
						onClick={() => handleClickedOption(3)}>
						<div className='flex items-center gap-4'>
							<IoMdPeople size={30}/>
							<p className='font-semibold text-nomal'>Tất cả bạn bè</p>
						</div>
						<FaAngleRight size={25}/>
					</div>
				</div>
			)}
			{option===1 && (
				<div className=''>
					<div className='flex items-center px-3 py-2 gap-4 bg-slate-300'>
						<FaArrowLeft size={30} className='cursor-pointer p-1 rounded-full hover:bg-slate-200'
							onClick={() => handleClickedOption(null)}/>
						<p className='font-semibold text-nomal'>Lời mời kết bạn</p>
					</div>
					{
						friendRequests.length===0 ? (
							<div className='py-5 px-5'>
								<p className='text-center text-slate-500 xl:text-lg text-[15px]'>Không có lời mời kết bạn</p>
							</div>
						):(
							<div className='p-3 space-y-2 h-auto'>
								<div className='w-full'>
									{
										friendRequests.map((friend, index) => (
											<div className='flex gap-3 px-2 py-1 '>
												<div className='flex-shrink-0'>
													<img
														src={friend?.profile_pic}
														className='rounded-full cursor-pointer xl:w-[55px] xl:h-[55px] lg:w-[50px] lg:h-[50px] w-[40px] h-[40px] object-cover'
														onClick={() => handleClickFriend(friend?._id)}
													/>
												</div>
												<div className=' w-full h-auto'>
													<div className='flex justify-between'>
														<p className='text-sm font-semibold cursor-pointer hover:underline'
															onClick={() => handleClickFriend(friend?._id)}>{friend?.name}</p>
														<p className='text-mini'>{friend?.inviteTime}</p>
													</div>
													<div>
														<p className='text-sm hover:underline cursor-pointer' onClick={() => handleOpenDetailsMutualFriend(friend)}>
															{friend?.mutualFriends?.length} bạn chung
														</p>
													</div>
													<div className='py-1 flex flex-col gap-1 xl:justify-between xl:flex-row items-center lg:text-[16px] text-[14px]'>
														<button className='bg-blue-500 text-white hover:bg-blue-800 rounded-lg xl:w-[70%] w-full xl:py-1'
															onClick={() => handleAcceptFriendRequest(friend?._id)}>
                                             Chấp nhận
														</button>
														<button className='bg-slate-400 text-white hover:bg-slate-500 rounded-lg xl:w-[30%] w-full xl:py-1'
															onClick={() => handleDeleteFriendRequest(friend?._id)}>
                                             Xóa
														</button>
													</div>
												</div>
											</div>
										))
									}
								</div>
							</div>
						)
					}
				</div>
			)}
			{option===2 && (
				<div className=''>
					<div className='flex items-center px-3 py-2 gap-4 bg-slate-300'>
						<FaArrowLeft size={30} className='cursor-pointer p-1 rounded-full hover:bg-slate-200'
							onClick={() => handleClickedOption(null)}/>
						<p className='font-semibold text-nomal'>Gợi ý kết bạn</p>
					</div>
					{
						friendsSuggest?.length===0 ? (
							<div className='py-5 px-5'>
								<p className='text-center text-slate-500'>Không có bạn bè gợi ý</p>
							</div>
						):(
							<div className='p-3 space-y-2 h-auto'>
								<div className='w-full space-y-3'>
									{
										friendsSuggest.map((friend, index) => (
											<div className='flex gap-3 px-2 py-1 hover:bg-slate-200 rounded-md'>
												<div className='flex-shrink-0'>
													<img
														src={friend?.profile_pic}
														className='rounded-full cursor-pointer xl:w-[55px] xl:h-[55px] lg:w-[50px] lg:h-[50px] w-[40px] h-[40px] object-cover'
														onClick={() => handleClickFriend(friend?._id)}
													/>
												</div>
												<div className='w-full h-auto space-y-1 flex-grow'>
													<div className='flex flex-col'>
														<p className='text-sm font-semibold cursor-pointer hover:underline'
															onClick={() => handleClickFriend(friend?._id)}>{friend?.name}</p>
														<div>
															<p className='text-sm hover:underline cursor-pointer' onClick={() => handleOpenDetailsMutualFriend(friend)}>
																{friend?.mutualFriends?.length} bạn chung
															</p>
														</div>
													</div>
													<div className='lg:text-[16px] text-[14px]'>
														{
															self?.friend_requests?.some((f) => f?.user?.toString()===friend?._id?.toString()) ? (
																<button className='bg-blue-400 text-white hover:bg-blue-600 rounded-lg w-full'
																	onClick={() => handleAcceptFriendRequest(friend?._id)}>
                                                   Chấp nhận
																</button>
															):(
																<button className='bg-blue-400 text-white hover:bg-blue-600 rounded-lg w-full'
																	onClick={() => handleFriendRequest(friend?._id)}>
                                                   Thêm bạn bè
																</button>
															)
														}
													</div>
												</div>
											</div>
										))
									}
								</div>
							</div>
						)
					}
				</div>
			)}
			{option===3 && (
				<div className=''>
					<div className='flex items-center justify-between px-3 py-1 bg-slate-300'>
						<div className='flex items-center gap-4'>
							<FaArrowLeft size={30} className='cursor-pointer p-1 rounded-full hover:bg-slate-200'
								onClick={() => handleClickedOption(null)}/>
							<p className='font-semibold lg:text-nomal text-mini-1'>Tất cả bạn bè</p>
						</div>
						<p className='font-semibold lg:text-mini-1 text-mini'>{friends?.length} người bạn</p>
					</div>
					<div className='flex items-center px-3 py-2 bg-slate-300'>
						<input 
							type='text' 
							name='search'
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder='Tìm kiếm bạn bè' 
							className='w-full h-8 px-3 bg-slate-200 rounded-md'/>
					</div>
					{
						friends.length===0 ? (
							<div className='py-5 px-5'>
								<p className='text-center text-slate-500'>Bạn chưa kết bạn với ai. Hãy tìm kiếm bạn bè ngay!</p>
							</div>
						):(
							<div className='p-3 h-auto'>
								<div className='w-full space-y-3 '>
									{
										friends.map((friend, index) => (
											<div className='flex gap-3 items-center py-1 px-2 hover:bg-slate-200 rounded-md'>
												<div className='flex-shrink-0'>
													<img
														src={friend?.profile_pic}
														className='rounded-full xl:w-[55px] xl:h-[55px] lg:w-[50px] lg:h-[50px] w-[40px] h-[40px] object-cover cursor-pointer'
														onClick={() => handleClickFriend(friend?._id)}
													/>
												</div>
												<div className='flex flex-col flex-grow'>
													<div className='flex items-center justify-between'>
														<p className='text-sm font-semibold cursor-pointer hover:underline'
															onClick={() => handleClickFriend(friend?._id)}>
															{friend?.name}
														</p>
														<p className='text-mini'>{friend?.createdAt}</p>
													</div>
													<div className='flex items-center'>
														<p className='text-sm hover:underline cursor-pointer' onClick={() => handleOpenDetailsMutualFriend(friend)}>
															{friend?.mutualFriends?.length} bạn chung
														</p>
													</div>
													<div className='flex items-center w-full lg:text-[16px] text-[14px]'>
														<button className='bg-slate-200 rounded w-full hover:bg-red-400 hover:text-white'
															onClick={() => handleUnfriend(friend?._id)}>
                                                Hủy kết bạn
														</button>
													</div>
												</div>
											</div>
                                 
										))
									}
								</div>
							</div>
						)
					}
				</div>
			)}
			{
				isOpenDetailsMutualFriend && <DetailsMutualFriend
					setIsOpenDetailsMutualFriend={setIsOpenDetailsMutualFriend} 
					mutualFriendWith={mutualFriendWith}/>
			}
		</div>
	)
}

export default Sidebar_friendPage