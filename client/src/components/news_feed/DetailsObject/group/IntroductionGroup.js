/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { RiGitRepositoryPrivateFill } from 'react-icons/ri'
import { FaAngleUp, FaClock } from 'react-icons/fa'
import { FaPeopleGroup } from 'react-icons/fa6'
import { RiAdminFill } from 'react-icons/ri'
import { FaSortDown } from 'react-icons/fa'
import { FaAngleDown } from 'react-icons/fa'

const IntroductionGroup = ({ objectId }) => {
	const [showAdmin, setShowAdmin]=useState(false)
	const [groupInformation, setGroupInformation]=useState({
		createdAt: '21/08/2021',
		memberNumber: 35,
		admin: [
			{
				_id: '1',
				name: 'Nguyễn Minh Quân',
				avatar: 'https://www.w3schools.com/howto/img_avatar.png'
			},
			{
				_id: '2',
				name: 'Nguyên Thị Thảo Vân',
				avatar: 'https://www.w3schools.com/howto/img_avatar.png'
			},
			{
				_id: '3',
				name: 'Ất Văn Ơn',
				avatar: 'https://www.w3schools.com/howto/img_avatar.png'
			}
		],
		private: 'Công khai'
	})
	const handleClickShowAdmin=() => {
		setShowAdmin(!showAdmin)
	}
	return (
		<div className='bg-slate-200 rounded-md h-auto'>
			<div className='flex justify-between px-3 py-2'>
				<p className='text-2xl font-bold px-3'>Giới thiệu</p>
			</div>
			<div className='px-3 py-3 w-full h-auto'>
				<div className='px-3 space-y-2 w-[450px]'>
					<div className='flex gap-3 p-2 rounded-lg bg-slate-300'>
						<div className='flex items-start'>
							<div className='flex items-center'>
								<RiGitRepositoryPrivateFill size={25}/>
							</div>
						</div>
						<div className='flex items-start'>
							<div className='flex items-center gap-1'>
								<p>Đây là nhóm</p>
								<p className='break-words font-semibold'>{groupInformation?.private}</p>
							</div>
						</div>
					</div>
					<div className='flex gap-3 p-2 rounded-lg bg-slate-300'>
						<div className='flex items-start'>
							<div className='flex items-center'>
								<FaClock size={25}/>
							</div>
						</div>
						<div className='flex items-start'>
							<div className='flex items-center gap-1'>
								<p>Ngày tạo nhóm</p>
								<p className='break-words font-semibold'>{groupInformation?.createdAt}</p>
							</div>
						</div>
					</div>
					<div className='flex gap-3 p-2 rounded-lg bg-slate-300'>
						<div className='flex items-start'>
							<div className='flex items-center'>
								<FaPeopleGroup size={25}/>
							</div>
						</div>
						<div className='flex items-start'>
							<div className='flex items-center gap-1'>
								<p className='break-words font-semibold'>{groupInformation?.memberNumber}</p>
								<p>thành viên</p>
							</div>
						</div>
					</div>
					<div className='rounded-lg bg-slate-300'>
						<div className='flex justify-between p-2'>
							<div className='flex gap-3'>
								<div className='flex items-start'>
									<div className='flex items-center gap-1 '>
										<RiAdminFill size={25}/>
									</div>
								</div>
								<div className='flex items-start'>
									<div className='flex items-center gap-1'>
										<p className='break-words font-semibold'>{groupInformation?.admin?.length}</p>
										<p>người làm quản trị viên</p>
									</div>
								</div>
							</div>
							<div className='flex items-center justify-center cursor-pointer' onClick={handleClickShowAdmin}>
								{showAdmin ? (<FaAngleUp size={25}/>) : (<FaAngleDown size={25}/>)}
							</div>
						</div>
						{showAdmin && (
							<div className='px-2 py-2 space-y-2'>
								{groupInformation?.admin?.map((admin) => (
									<div key={admin?._id} className='flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-slate-200 cursor-pointer
                              border border-slate-200'>
										<img
											src={admin?.avatar}
											className='w-[35px] h-[35px] object-cover rounded-full'
										/>
										<p>{admin?.name}</p>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default IntroductionGroup