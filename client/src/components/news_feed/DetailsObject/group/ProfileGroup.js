/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Tab from '../../../chat/rightbar/Tab'
import Posts from '../Posts'
import Images from '../Images'
import Videos from '../Videos'
import IntroductionGroup from './IntroductionGroup'
import MemberGroup from './MemberGroup'

const ProfileGroup = ({ idGroup }) => {
	const [activeTab, setActiveTab] =useState('Bài viết')
	const [group, setGroup] = useState({
		_id: idGroup,
		name: 'Học lập trình cùng PTIT',
		avatar: 'https://i.imgur.com/5JfZJfP.jpg',
		coverPhoto: 'https://www.w3schools.com/howto/img_avatar.png',
		memberNumber: 35
	})
	return (
		<div className='w-full h-auto'>
			<div className='relative w-full h-[500px] bg-slate-200'>
				<div className='flex justify-center rounded-b-md'>
					<img
						src={group?.coverPhoto}
						className={'w-[80%] h-[350px] object-cover rounded-b-md'}
					/>
				</div>
				<div className='flex justify-center w-full h-auto absolute top-[60%]'>
					<div className={'h-auto w-[80%] flex justify-between'}>
						<div className='flex gap-5'>
							<div className='ml-10'>
								<img
									src={group?.avatar}
									className='w-[180px] h-[180px] object-cover rounded-full border-4 border-slate-300'
								/>
							</div>
							<div className='items-center mt-16'>
								<p className='font-bold text-3xl'>{group?.name}</p>
								<p>{group?.memberNumber} thành viên</p>
							</div>
						</div>
						<div className='mt-16 mr-10 flex items-end gap-2'>
							<button className='bg-blue-600 text-white hover:bg-blue-800 rounded-md px-3 py-1'>Tham gia nhóm</button>
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
					<Tab label="Thành viên" isActive={activeTab === 'Thành viên'} onClick={() => setActiveTab('Thành viên')}/>
					<Tab label="Ảnh" isActive={activeTab === 'Ảnh'} onClick={() => setActiveTab('Ảnh')}/>
					<Tab label="Video" isActive={activeTab === 'Video'} onClick={() => setActiveTab('Video')}/>
				</div>
			</div>
			<div className='flex justify-center'>
				<div className={'w-[80%] h-auto py-5'}>
					{activeTab==='Bài viết' && (
						<Posts objectId={group?._id} typeObject={'group'}/>
					)}
					{activeTab==='Giới thiệu' && (
						<IntroductionGroup objectId={group?._id}/>
					)}
					{activeTab==='Thành viên' && (
						<MemberGroup objectId={group?._id}/>
					)}
					{activeTab==='Ảnh' && (
						<Images objectId={group?._id} typeObject={'group'}/>
					)}
					{activeTab==='Video' && (
						<Videos objectId={group?._id} typeObject={'group'}/>
					)}
				</div>
			</div>
		</div>
	)
}

export default ProfileGroup