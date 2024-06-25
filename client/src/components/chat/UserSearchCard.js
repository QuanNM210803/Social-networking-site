/* eslint-disable no-unused-vars */
import React from 'react'
import Avatar from '../Avatar'
import { Link } from 'react-router-dom'

const UserSearchCard = ({ user, onClose }) => {
	return (
		<Link to={'/chat/'+user?._id} onClick={onClose} className='flex items-center gap-3 p-2 border border-transparent border-b-slate-200 lg:p-4
         hover:border hover:border-primary rounded cursor-pointer'>
			<div className=''>
				<Avatar 
					width={50} 
					height={50} 
					name={user?.name} 
					userId={user?._id}
					imageUrl={user?.profile_pic}
				/>
			</div>
			<div className=''>
				<div className='font-semibold'>
					{user?.name}
				</div>
				<p className='text-sm text-ellipsis line-clamp-1'>{user?.email}</p>
			</div>
		</Link>
	)
}

export default UserSearchCard