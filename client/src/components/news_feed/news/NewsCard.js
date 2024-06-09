/* eslint-disable no-console */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import { AiFillLike } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa'
import { AiOutlineLike } from 'react-icons/ai'
import DetailsMedia from '../../DetailsMedia'
import Comment from './Comment'

const NewsCard = ({ news }) => {
	const [post, setPost]=useState()
	const listMedia=news?.content?.video.concat(news?.content?.image)
	const numImage = news?.content?.image?.length
	const numVideo = news?.content?.video?.length
	const numMedia = numImage + numVideo
	const videoRef=useRef(null)

	const [currentMedia, setCurrentMedia]=useState(0)
	const [isOpenDetailMedia, setIsOpenDetailMedia]=useState(false)
	const [isOpenComment, setIsOpenComment]=useState(false)
	useEffect(() => {
		setPost(news)
	}, [news])

	const handleOpenDetailMedia = (index) => {
		if (videoRef.current) {
			videoRef.current.pause()
		}
		setIsOpenDetailMedia(true)
		setCurrentMedia(index)
	}
	const handleCloseDetailMedia = () => {
		setIsOpenDetailMedia(false)
	}

	const handleOpenComment=() => {
		setIsOpenComment(!isOpenComment)
	}
	return (
		<div>
			<div className='w-full h-auto bg-slate-200 px-4 py-2 rounded-md space-y-2'>
				<div className='flex items-center gap-4'>
					<img
						src={post?.poster?.avatar}
						width={40}
						height={40}
						className='rounded-full'
					/>
					<div className='space-y-0'>
						<p className='font-semibold'>{post?.poster?.name}</p>
						<p className='text-mini'>{post?.createdAt}</p>
					</div>
				</div>
				<div className='space-y-1'>
					<div className='px-2'>
						{post?.content?.text}
					</div>
					<div className='py-1'>
						{numMedia>0 && numMedia<=3 && (
							<div className={`grid grid-flow-row grid-cols-${numMedia} gap-[1px]`}>
								{
									listMedia.map((item, index) => (
										index<numVideo ? (
											<video
												ref={videoRef}
												src={item}
												key={index}
												controls
												className='w-full h-full object-cover cursor-pointer'
											/>
										):(
											<img
												src={item}
												key={index}
												className='w-full h-full object-cover cursor-pointer'
												onClick={() => handleOpenDetailMedia(index)}
											/>
										)
									))
								}
							</div>
						)}
						{numMedia===4 && (
							<div className='grid grid-flow-row grid-cols-2 gap-[1px]'>
								{
									listMedia.map((item, index) => (
										index<numVideo ? (
											<video
												ref={videoRef}
												src={item}
												key={index}
												controls
												className='w-full h-full object-cover cursor-pointer'
											/>
										):(
											<img
												src={item}
												key={index}
												className='w-full h-full object-cover cursor-pointer'
												onClick={() => handleOpenDetailMedia(index)}
											/>
										)
									))
								}
							</div>
						)}
						{numMedia>=5 && (
							<>
								<div className='grid grid-flow-row grid-cols-2 gap-[1px]'>
									{
										listMedia.slice(0, 2).map((item, index) => (
											index<numVideo ? (
												<video
													ref={videoRef}
													src={item}
													key={index}
													controls
													className='w-full h-full object-cover cursor-pointer'
												/>
											):(
												<img
													src={item}
													key={index}
													className='w-full h-full object-cover cursor-pointer'
													onClick={() => handleOpenDetailMedia(index)}
												/>
											)
										))
									}
								</div>
								<div className='grid grid-flow-row grid-cols-3 gap-[1px]'>
									{
										listMedia.map((item, index) => (
											index>=2 && index<5 && (
												index<numVideo ? (
													<video
														ref={videoRef}
														src={item}
														key={index}
														controls
														className='w-full h-full object-cover cursor-pointer'
													/>
												):(
													<img
														src={item}
														key={index}
														className='w-full h-full object-cover cursor-pointer'
														onClick={() => handleOpenDetailMedia(index)}
													/>
												)
											)
										))
									}
								</div>
							</>
						)}
						{numMedia>5 && (
							<p className='font-semibold mt-2 cursor-pointer hover:text-blue-700 hover:underline'
								onClick={() => handleOpenDetailMedia(5)}
							>
                     Xem thêm {numMedia-5} ảnh ...
							</p>
						)}
					</div>
				</div>
				<div className='flex justify-between px-2'>
					<div className='flex items-center gap-1'>
						<AiFillLike className='text-blue-600'/>
						<p>{post?.like}</p>
					</div>
					<div className='flex items-center gap-1 cursor-pointer hover:underline' onClick={handleOpenComment}>
						<p>{post?.like} Comment</p>
					</div>
				</div>
				<div>
					<hr className='border-gray-300'/>
				</div>
				<div className='flex justify-between px-2'>
					<div className='w-[45%] h-9 flex justify-center items-center gap-2 hover:bg-slate-300 rounded cursor-pointer'>
						<AiOutlineLike size={25}/>
						<p className='font-semibold'>Thích</p>
					</div>
					<div className='w-[45%] h-9 flex justify-center items-center gap-2 hover:bg-slate-300 rounded cursor-pointer'
						onClick={handleOpenComment}
					>
						<FaRegComment size={23}/>
						<p className='font-semibold'>Comment</p>
					</div>
				</div>
			</div>
			{
				isOpenDetailMedia && (
					<DetailsMedia handleCloseDetailMedia={handleCloseDetailMedia} currentMedia={currentMedia}
						listMedia={listMedia} numMedia={numMedia}
					/>
				)
			}
			{
				isOpenComment && (
					<Comment handleOpenComment={handleOpenComment} news={news}/>
				)
			}
		</div>
	)
}

export default NewsCard