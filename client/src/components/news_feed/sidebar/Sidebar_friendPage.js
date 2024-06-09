/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { IoMdPeople } from 'react-icons/io'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'
import { FaAngleRight } from 'react-icons/fa6'
import { FaArrowLeft } from 'react-icons/fa6'

const Sidebar_friendPage = ({ handleClickFriend }) => {
	const [option, setOption]=useState(null)
	const [friendRequest, setFriendRequest]=useState([
		{
			_id: '1',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A',
			inviteTime: '1 giờ trước',
			mutualFriends: 3
		},
		{
			_id: '2',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A',
			inviteTime: '1 giờ trước',
			mutualFriends: 3
		},
		{
			_id: '3',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A',
			inviteTime: '1 giờ trước',
			mutualFriends: 3
		},
		{
			_id: '4',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A',
			inviteTime: '1 giờ trước',
			mutualFriends: 3
		},
		{
			_id: '5',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A',
			inviteTime: '1 giờ trước',
			mutualFriends: 3
		},
		{
			_id: '6',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A',
			inviteTime: '1 giờ trước',
			mutualFriends: 3
		},
		{
			_id: '7',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A',
			inviteTime: '1 giờ trước',
			mutualFriends: 3
		},
		{
			_id: '8',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A',
			inviteTime: '1 giờ trước',
			mutualFriends: 3
		},
		{
			_id: '9',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A',
			inviteTime: '1 giờ trước',
			mutualFriends: 3
		},
		{
			_id: '10',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A',
			inviteTime: '1 giờ trước',
			mutualFriends: 3
		},
		{
			_id: '11',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A',
			inviteTime: '1 giờ trước',
			mutualFriends: 3
		},
		{
			_id: '12',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A',
			inviteTime: '1 giờ trước',
			mutualFriends: 3
		}
	])
	const [friends, setFriends]=useState([
		{
			_id: '1',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A',
			mutualFriends: 3
		},
		{
			_id: '2',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A',
			mutualFriends: 3
		},
		{
			_id: '3',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A',
			mutualFriends: 3
		},
		{
			_id: '4',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A',
			mutualFriends: 3
		},
		{
			_id: '5',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A',
			mutualFriends: 3
		},
		{
			_id: '6',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A',
			mutualFriends: 3
		},
		{
			_id: '7',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A',
			mutualFriends: 3
		},
		{
			_id: '8',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A',
			mutualFriends: 3
		},
		{
			_id: '9',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A',
			mutualFriends: 3
		},
		{
			_id: '10',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A',
			mutualFriends: 3
		}
	])
	const [friendsSuggest, setFriendsSuggest]=useState([
		{
			_id: '1',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A',
			mutualFriends: 3
		},
		{
			_id: '2',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A',
			mutualFriends: 3
		},
		{
			_id: '3',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A',
			mutualFriends: 3
		},
		{
			_id: '4',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A',
			mutualFriends: 3
		},
		{
			_id: '5',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A',
			mutualFriends: 3
		},
		{
			_id: '6',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A',
			mutualFriends: 3
		},
		{
			_id: '7',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A',
			mutualFriends: 3
		},
		{
			_id: '8',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A',
			mutualFriends: 3
		},
		{
			_id: '9',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A',
			mutualFriends: 3
		},
		{
			_id: '10',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A',
			mutualFriends: 3
		}
	])
	const handleClickedOption=(value) => {
		setOption(value)
	}
	return (
		<div className='h-auto'>
			<div className='px-3 py-2 bg-slate-300'>
				<p className='font-bold text-2xl text-slate-800'>Bạn bè</p>
			</div>
			{option===null && (
				<div>
					<div className='px-3 py-2 flex items-center justify-between hover:bg-slate-100 rounded-md cursor-pointer'
						onClick={() => handleClickedOption(1)}>
						<div className='flex items-center gap-4'>
							<PersonAddIcon sx={{ fontSize: 30 }}/>
							<p className='font-semibold text-nomal'>Lời mời kết bạn</p>
						</div>
						<FaAngleRight size={25}/>
					</div>
					<div className='px-3 py-2 flex items-center justify-between hover:bg-slate-100 rounded-md cursor-pointer'
						onClick={() => handleClickedOption(2)}>
						<div className='flex items-center gap-4'>
							<TipsAndUpdatesIcon sx={{ fontSize: 30 }}/>
							<p className='font-semibold text-nomal'>Gợi ý</p>
						</div>
						<FaAngleRight size={25}/>
					</div>
					<div className='px-3 py-2 flex items-center justify-between hover:bg-slate-100 rounded-md cursor-pointer'
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
						friendRequest.length===0 ? (
							<div className='py-5 px-5'>
								<p className='text-center text-slate-500'>Không có lời mời kết bạn</p>
							</div>
						):(
							<div className='py-2 px-3 space-y-2 h-[550px] overflow-auto scrollbar-newsfeed'>
								<div className='w-[335px]'>
									{
										friendRequest.map((friend, index) => (
											<div className='flex gap-3'>
												<div className=''>
													<img
														src={friend?.avatar}
														width={60}
														height={60}
														className='rounded-full cursor-pointer'
														onClick={() => handleClickFriend(friend?._id)}
													/>
												</div>
												<div className=' w-full h-auto'>
													<div className='flex justify-between'>
														<p className='text-sm font-semibold cursor-pointer hover:underline'
															onClick={() => handleClickFriend(friend?._id)}>{friend?.name}</p>
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
						friendsSuggest.length===0 ? (
							<div className='py-5 px-5'>
								<p className='text-center text-slate-500'>Không có bạn bè gợi ý</p>
							</div>
						):(
							<div className='py-2 px-3 space-y-2 h-[550px] overflow-auto scrollbar-newsfeed'>
								<div className='w-[335px]'>
									{
										friendsSuggest.map((friend, index) => (
											<div className='flex gap-3'>
												<div className=''>
													<img
														src={friend?.avatar}
														width={60}
														height={60}
														className='rounded-full cursor-pointer'
														onClick={() => handleClickFriend(friend?._id)}
													/>
												</div>
												<div className=' w-full h-auto'>
													<div className='flex justify-between'>
														<p className='text-sm font-semibold cursor-pointer hover:underline'
															onClick={() => handleClickFriend(friend?._id)}>{friend?.name}</p>
														<p className='text-sm'>{friend?.inviteTime}</p>
													</div>
													<div>
														<p className='text-sm'>{friend?.mutualFriends} bạn chung</p>
													</div>
													<div className='py-1 flex justify-between'>
														<button className='bg-blue-500 text-white hover:bg-blue-800 rounded-lg w-[45%] px-2 py-1'>Thêm bạn bè</button>
														<button className='bg-slate-400 text-white hover:bg-slate-500 rounded-lg w-[45%] px-2 py-1'>Xóa</button>
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
					<div className='flex items-center justify-between px-3 py-2 bg-slate-300'>
						<div className='flex items-center gap-4'>
							<FaArrowLeft size={30} className='cursor-pointer p-1 rounded-full hover:bg-slate-200'
								onClick={() => handleClickedOption(null)}/>
							<p className='font-semibold text-nomal'>Tất cả bạn bè</p>
						</div>
						<p className='font-semibold text-mini-1'>{friends.length} người bạn</p>
					</div>
					{
						friends.length===0 ? (
							<div className='py-5 px-5'>
								<p className='text-center text-slate-500'>Bạn chưa kết bạn với ai. Hãy tìm kiếm bạn bè ngay!</p>
							</div>
						):(
							<div className='py-3 px-3 h-[550px] overflow-auto scrollbar-newsfeed'>
								<div className='w-[335px] space-y-3'>
									{
										friends.map((friend, index) => (
											<div className='flex gap-3'>
												<div className=''>
													<img
														src={friend?.avatar}
														width={60}
														height={60}
														className='rounded-full cursor-pointer'
														onClick={() => handleClickFriend(friend?._id)}
													/>
												</div>
												<div className=' w-full h-auto py-1'>
													<div className='flex justify-between'>
														<p className='text-sm font-semibold cursor-pointer hover:underline'
															onClick={() => handleClickFriend(friend?._id)}>{friend?.name}</p>
													</div>
													<div>
														<p className='text-sm'>{friend?.mutualFriends} bạn chung</p>
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
		</div>
	)
}

export default Sidebar_friendPage