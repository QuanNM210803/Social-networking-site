/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { authorization, getGroupById } from '../../../../apis/GroupApi'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RiVerifiedBadgeFill } from 'react-icons/ri'
import { BiDotsVerticalRounded } from 'react-icons/bi'

const MemberGroup = ({ objectId }) => {
	const user=useSelector(state => state?.user)
	const [members, setMembers]=useState([])
	const [membersShow, setMembersShow]=useState([])
	const [admin, setAdmin]=useState([])
	const [search, setSearch] = useState('')
	const [indexAuthorization, setIndexAuthorization] = useState(null)

	useEffect(() => {
		getGroupById(objectId).then((data) => {
			setMembers(data?.data?.members)
			setMembersShow(data?.data?.members)
			setAdmin(data?.data?.admin)
		})
	}, [objectId])

	useEffect(() => {
		setIndexAuthorization(null)
		if (search==='') {
			setMembersShow(members)
		} else {
			const filteredMembers=members?.filter(member => member?.name.toLowerCase().includes(search.toLowerCase()))
			setMembersShow(filteredMembers)
		}
	}, [search])

	const handleAuthorization=async (userId) => {
		await authorization({ groupId:objectId, userId }).then((data) => {
			setIndexAuthorization(null)
			if (data?.admin==true) {
				setAdmin([...admin, { _id:userId }])
			} else if (data?.admin==false) {
				setAdmin(admin.filter(ad => ad._id!==userId))
			}
		})
	}

	
	const handleOpenAuthorization=(index) => {
		if (index===indexAuthorization) {
			setIndexAuthorization(null)
			return
		}
		setIndexAuthorization(index)
	}


	return (
		<div className='flex justify-center w-full'>
			<div className='bg-slate-200 rounded-md h-auto md:w-full sm:w-[80%] w-full'>
				<div className='flex justify-between px-3 py-2'>
					<div className='flex items-center md:gap-7 gap-2'>
						<div className='flex items-center gap-1'>
							<p className='md:text-2xl text-lg font-bold sm:px-3'>Thành viên</p>
							<p className='sm:hidden block text-lg font-bold'>({membersShow?.length})</p>
						</div>
						<p className='sm:block hidden'>{membersShow?.length} thành viên</p>
					</div>
					<div className='flex items-center bg-slate-300 px-1 rounded-md'>
						<IoIosSearch size={20}/>
						<input
							type='text'
							name='search'
							value={search}
							onChange={(e) => setSearch(e?.target?.value)}
							placeholder='Tìm kiếm'
							className='px-2 sm:w-[200px] w-[150px] py-1 bg-slate-300 outline-none'
						/>
					</div>
				</div>
				{membersShow?.length>0 ? (
					<div className='grid grid-flow-row lg:grid-cols-3 md:grid-cols-2 gap-2 py-2 px-3'>
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

									{
										member?._id!==user?._id && admin.some( ad => ad?._id===user?._id) && 
                              <div className='flex items-center justify-end relative'>
                              	<BiDotsVerticalRounded className='text-xl cursor-pointer' onClick={() => handleOpenAuthorization(index)}/>
                              	{
                              		indexAuthorization===index && 
                                    <button className='h-auto w-[150px] bg-slate-300 hover:bg-slate-400 py-1 px-2 rounded-md absolute -top-5 right-0 z-10 border-[1px] border-slate-500'
                              			onClick={() => handleAuthorization(member?._id)}>
                              			{
                              				admin.some(ad => ad._id===member._id) ? (
                              					<p className='text-sm'>Gỡ quản trị</p>
                              				):(
                              					<p className='text-sm'>Thêm quyền quản trị</p>
                              				)
                              			}
                              		</button>
                              	}
                              </div>
									}
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
		</div>
	)
}

export default MemberGroup