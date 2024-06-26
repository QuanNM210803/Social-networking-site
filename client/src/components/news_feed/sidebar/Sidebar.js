/* eslint-disable no-unexpected-multiline */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { IoPeopleSharp } from 'react-icons/io5'
import { BiSolidVideos } from 'react-icons/bi'
import { MdGroups } from 'react-icons/md'
import { IoGameControllerSharp } from 'react-icons/io5'
import { IoIosArrowDown } from 'react-icons/io'
import { IoIosArrowUp } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { getGroupByUserId } from '../../../apis/GroupApi'

const Sidebar = ({ user }) => {
	const [showMore, setShowMore]=useState(false)
	const [groups, setGroups]=useState([])
	useEffect(() => {
		getGroupByUserId().then((data) => {
			setGroups(data?.data)
		})
	}, [])
	const handleShowMore=() => {
		setShowMore(!showMore)
	}
	return (
		<div className='w-[365px]'>
			<div className='w-full h-auto py-2'>
				<Link to={`/profileUser/${user?._id}`} className='flex gap-3 py-2 px-5 items-center cursor-pointer hover:bg-slate-200 rounded-lg'>
					<img
						src={user?.profile_pic}
						alt='profile'
						className='rounded-full w-10 h-10'
					/>
					<p className='text-nomal font-semibold'>{user?.name}</p>
				</Link>
				<Link to={'/friend-request'} className='flex gap-5 py-2 px-5 items-center cursor-pointer hover:bg-slate-200 rounded-lg'>
					<IoPeopleSharp className='w-8 h-8 text-blue-600 cursor-pointer'/>
					<p className='text-base font-semibold'>Bạn bè</p>
				</Link>
				<Link to={'/video'} className='flex gap-5 py-2 px-5 items-center cursor-pointer hover:bg-slate-200 rounded-lg'>
					<BiSolidVideos className='w-8 h-8 text-red-600 cursor-pointer'/>
					<p className='text-base font-semibold'>Video</p>
				</Link>
				<Link to={'/groups'} className='flex gap-5 py-2 px-5 items-center cursor-pointer hover:bg-slate-200 rounded-lg'>
					<MdGroups className='w-8 h-8 text-teal-600 cursor-pointer'/>
					<p className='text-base font-semibold'>Nhóm</p>
				</Link>
				<Link to={'/games'} className='flex gap-5 py-2 px-5 items-center cursor-pointer hover:bg-slate-200 rounded-lg'>
					<IoGameControllerSharp className='w-8 h-8 text-gray-700 cursor-pointer'/>
					<p className='text-base font-semibold'>Trò chơi</p>
				</Link>
			</div>

			<div className='flex justify-center'>
				<hr className='bg-slate-200 h-[1.5px] w-[80%]'/>
			</div>

			<div className='w-full h-auto py-2'>
				<div className='px-5 flex items-center'>
					<p className='text-base'>Lối tắt của bạn</p>
				</div>
				<div className='mt-2'>
					{groups?.length>=5 && groups.slice(0, 5).map((group, index) => {
						return (
							<Link to={`/profileGroup/${group?._id}`} className='flex items-center gap-5 py-2 px-5 cursor-pointer hover:bg-slate-200 rounded-lg'>
								<img
									src={group?.profile_pic}
									className='rounded w-9 h-9 object-cover'
								/>
								<p className='text-base font-semibold'>{group?.name}</p>
							</Link>
						)
					})}
					{groups?.length>0 && groups?.length<5 && groups.map((group, index) => {
						return (
							<Link to={`/profileGroup/${group?._id}`} className='flex items-center gap-5 py-2 px-5 cursor-pointer hover:bg-slate-200 rounded-lg'>
								<img
									src={group?.profile_pic}
									className='rounded w-9 h-9 object-cover'
								/>
								<p className='text-base font-semibold'>{group?.name}</p>
							</Link>
						)
					})}
					{
						groups?.length === 0 && (
							<div className='flex items-center justify-center w-full h-16'>
								<p className='text-slate-500 text-center'>Bạn chưa tham gia nhóm nào</p>
							</div>
						)
					}
					{groups?.length > 5 && !showMore && (
						<div className='flex items-center gap-5 py-2 px-5 cursor-pointer hover:bg-slate-200 rounded-lg'
							onClick={handleShowMore}>
							<div className='flex items-center justify-center bg-slate-100 w-9 h-9 rounded-full '>
								<IoIosArrowDown size={25}/>
							</div>
							<p className='text-base font-semibold'>Xem thêm</p>
						</div>
					)}
					{showMore && (
						<>
							{groups.slice(5).map((group, index) => (
								<Link to={`/profileGroup/${group?._id}`} className='flex items-center gap-5 py-2 px-5 cursor-pointer hover:bg-slate-200 rounded-lg'>
									<img
										src={group?.profile_pic}
										className='rounded w-9 h-9 object-cover'
									/>
									<p className='text-base font-semibold'>{group?.name}</p>
								</Link>
							))}
							<div className='flex items-center gap-5 py-2 px-5 cursor-pointer hover:bg-slate-200 rounded-lg'
								onClick={handleShowMore}>
								<div className='flex items-center justify-center bg-slate-100 w-9 h-9 rounded-full '>
									<IoIosArrowUp size={25}/>
								</div>
								<p className='text-base font-semibold'>Ẩn bớt</p>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default Sidebar
