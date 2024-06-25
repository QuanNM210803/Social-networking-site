/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { getGroupById } from '../../../../apis/GroupApi'
import { Link } from 'react-router-dom'

const MemberGroup = ({ objectId }) => {
	const [members, setMembers]=useState([])
	const [admin, setAdmin]=useState([])
	useEffect(() => {
		getGroupById(objectId).then((data) => {
			setMembers(data?.data?.members)
			setAdmin(data?.data?.admin)
		})
	}, [objectId])

	return (
		<div className='bg-slate-200 rounded-md h-auto'>
			<div className='flex justify-between px-3 py-2'>
				<div className='flex items-center gap-7'>
					<p className='text-2xl font-bold px-3'>Thành viên</p>
					<p>{members?.length} thành viên</p>
				</div>
				<div className='flex items-center bg-slate-300 px-1 rounded-md'>
					<IoIosSearch size={20}/>
					<input
						type='text'
						placeholder='Tìm kiếm thành viên'
						className='px-2 py-1 w-[200px] bg-slate-300 outline-none'
					/>
				</div>
			</div>
			{members?.length>0 ? (
				<div className='grid grid-flow-row grid-cols-3 gap-2 py-2 px-3'>
					{
						members.map((member, index) => (
							<div className='flex gap-3 hover:bg-slate-100 px-3 py-2 rounded-md border-slate-300 border'>
								<Link to={`/profileUser/${member?._id}`} className=''>
									<img
										src={member?.profile_pic}
										width={80}
										height={80}
										className='rounded-lg'
									/>
								</Link>
								<div className='w-full h-full flex items-center'>
									<div className='w-auto h-auto'>
										<Link to={`/profileUser/${member?._id}`} className='text-sm font-semibold hover:underline'>
											{member?.name}
										</Link>
										{
											admin.some(ad => ad._id===member._id) && (
												<p className='text-sm'>Quản trị viên</p>
											)
										}
									</div>
								</div>
							</div>
						))
					}
				</div>
			):(
				<div className='w-full h-20 flex justify-center items-center'>
					<p className='text-slate-500 text-lg'>Không có thành viên nào.</p>
				</div>
			)}
		</div>
	)
}

export default MemberGroup