/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { getGroupById } from '../../../../apis/GroupApi'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RiVerifiedBadgeFill } from 'react-icons/ri'

const MemberGroup = ({ objectId }) => {
	const user=useSelector(state => state?.user)
	const [members, setMembers]=useState([])
	const [membersShow, setMembersShow]=useState([])
	const [admin, setAdmin]=useState([])
	const [search, setSearch] = useState('')

	useEffect(() => {
		getGroupById(objectId).then((data) => {
			setMembers(data?.data?.members)
			setMembersShow(data?.data?.members)
			setAdmin(data?.data?.admin)
		})
	}, [objectId])

	useEffect(() => {
		if (search==='') {
			setMembersShow(members)
		} else {
			const filteredMembers=members?.filter(member => member?.name.toLowerCase().includes(search.toLowerCase()))
			setMembersShow(filteredMembers)
		}
	}, [search])

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
						name='search'
						value={search}
						onChange={(e) => setSearch(e?.target?.value)}
						placeholder='Tìm kiếm thành viên'
						className='px-2 py-1 w-[200px] bg-slate-300 outline-none'
					/>
				</div>
			</div>
			{membersShow?.length>0 ? (
				<div className='grid grid-flow-row grid-cols-3 gap-2 py-2 px-3'>
					{
						membersShow.map((member, index) => (
							<div className='flex gap-3 hover:bg-slate-100 px-3 py-2 rounded-md border-slate-300 border'>
								<Link to={`/profileUser/${member?._id}`} className='flex-shrink-0'>
									<img
										src={member?.profile_pic}
										className='rounded-lg w-14 h-14 object-cover'
									/>
								</Link>
								<div className='w-full h-full flex items-center'>
									<div className='w-auto h-auto'>
										<Link to={`/profileUser/${member?._id}`} className='text-sm font-semibold hover:underline flex items-center gap-1'>
											{member?.name} {member?._id===user?._id && <RiVerifiedBadgeFill className='text-blue-600'/>}
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