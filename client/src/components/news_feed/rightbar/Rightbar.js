/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import ChatWindow from '../ChatWindow'
import { Link } from 'react-router-dom'
import { getFriendRequest } from '../../../apis/UserApi'

const Rightbar = () => {
	const [inviteFriend, setInviteFriend]=useState([
		// {
		// 	avatar: 'https://www.w3schools.com/howto/img_avatar.png',
		// 	name: 'Nguyễn Văn A',
		// 	inviteTime: '1 giờ trước',
		// 	mutualFriends: 3
		// },
		// {
		// 	avatar: 'https://www.w3schools.com/howto/img_avatar.png',
		// 	name: 'Nguyễn Văn A',
		// 	inviteTime: '1 giờ trước',
		// 	mutualFriends: 3
		// },
		// {
		// 	avatar: 'https://www.w3schools.com/howto/img_avatar.png',
		// 	name: 'Nguyễn Văn A',
		// 	inviteTime: '1 giờ trước',
		// 	mutualFriends: 3
		// }
	])
	const [friendsChat, setFriendsChat]=useState([
		{
			_id: '1',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A',
			online: true
		},
		{
			_id: '2',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A',
			online: false
		},
		{
			_id: '3',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A',
			online: false
		},
		{
			_id: '4',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A',
			online: true
		},
		{
			_id: '5',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A',
			online: false
		},
		{
			_id: '6',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A',
			online: false
		},
		{
			_id: '7',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A',
			online: true
		},
		{
			_id: '8',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A',
			online: false
		},
		{
			_id: '9',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A',
			online: false
		}
   
	])
	useEffect(() => {
		getFriendRequest().then((data) => {
			setInviteFriend(data?.data)
		})
	}, [])
	const [isOpenChatWindow, setIsOpenChatWindow]=useState(false)
	const [IdFriendChat, setIdFriendChat]=useState('')
	const handleOpenChatWindow=(id) => {
		setIdFriendChat(id)
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
				{inviteFriend.length>0 && (
					inviteFriend.slice(0, 2).map((friend, index) => (
						<div className='flex gap-2 px-3 py-2'>
							<div className='w-14 h-14 flex-shrink-0'>
								<img
									src={friend?.profile_pic}
									className='object-cover rounded-full w-full h-full'
								/>
							</div>
							<div className='flex-grow'>
								<div className='flex justify-between'>
									<p className='text-sm font-semibold'>{friend?.name}</p>
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
					<div className='flex gap-3 px-3 py-2 cursor-pointer hover:bg-slate-200 rounded-md' onClick={() => handleOpenChatWindow(friend?._id)}>
						<div className='relative'>
							<img
								src={friend?.avatar}
								width={50}
								height={50}
								className='rounded-full'
							/>
							{friend?.online && <div className='absolute bottom-0 right-0 w-[9px] h-[9px] rounded-full bg-green-500'></div>}
						</div>
						<div className='w-full h-auto flex items-center'>
							<p className='text-sm font-semibold'>{friend?.name}</p>
						</div>
					</div>
				))
			)}
			{
				isOpenChatWindow && (
					<ChatWindow handleCloseChatWindow={handleCloseChatWindow} IdFriendChat={IdFriendChat}/>
				)
			}
		</div>
	)
}

export default Rightbar