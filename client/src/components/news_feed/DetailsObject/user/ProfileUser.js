/* eslint-disable no-undef */
/* eslint-disable no-empty */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Tab from '../../../chat/rightbar/Tab'
import Images from '../Images'
import Videos from '../Videos'
import IntroductionUser from './IntroductionUser'
import FriendUser from './FriendUser'
import { acceptFriend, cancelFriendRequest, friendRequest, getUserById, getUserDetails, unfriend } from '../../../../apis/UserApi'
import { useSelector } from 'react-redux'
import { RiVerifiedBadgeFill } from 'react-icons/ri'
import EditUserDetails from '../../../EditUserDetails'
import { Link } from 'react-router-dom'
import DetailsMutualFriend from '../DetailsMutualFriend'
import PostsUser from './PostsUser'

const ProfileUser = ({ idFriend, news, loading, handleLikePost, handleCommentPost, socketConnection }) => {
	const self=useSelector(state => state?.user)

	const [activeTab, setActiveTab] =useState('Bài viết')
	const [user, setUser] = useState({})
	const [selfApi, setSelfApi] = useState({})
	useEffect(() => {
		if (idFriend!==self?._id) {
			getUserById(idFriend).then((data) => {
				setUser(data?.data)
			})
			getUserDetails().then((data) => {
				setSelfApi(data?.data)
			})
		} else {
			getUserDetails().then((data) => {
				setUser(data?.data)
				setSelfApi(data?.data)
			})
		}
	}, [idFriend, self])
	const [showEdit, setShowEdit] = useState(false)

	const handleShowEdit=() => {
		setShowEdit(!showEdit)
	}

	const [isOpenDetailsMutualFriend, setIsOpenDetailsMutualFriend]=useState(false)
	const [mutualFriendWith, setMutualFriendWith]=useState({})
	const handleOpenDetailsMutualFriend=() => {
		setMutualFriendWith(user)
		setIsOpenDetailsMutualFriend(!isOpenDetailsMutualFriend)
	}

	const handleUnfriend= async(toId) => {
		await unfriend({ toId }).then((data) => {
			if (data?.success) {
				getUserById(idFriend).then((data) => {
					setUser(data?.data)
				})
				getUserDetails().then((data) => {
					setSelfApi(data?.data)
				})
			}
		})
	}

	const handleAcceptFriendRequest = async (toId) => {
		await acceptFriend({ toId }).then((data) => {
			if (data?.success) {
				socketConnection.emit('accept-friendship', { senderId:self?._id, receiverId:toId })
				getUserById(idFriend).then((data) => {
					setUser(data?.data)
				})
				getUserDetails().then((data) => {
					setSelfApi(data?.data)
				})
			}
		})
	}

	const handleFriendRequest=async (toId) => {
		await friendRequest({ toId }).then((data) => {
			if (data?.success) {
				socketConnection.emit('friend-request', { senderId:self?._id, receiverId:toId })
				getUserById(idFriend).then((data) => {
					setUser(data?.data)
				})
			}
		})
	}

	const handleCancelFriendRequest = async (toId) => {
		await cancelFriendRequest({ toId }).then((data) => {
			if (data?.success) {
				getUserById(idFriend).then((data) => {
					setUser(data?.data)
				})
			}
		})
	}

	const [windowWidth, setWindowWidth] = useState(window.innerWidth)

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth)
		}

		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return (
		<div className='w-full h-auto'>
			<div className='relative w-full sm:h-[500px] h-[450px] bg-slate-200'>
				<div className='flex justify-center rounded-b-md'>
					<img
						src={user?.cover_pic}
						className={'w-[80%] lg:h-[350px] h-[250px] object-cover rounded-b-md'}
					/>
				</div>
				<div className='hidden lg:flex justify-center w-full h-auto absolute top-[60%]'>
					<div className={'h-auto w-[80%] flex justify-between'}>
						<div className='flex gap-5'>
							<div className='xl:ml-10 ml-5 flex-shrink-0'>
								<img
									src={user?.profile_pic}
									className='md:w-[180px] md:h-[180px] w-[150px] h-[150px] object-cover rounded-full border-4 border-slate-300'
								/>
							</div>
							<div className='items-center mt-16'>
								<div className=''>
									<p className='font-bold lg:text-3xl text-xl flex items-center gap-2'>
										{user?.name} {selfApi?._id===user?._id && <RiVerifiedBadgeFill className='text-blue-600 lg:text-xl text-nomal'/>}
									</p>
								</div>
								{
									selfApi?._id!==user?._id && 
                           <p className='cursor-pointer hover:underline' onClick={() => handleOpenDetailsMutualFriend()}>
                           	{user?.mutualFriends?.length} bạn chung
                           </p>
								}
							</div>
						</div>
						{selfApi?._id!==user?._id ? 
							<div className='mt-16 xl:mr-10 flex items-end gap-2'>
								{
									selfApi?.friends.some((friend) => friend?.user===user?._id) &&
								<button className='bg-slate-400 text-white hover:bg-slate-700 rounded-md px-3 py-1'
									onClick={() => handleUnfriend(user?._id)}>
                           Hủy kết bạn
								</button>
								}
								{
									selfApi?.friend_requests.some((friend) => friend?.user===user?._id) &&
                        <button className='bg-blue-600 text-white hover:bg-blue-800 rounded-md px-3 py-1'
                        	onClick={() => handleAcceptFriendRequest(user?._id)}>
                           Chấp nhận lời mời
                        </button>
								}
								{
									!selfApi?.friends.some((friend) => friend?.user===user?._id) &&
                        !selfApi?.friend_requests.some((friend) => friend?.user===user?._id) &&
                        !user?.friend_requests?.some((friend) => friend?.user===selfApi?._id) && 
                        <button className='bg-blue-600 text-white hover:bg-blue-800 rounded-md px-3 py-1'
                        	onClick={() => handleFriendRequest(user?._id)}>
                           Kết bạn
                        </button>
								}
								{
									user?.friend_requests?.some((friend) => friend?.user===selfApi?._id) && 
                        <button className='bg-slate-400 text-white hover:bg-slate-700 rounded-md px-3 py-1'
                        	onClick={() => handleCancelFriendRequest(user?._id)}>
                           Hủy yêu cầu kết bạn
                        </button>
								}
								<Link to={`/chat/${user?._id}`} className='bg-slate-500 text-white hover:bg-slate-700 rounded-md px-3 py-1'>Nhắn tin</Link>
							</div> : 
							<div className='mt-16 lg:mr-10 flex items-end gap-2'>
								<button className='bg-slate-400 text-white hover:bg-slate-600 rounded-md px-3 py-1'
									onClick={() => handleShowEdit()}>
                        Chỉnh sửa thông tin
								</button>
							</div>
						}
					</div>
				</div>
				{
					windowWidth < 1024 && (
						<div className='flex justify-center w-full h-auto absolute top-[35%] '>
							<div className={'h-auto w-[80%] flex flex-col'}>
								<div className='flex justify-center items-center'>
									<img
										src={user?.profile_pic}
										className='sm:w-[180px] sm:h-[180px] w-[150px] h-[150px] object-cover rounded-full border-4 border-slate-300'
									/>
								</div>
								<div className='flex justify-center items-center mt-2'>
									<p className='font-bold text-3xl flex items-center text-center gap-2'>
										{user?.name} {selfApi?._id===user?._id && <RiVerifiedBadgeFill className='text-blue-600 lg:text-xl text-nomal'/>}
									</p>
								</div>
								<div className='flex justify-center items-center'>
									{
										selfApi?._id!==user?._id && 
                              <p className='cursor-pointer hover:underline' onClick={() => handleOpenDetailsMutualFriend()}>
                              	{user?.mutualFriends?.length} bạn chung
                              </p>
									}
								</div>

								{selfApi?._id!==user?._id ?
									<div className='flex items-center justify-center gap-2 mt-5'>
										{
											selfApi?.friends.some((friend) => friend?.user===user?._id) &&
                                 <button className='bg-slate-400 text-white hover:bg-slate-700 rounded-md px-3 py-1'
                                 	onClick={() => handleUnfriend(user?._id)}>
                                    Hủy kết bạn
                                 </button>
										}
										{
											selfApi?.friend_requests.some((friend) => friend?.user===user?._id) &&
                                 <button className='bg-blue-600 text-white hover:bg-blue-800 rounded-md px-3 py-1'
                                 	onClick={() => handleAcceptFriendRequest(user?._id)}>
                                    Chấp nhận lời mời
                                 </button>
										}
										{
											!selfApi?.friends.some((friend) => friend?.user===user?._id) &&
                                 !selfApi?.friend_requests.some((friend) => friend?.user===user?._id) &&
                                 !user?.friend_requests?.some((friend) => friend?.user===selfApi?._id) && 
                                 <button className='bg-blue-600 text-white hover:bg-blue-800 rounded-md px-3 py-1'
                                 	onClick={() => handleFriendRequest(user?._id)}>
                                    Kết bạn
                                 </button>
										}
										{
											user?.friend_requests?.some((friend) => friend?.user===selfApi?._id) && 
                                 <button className='bg-slate-400 text-white hover:bg-slate-700 rounded-md px-3 py-1'
                                 	onClick={() => handleCancelFriendRequest(user?._id)}>
                                    Hủy yêu cầu kết bạn
                                 </button>
										}
										<Link to={`/chat/${user?._id}`} className='bg-slate-500 text-white hover:bg-slate-700 rounded-md px-3 py-1'>Nhắn tin</Link>
									</div> : 
									<div className='flex items-center justify-center gap-2 mt-5'>
										<button className='bg-slate-400 text-white hover:bg-slate-600 rounded-md px-3 py-1'
											onClick={() => handleShowEdit()}>
                                 Chỉnh sửa thông tin
										</button>
									</div>
								}
							</div>
						</div>
					)
				}
			</div>
			<div className='flex justify-center bg-slate-200'>
				<hr className={'w-[80%] border-slate-300'}/>
			</div>
			<div className='flex justify-center bg-slate-200'>
				<div className={'md:w-[80%] w-full justify-center md:justify-start px-1 py-3 flex items-center md:gap-1'}>
					<Tab label="Bài viết" isActive={activeTab === 'Bài viết'} onClick={() => setActiveTab('Bài viết')}/>
					<Tab label="Giới thiệu" isActive={activeTab === 'Giới thiệu'} onClick={() => setActiveTab('Giới thiệu')}/>
					<Tab label="Bạn bè" isActive={activeTab === 'Bạn bè'} onClick={() => setActiveTab('Bạn bè')}/>
					<Tab label="Ảnh" isActive={activeTab === 'Ảnh'} onClick={() => setActiveTab('Ảnh')}/>
					<Tab label="Video" isActive={activeTab === 'Video'} onClick={() => setActiveTab('Video')}/>
				</div>
			</div>
			<div className='flex justify-center'>
				<div className={'md:w-[80%] w-full h-auto py-5'}>
					{activeTab==='Bài viết' && (
						<PostsUser objectId={user?._id} news={news} loading={loading} handleLikePost={handleLikePost} handleCommentPost={handleCommentPost}/>
					)}
					{activeTab==='Giới thiệu' && (
						<IntroductionUser objectId={user?._id}/>
					)}
					{activeTab==='Bạn bè' && (
						<FriendUser objectId={user?._id}/>
					)}
					{activeTab==='Ảnh' && (
						<Images objectId={user?._id} typeObject={'user'}/>
					)}
					{activeTab==='Video' && (
						<Videos objectId={user?._id} typeObject={'user'}/>
					)}
				</div>
			</div>
			{
				showEdit && (
					<EditUserDetails onClose={() => handleShowEdit()}/>
				)
			}
			{
				isOpenDetailsMutualFriend && (
					<DetailsMutualFriend setIsOpenDetailsMutualFriend={setIsOpenDetailsMutualFriend} mutualFriendWith={mutualFriendWith}/>
				)
			}
		</div>
	)
}

export default ProfileUser

// chat window
// thông báo

// call, Video call
// responsive