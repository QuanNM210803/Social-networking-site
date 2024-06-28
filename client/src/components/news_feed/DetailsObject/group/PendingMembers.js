/* eslint-disable no-empty */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { acceptJoinGroup, getGroupById } from '../../../../apis/GroupApi'
import { Link } from 'react-router-dom'

const PendingMembers = ({ objectId, socketConnection }) => {
	const user=useSelector(state => state?.user)
	const [pending_members, setPending_members]=useState([])

	useEffect(() => {
		getGroupById(objectId).then((data) => {
			setPending_members(data?.data?.pending_members)
		})
	}, [objectId])

	const handleAcceptJoinGroup=async (userId) => {
		await acceptJoinGroup({ groupId:objectId, userId }).then((data) => {
			socketConnection.emit('accept-join-group', { senderId:user?._id, receiverId:userId, groupId:objectId })
			if (data?.success) {
				setPending_members(pending_members.filter(member => member?._id !== userId))
			}
		})
	}
	return (
		<div className='bg-slate-200 rounded-md h-auto'>
			{pending_members?.length>0 ? (
				<div className='grid grid-flow-row grid-cols-3 gap-2 py-2 px-3'>
					{
						pending_members.map((member, index) => (
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
											{member?.name}
										</Link>
									</div>
								</div>
								<div className='flex items-center justify-end w-auto h-auto'>
									<button className='w-[100px] h-auto hover:bg-slate-200 px-2 py-1 rounded-md'
										onClick={() => handleAcceptJoinGroup(member?._id)}>
                              Chấp nhận
									</button>
								</div>
							</div>
						))
					}
				</div>
			):(
				<div className='w-full h-20 flex justify-center items-center'>
					<p className='text-slate-500 text-lg'>Không có người nào yêu cầu tham gia nhóm.</p>
				</div>
			)}
		</div>
	)
}

export default PendingMembers