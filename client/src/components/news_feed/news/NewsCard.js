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
import { FaRegPlayCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import DetailsLike from './DetailsLike'

const NewsCard = ({ news, handleLikePost }) => {
	const user=useSelector(state => state?.user)
	const [post, setPost]=useState()
	const listMedia=news?.content?.video.concat(news?.content?.image)
	const numImage = news?.content?.image?.length
	const numVideo = news?.content?.video?.length
	const numMedia = numImage + numVideo

	const [currentMedia, setCurrentMedia]=useState(0)
	const [isOpenDetailMedia, setIsOpenDetailMedia]=useState(false)
	const [isOpenComment, setIsOpenComment]=useState(false)
	const [isOpenDetailsLike, setIsOpenDetailsLike]=useState(false)

	useEffect(() => {
		setPost(news)
	}, [news])

	const handleOpenDetailMedia = (index) => {
		setIsOpenDetailMedia(true)
		setCurrentMedia(index)
	}
	const handleCloseDetailMedia = () => {
		setIsOpenDetailMedia(false)
	}

	const handleOpenDetailsLike=() => {
		setIsOpenDetailsLike(!isOpenDetailsLike)
	}
	const handleOpenComment=() => {
		setIsOpenComment(!isOpenComment)
	}
	return (
		<div>
			<div className='w-full h-auto bg-slate-200 px-4 py-2 rounded-md space-y-2'>
				<div className='flex items-center gap-4'>
					<Link to={`/profileUser/${post?.poster?._id}`} className='w-[40px] h-[40px]'>
						<img
							src={post?.poster?.profile_pic}
							className='rounded-full w-full h-full object-cover cursor-pointer'
						/>
					</Link>
					<div className='space-y-0'>
						<div className='flex gap-2 items-center'>
							<Link to={`/profileUser/${post?.poster?._id}`} className='font-semibold'>{post?.poster?.name}</Link>
							{
								post?.group && (
									<p className='text-xs text-gray-500'>
                              đã đăng trong nhóm <strong className='cursor-pointer hover:underline'>{post?.group?.name}</strong>
									</p>
								)
							}
						</div>
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
											<div key={index} className='cursor-pointer relative opacity-80' onClick={() => handleOpenDetailMedia(index)}>
												<video
													src={item}
													key={index}
													className='w-full h-full object-cover'
												/>
												<div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
													<FaRegPlayCircle size={70}/>
												</div>
											</div>
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
											<div key={index} className='cursor-pointer relative opacity-80' onClick={() => handleOpenDetailMedia(index)}>
												<video
													src={item}
													key={index}
													className='w-full h-full object-cover'
												/>
												<div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
													<FaRegPlayCircle size={70}/>
												</div>
											</div>
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
							<div className='space-y-[1px]'>
								<div className='grid grid-flow-row grid-cols-2 gap-[1px]'>
									{
										listMedia.slice(0, 2).map((item, index) => (
											index<numVideo ? (
												<div key={index} className='cursor-pointer relative opacity-80' onClick={() => handleOpenDetailMedia(index)}>
													<video
														src={item}
														key={index}
														className='w-full h-full object-cover'
													/>
													<div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
														<FaRegPlayCircle size={50}/>
													</div>
												</div>
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
													<div key={index} className='cursor-pointer relative opacity-80' onClick={() => handleOpenDetailMedia(index)}>
														<video
															src={item}
															key={index}
															className='w-full h-full object-cover'
														/>
														<div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
															<FaRegPlayCircle size={50}/>
														</div>
													</div>
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
							</div>
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
					<div className='flex items-center gap-1 cursor-pointer' onClick={() => handleOpenDetailsLike()}>
						<AiFillLike className='text-blue-600'/>
						<p>{post?.like?.length}</p>
					</div>
					<div className='flex items-center gap-1 cursor-pointer hover:underline' onClick={handleOpenComment}>
						<p>{post?.comment} Comment</p>
					</div>
				</div>
				<div>
					<hr className='border-gray-300'/>
				</div>
				<div className='flex justify-between px-2'>
					<div className='w-[45%] h-9 flex justify-center items-center gap-2 hover:bg-slate-300 rounded cursor-pointer'
						onClick={() => handleLikePost(post?._id)}>
						<AiOutlineLike size={25} className={`${Array.isArray(post?.like) && post?.like.includes(user?._id) && 'text-blue-600'}`}/>
						<p className={`${Array.isArray(post?.like) && post?.like.includes(user?._id) && 'text-blue-600'}`}>Thích</p>
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
			{
				isOpenDetailsLike && (
					<DetailsLike handleOpenDetailsLike={handleOpenDetailsLike} likes={post?.like}/>
				)
			}
		</div>
	)
}

export default NewsCard