/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { IoClose, IoSearchOutline } from 'react-icons/io5'
import ChatWindow from '../ChatWindow'
import { Link } from 'react-router-dom'
import { acceptFriend, deleteFriendRequest, getFriendRequest } from '../../../apis/UserApi'
import { useSelector } from 'react-redux'
import DetailsMutualFriend from '../DetailsObject/DetailsMutualFriend'
import Avatar from '../../Avatar'

const Rightbar = ({ user, socketConnection }) => {
	const self=useSelector(state => state?.user)
	const [inviteFriend, setInviteFriend]=useState([])
	const [friendsChat, setFriendsChat]=useState([])

	// get friend request
	useEffect(() => {
		getFriendRequest().then((data) => {
			setInviteFriend(data?.data)
		})
	}, [])

	const handleAcceptFriendRequest = async (toId) => {
		await acceptFriend({ toId }).then((data) => {
			socketConnection.emit('accept-friendship', { senderId:self?._id, receiverId:toId })
			if (data?.success) {
				setInviteFriend(inviteFriend.filter((friend) => friend?._id!==toId))
			}
		})
	}

	const handleDeleteFriendRequest = async (toId) => {
		await deleteFriendRequest({ toId }).then((data) => {
			if (data?.success) {
				setInviteFriend(inviteFriend.filter((friend) => friend?._id!==toId))
			}
		})
	}

	// get conversation
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

	// set chat window
	const [isOpenChatWindow, setIsOpenChatWindow]=useState(false)
	const [friendChat, setFriendChat]=useState({})
	const handleOpenChatWindow=(user) => {
		setFriendChat(user)
		setIsOpenChatWindow(true)
	}
	const handleCloseChatWindow=() => {
		setIsOpenChatWindow(false)
	}

	// search user
	const [activeSearch, setActiveSearch] = useState(false)
	const [search, setSearch]=useState('')
	const [resultSearchUser, setResultSearchUser]=useState([])
	useEffect(() => {
		if (search==='') {
			setResultSearchUser(friendsChat)
		} else {
			const searchUser=friendsChat.filter((user) => {
				return user?.userDetails?.name?.toLowerCase().includes(search.toLowerCase())
			})
			setResultSearchUser(searchUser)
		}
	}, [search, friendsChat])

	const handleActiveSearch = () => {
		if (activeSearch) {
			setSearch('')
		}
		setActiveSearch(!activeSearch)
	}

	const [isOpenDetailsMutualFriend, setIsOpenDetailsMutualFriend]=useState(false)
	const [mutualFriendWith, setMutualFriendWith]=useState({})
	const handleOpenDetailsMutualFriend=(friend) => {
		setMutualFriendWith(friend)
		setIsOpenDetailsMutualFriend(!isOpenDetailsMutualFriend)
	}

	return (
		<div className='z-0 w-full'>
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
									<p className='text-sm hover:underline cursor-pointer' onClick={() => handleOpenDetailsMutualFriend(friend)}>
										{friend?.mutualFriends?.length} bạn chung
									</p>
								</div>
								<div className='py-1 lg:flex lg:flex-col lg:gap-1 xl:justify-between xl:flex-row items-center'>
									<button className='bg-blue-500 text-white hover:bg-blue-800 rounded-lg xl:w-[70%] lg:w-full xl:py-1'
										onClick={() => handleAcceptFriendRequest(friend?._id)}>
                              Chấp nhận
									</button>
									<button className='bg-slate-400 text-white hover:bg-slate-500 rounded-lg xl:w-[30%] lg:w-full xl:py-1'
										onClick={() => handleDeleteFriendRequest(friend?._id)}>
                              Xóa
									</button>
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
									<p className='text-sm hover:underline cursor-pointer' onClick={() => handleOpenDetailsMutualFriend(friend)}>
										{friend?.mutualFriends?.length} bạn chung
									</p>
								</div>
								<div className='py-1 lg:flex lg:flex-col lg:gap-1 xl:justify-between xl:flex-row items-center'>
									<button className='bg-blue-500 text-white hover:bg-blue-800 rounded-lg xl:w-[70%] lg:w-full xl:py-1'
										onClick={() => handleAcceptFriendRequest(friend?._id)}>
                              Chấp nhận
									</button>
									<button className='bg-slate-400 text-white hover:bg-slate-500 rounded-lg xl:w-[30%] lg:w-full xl:py-1'
										onClick={() => handleDeleteFriendRequest(friend?._id)}>
                              Xóa
									</button>
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
				<div className='flex justify-between items-center px-3 py-2 gap-2'>
					{!activeSearch?(<p className='font-semibold px-1' >Người liên lạc</p>):
						(<input
							type='text'
							name='search'
							value={search}
							onChange={(e) => setSearch(e?.target?.value)}
							placeholder='Search contact'
							className='bg-slate-300 rounded-lg py-[2px] px-2 placeholder:text-slate-500 focus:outline-none w-full'
						/>)}
					<div className='flex justify-center items-center p-1 cursor-pointer hover:bg-slate-200 rounded-md'
						onClick={() => handleActiveSearch()}>
						{!activeSearch ? <IoSearchOutline size={20}/> : <IoClose size={20}/>}
					</div>
				</div>
			</div>
			{resultSearchUser.length===0 && (
				<div className='flex items-center justify-center w-full h-40 px-5'>
					<p className='text-slate-500 text-center'>Bạn chưa có cuộc trò chuyện nào. Hãy bắt đầu ngay</p>
				</div>
			)}
			{resultSearchUser.length>0 && (
				resultSearchUser.map((friend, index) => (
					<div className='flex gap-3 px-3 py-2 cursor-pointer hover:bg-slate-200 rounded-md' 
						onClick={() => handleOpenChatWindow(friend?.userDetails)}>
						<div className='relative w-11 h-11 flex-shrink-0'>
							<Avatar
								userId={friend?.userDetails?._id}
								name={friend?.userDetails?.name}
								imageUrl={friend?.userDetails?.profile_pic}
								width={44}
								height={44}
							/>
						</div>
						<div className='w-full h-auto flex items-center'>
							<p className='text-sm font-semibold'>{friend?.userDetails?.name}</p>
						</div>
					</div>
				))
			)}
			{
				isOpenChatWindow && (
					<ChatWindow handleCloseChatWindow={handleCloseChatWindow}
						friendChat={friendChat}
						socketConnection={socketConnection}/>
				)
			}
			{
				isOpenDetailsMutualFriend && <DetailsMutualFriend
					setIsOpenDetailsMutualFriend={setIsOpenDetailsMutualFriend} 
					mutualFriendWith={mutualFriendWith}/>
			}
		</div>
	)
}

export default Rightbar