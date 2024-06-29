/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa'
import CommentVideoCard from './CommentVideoCard'
import { HiOutlineSave } from 'react-icons/hi'

const VideoCard = ({ news }) => {
	const [isOpenComment, setIsOpenComment]=useState(false)
	const handleOpenComment=() => {
		setIsOpenComment(!isOpenComment)
	}

	return (
		<div>
			<div className='w-full h-auto bg-slate-200 px-4 py-2 rounded-md space-y-2'>
				<div className='flex justify-between items-center '>
					<div className='gap-4 flex '>
						<img
							src={news?.poster?.avatar}
							className='rounded-full w-10 h-10 flex items-start object-cover'
						/>
						<div className='space-y-0 '>
							<p className='font-semibold'>{news?.poster?.name}</p>
							<p className='text-mini'>{news?.createdAt}</p>
						</div>
					</div>
					<div className='flex items-center gap-2 cursor-pointer hover:bg-slate-300 px-2 py-1 rounded-md'>
						<HiOutlineSave size={25} className=''/>
						<p className='sm:block hidden'>Lưu Video</p>
					</div>
				</div>
				<div className='space-y-1'>
					<div className='px-2'>
						{news?.content?.text}
					</div>
					<div className='py-1'>
						<video
							src={news?.content?.video}
							controls
							className='w-full h-auto rounded cursor-pointer'
						/>
					</div>
				</div>
				<div className='flex justify-between px-2'>
					<div className='flex items-center gap-1'>
						<AiFillLike className='text-blue-600'/>
						<p>{news?.like}</p>
					</div>
					<div className='flex items-center gap-1 cursor-pointer hover:underline' onClick={handleOpenComment}>
						<p>{news?.like} Comment</p>
					</div>
				</div>
				<div>
					<hr className='border-gray-300'/>
				</div>
				<div className='flex justify-between px-2'>
					<div className='w-[45%] h-9 flex justify-center items-center gap-2 hover:bg-slate-300 rounded cursor-pointer'>
						<AiOutlineLike size={25}/>
						<p className='font-semibold sm:block hidden'>Thích</p>
					</div>
					<div className='w-[45%] h-9 flex justify-center items-center gap-2 hover:bg-slate-300 rounded cursor-pointer'
						onClick={handleOpenComment}
					>
						<FaRegComment size={23} className='flex-shrink-0'/>
						<p className='font-semibold sm:block hidden'>Comment</p>
					</div>
				</div>
			</div>
			{
				isOpenComment && (
					<CommentVideoCard handleOpenComment={handleOpenComment} news={news}/>
				)
			}
		</div>
	)
}

export default VideoCard