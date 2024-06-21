/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import ChatWindow from '../ChatWindow'
import { Link } from 'react-router-dom'
import { getFriendRequest } from '../../../apis/UserApi'
import { useSelector } from 'react-redux'

const Rightbar = ({ user, socketConnection }) => {
	const [inviteFriend, setInviteFriend]=useState([])
	const [friendsChat, setFriendsChat]=useState([])
	const onlineUsers=useSelector(state => state?.user?.onlineUsers)

	useEffect(() => {
		getFriendRequest().then((data) => {
			setInviteFriend(data?.data)
		})
	}, [])
	useEffect(() => {
		if (socketConnection) {
			socketConnection.emit('sidebar', user?._id)
			socketConnection.on('conversation', (data) => {
				const conversationUserData=data.map((conversationUser, index) => {
					if (conversationUser?.sender?._id===conversationUser?.receiver?._id) {
						return {
							userDetails:conversationUser?.sender
						}
					} else if (conversationUser?.receiver?._id!==user?._id) {
						return {
							userDetails: conversationUser?.receiver
						}
					} else {
						return {
							userDetails: conversationUser?.sender
						}
					}
				})
				setFriendsChat(conversationUserData)
			})
		}
	}, [user])

	const [isOpenChatWindow, setIsOpenChatWindow]=useState(false)
	const [friendChat, setFriendChat]=useState({})
	const handleOpenChatWindow=(user) => {
		setFriendChat(user)
		setIsOpenChatWindow(true)
	}
	const handleCloseChatWindow=() => {
		setIsOpenChatWindow(false)
	}
	return (
		<div className='z-0 w-[295px]'>
			<div className='w-full h-auto'>
				<div className='flex w-full h-auto items-center justify-between p-3'>
					<p className='font-semibold'>Lời mời kết bạn</p>
					<Link to={'/friend-request'} className='text-blue-600 cursor-pointer'>Xem tất cả</Link>
				</div>
				{inviteFriend.length>=2 && (
					inviteFriend.slice(0, 2).map((friend, index) => (
						<div className='flex gap-2 px-3 py-2'>
							<Link to={`/profileUser/${friend?._id}`} className='w-14 h-14 flex-shrink-0'>
								<img
									src={friend?.profile_pic}
									className='object-cover rounded-full w-full h-full'
								/>
							</Link>
							<div className='flex-grow'>
								<div className='flex justify-between'>
									<Link to={`/profileUser/${friend?._id}`} className='text-sm font-semibold'>{friend?.name}</Link>
									<p className='text-sm'>{friend?.inviteTime}</p>
								</div>
								<div>
									<p className='text-sm'>{friend?.mutualFriends} bạn chung</p>
								</div>
								<div className='py-1 flex justify-between'>
									<button className='bg-blue-500 text-white hover:bg-blue-800 rounded-lg w-[45%] px-2 py-1'>Chấp nhận</button>
									<button className='bg-slate-400 text-white hover:bg-slate-500 rounded-lg w-[45%] px-2 py-1'>Xóa</button>
								</div>
							</div>
						</div>
					))
				)}
				{inviteFriend.length>0 && inviteFriend.length<2 && (
					inviteFriend.map((friend, index) => (
						<div className='flex gap-2 px-3 py-2'>
							<Link to={`/profileUser/${friend?._id}`} className='w-14 h-14 flex-shrink-0'>
								<img
									src={friend?.profile_pic}
									className='object-cover rounded-full w-full h-full'
								/>
							</Link>
							<div className='flex-grow'>
								<div className='flex justify-between'>
									<Link to={`/profileUser/${friend?._id}`} className='text-sm font-semibold'>{friend?.name}</Link>
									<p className='text-sm'>{friend?.inviteTime}</p>
								</div>
								<div>
									<p className='text-sm'>{friend?.mutualFriends} bạn chung</p>
								</div>
								<div className='py-1 flex justify-between'>
									<button className='bg-blue-500 text-white hover:bg-blue-800 rounded-lg w-[45%] px-2 py-1'>Chấp nhận</button>
									<button className='bg-slate-400 text-white hover:bg-slate-500 rounded-lg w-[45%] px-2 py-1'>Xóa</button>
								</div>
							</div>
						</div>
					))
				)}
				{inviteFriend.length===0 && (
					<div className='flex items-center justify-center w-full h-16'>
						<p className='text-slate-500 text-center'>Không có lời mời kết bạn nào</p>
					</div>
				)}
			</div>
			<div className='flex justify-center'>
				<hr className='bg-slate-200 h-[1.5px] w-[80%]'/>
			</div>
			<div className='w-full h-auto'>
				<div className='flex justify-between px-3 py-2'>
					<p className='font-semibold'>Người liên lạc</p>
					<div className='flex justify-center items-center p-1 cursor-pointer hover:bg-slate-200 rounded'>
						<IoSearchOutline size={20}/>
					</div>
				</div>
			</div>
			{friendsChat.length===0 && (
				<div className='flex items-center justify-center w-full h-40 px-5'>
					<p className='text-slate-500 text-center'>Bạn chưa có cuộc trò chuyện nào. Hãy bắt đầu ngay</p>
				</div>
			)}
			{friendsChat.length>0 && (
				friendsChat.map((friend, index) => (
					<div className='flex gap-3 px-3 py-2 cursor-pointer hover:bg-slate-200 rounded-md' onClick={() => handleOpenChatWindow(friend?.userDetails)}>
						<div className='relative w-11 h-11 flex-shrink-0'>
							<img
								src={friend?.userDetails?.profile_pic}
								className='rounded-full w-full h-full object-cover'
							/>
							{onlineUsers?.includes(friend?.userDetails?._id) 
                     && <div className='absolute bottom-[2px] right-[1px] w-[9px] h-[9px] rounded-full bg-green-500'></div>}
						</div>
						<div className='w-full h-auto flex items-center'>
							<p className='text-sm font-semibold'>{friend?.userDetails?.name}</p>
						</div>
					</div>
				))
			)}
			{
				isOpenChatWindow && (
					<ChatWindow handleCloseChatWindow={handleCloseChatWindow} friendChat={friendChat}/>
				)
			}
		</div>
	)
}

export default Rightbar