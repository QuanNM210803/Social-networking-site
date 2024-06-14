/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Tab from '../../../chat/rightbar/Tab'
import Posts from '../Posts'
import Images from '../Images'
import Videos from '../Videos'
import IntroductionUser from './IntroductionUser'
import FriendUser from './FriendUser'

const ProfileUser = ({ idFriend }) => {
	const [activeTab, setActiveTab] =useState('Bài viết')
	const [user, setUser] = useState({
		_id: idFriend,
		name: 'Nguyễn Văn A',
		avatar: 'https://i.imgur.com/5JfZJfP.jpg',
		coverPhoto: 'https://www.w3schools.com/howto/img_avatar.png',
		mutualFriends: 5
	})
	return (
		<div className='w-full h-auto'>
			<div className='relative w-full h-[500px] bg-slate-200'>
				<div className='flex justify-center rounded-b-md'>
					<img
						src={user?.coverPhoto}
						className={'w-[80%] h-[350px] object-cover rounded-b-md'}
					/>
				</div>
				<div className='flex justify-center w-full h-auto absolute top-[60%]'>
					<div className={'h-auto w-[80%] flex justify-between'}>
						<div className='flex gap-5'>
							<div className='ml-10'>
								<img
									src={user?.avatar}
									className='w-[180px] h-[180px] object-cover rounded-full border-4 border-slate-300'
								/>
							</div>
							<div className='items-center mt-16'>
								<p className='font-bold text-3xl'>{user?.name}</p>
								<p>{user?.mutualFriends} bạn chung</p>
							</div>
						</div>
						<div className='mt-16 mr-10 flex items-end gap-2'>
							<button className='bg-blue-600 text-white hover:bg-blue-800 rounded-md px-3 py-1'>Kết bạn</button>
							<button className='bg-slate-500 text-white hover:bg-slate-700 rounded-md px-3 py-1'>Nhắn tin</button>
						</div>
					</div>
				</div>
			</div>
			<div className='flex justify-center bg-slate-200'>
				<hr className={'w-[80%] border-slate-300'}/>
			</div>
			<div className='flex justify-center bg-slate-200'>
				<div className={'w-[80%] px-1 py-3 flex items-center gap-1'}>
					<Tab label="Bài viết" isActive={activeTab === 'Bài viết'} onClick={() => setActiveTab('Bài viết')}/>
					<Tab label="Giới thiệu" isActive={activeTab === 'Giới thiệu'} onClick={() => setActiveTab('Giới thiệu')}/>
					<Tab label="Bạn bè" isActive={activeTab === 'Bạn bè'} onClick={() => setActiveTab('Bạn bè')}/>
					<Tab label="Ảnh" isActive={activeTab === 'Ảnh'} onClick={() => setActiveTab('Ảnh')}/>
					<Tab label="Video" isActive={activeTab === 'Video'} onClick={() => setActiveTab('Video')}/>
				</div>
			</div>
			<div className='flex justify-center'>
				<div className={'w-[80%] h-auto py-5'}>
					{activeTab==='Bài viết' && (
						<Posts objectId={user?._id}/>
					)}
					{activeTab==='Giới thiệu' && (
						<IntroductionUser objectId={user?._id}/>
					)}
					{activeTab==='Bạn bè' && (
						<FriendUser objectId={user?._id}/>
					)}
					{activeTab==='Ảnh' && (
						<Images objectId={user?._id}/>
					)}
					{activeTab==='Video' && (
						<Videos objectId={user?._id}/>
					)}
				</div>
			</div>
		</div>
	)
}

export default ProfileUser