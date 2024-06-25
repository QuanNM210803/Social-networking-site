/* eslint-disable no-unused-vars */
import React from 'react'
import { useSelector } from 'react-redux'

const Avatar = ({ userId, name, imageUrl, width, height }) => {
	const onlineUsers=useSelector(state => state?.user?.onlineUsers)
	const isOnline=onlineUsers?.includes(userId)

	return (
		<div className={'text-slate-800 rounded-full font-bold relative'} 
			style={{ width:width+'px', height:height+'px' }} >
			<img 
				src={imageUrl}
				alt={name}
				className='overflow-hidden rounded-full object-cover border-[1px] border-slate-400'
				style={{ width:width+'px', height:height+'px' }}
			>
			</img>
			{
				isOnline && (
					<div className='absolute bottom-[2px] right-[1px] w-[9px] h-[9px] rounded-full bg-green-600'></div>
				)
			}
		</div>
	)
}

export default Avatar