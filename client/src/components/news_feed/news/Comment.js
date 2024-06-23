/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { FaRegComment, FaVideo } from 'react-icons/fa'
import { IoMdSend } from 'react-icons/io'
import { IoCloseOutline } from 'react-icons/io5'
import { FaImage } from 'react-icons/fa'

const Comment = ({ handleOpenComment, news }) => {
	const [post, setPost]=useState()
	const listMedia=news?.content?.video.concat(news?.content?.image)
	const numImage = news?.content?.image?.length
	const numVideo = news?.content?.video?.length
	const numMedia = numImage + numVideo
	const [comments, setComments]=useState([
		{
			content: {
				text: 'Day la comment 1 Day la comment 1 Day la comment 1 Day la comment 1 Day la comment 1 Day la comment 1',
				image: ['https://www.w3schools.com/howto/img_avatar.png'],
				video: []
			},
			poster: {
				name: 'Nguyễn Minh Quân',
				avatar: 'https://www.w3schools.com/howto/img_avatar.png'
			},
			createdAt: '54 phút'
		},
		{
			content: {
				text: 'Day la comment 2',
				image: [],
				video: ['https://www.w3schools.com/html/mov_bbb.mp4']
			},
			poster: {
				name: 'Nguyễn Minh Quân',
				avatar: 'https://www.w3schools.com/howto/img_avatar.png'
			},
			createdAt: '54 phút'
		},
		{
			content: {
				text: 'Day la comment 3',
				image: [],
				video: []
			},
			poster: {
				name: 'Nguyễn Minh Quân',
				avatar: 'https://www.w3schools.com/howto/img_avatar.png'
			},
			createdAt: '54 phút'
		}
	])
	const [commenter, setCommenter]=useState({
		name:'Nguyễn Minh Quân',
		avatar:'https://www.w3schools.com/howto/img_avatar.png'
	})

	const textareaRef = useRef(null)
	const handleInput = () => {
		const textarea = textareaRef.current
		textarea.style.height = 'auto'
		textarea.style.height = `${textarea.scrollHeight}px`
	}

	useEffect(() => {
		setPost(news)
	}, [news])

	return (
		<div className='fixed top-14 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-70
         z-50 flex justify-center items-center'>
			<div className='absolute top-0 right-0 mt-2 mr-3 p-1 rounded-full hover:bg-slate-100 hover:text-black cursor-pointer
            bg-slate-300 text-slate-600' onClick={handleOpenComment}>
				<IoCloseOutline size={40}/>
			</div>
			<div className='relative w-[50%] h-[600px] bg-slate-200 rounded-md'>
				<div className='w-full h-[580px] bg-slate-200 px-4 py-2 rounded-t-md space-y-2 overflow-auto'>
					<div className='flex items-center gap-4'>
						<div className='w-[40px] h-[40px]'>
							<img
								src={post?.poster?.profile_pic}
								className='rounded-full w-full h-full object-cover cursor-pointer'
							/>
						</div>
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
													src={item}
													key={index}
													controls
													className='w-full h-full object-cover'
												/>
											):(
												<img
													src={item}
													key={index}
													className='w-full h-full object-cover'
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
													src={item}
													key={index}
													controls
													className='w-full h-full object-cover'
												/>
											):(
												<img
													src={item}
													key={index}
													className='w-full h-full object-cover'
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
														src={item}
														key={index}
														controls
														className='w-full h-full object-cover'
													/>
												):(
													<img
														src={item}
														key={index}
														className='w-full h-full object-cover'
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
															src={item}
															key={index}
															controls
															className='w-full h-full object-cover'
														/>
													):(
														<img
															src={item}
															key={index}
															className='w-full h-full object-cover'
														/>
													)
												)
											))
										}
									</div>
								</>
							)}
							{numMedia>5 && (
								<p className='font-semibold mt-2 underline'>
                           Còn {numMedia-5} ảnh ...
								</p>
							)}
						</div>
					</div>
					<div className='flex justify-between px-2'>
						<div className='flex items-center gap-1'>
							<AiFillLike className='text-blue-600'/>
							<p>{post?.like}</p>
						</div>
						<div className='flex items-center gap-1'>
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
							onClick={() => textareaRef?.current?.focus()}>
							<FaRegComment size={23}/>
							<p className='font-semibold'>Comment</p>
						</div>
					</div>
					<div>
						<hr className='border-gray-300'/>
					</div>
					<div className='space-y-3'>
						<p>Tất cả bình luận</p>
						{
							comments.length>0 && comments.map((comment, index) => (
								<div className='space-y-1'>
									<div key={index} className='flex gap-3'>
										<div className=''>
											<img
												src={comment?.poster?.avatar}
												width={40}
												height={40}
												className='rounded-full'
											/>
										</div>
										<div className='space-y-1 w-auto max-w-md'>
											<div className='bg-slate-300 py-1 px-2 rounded-md'>
												<p className='font-semibold'>{comment?.poster?.name}</p>
												<p className='text-mini-1 text-justify leading-4 py-1'>{comment?.content?.text}</p>
											</div>
											<div>
												{comment?.content?.image.length>0 && (
													<img
														src={comment?.content?.image[0]}
														className='w-[250px] h-auto object-cover rounded-md'
													/>
												)}
												{
													comment?.content?.video.length>0 && (
														<video
															src={comment?.content?.video[0]}
															controls
															className='w-[250px] h-auto object-cover rounded-md'
														/>
													)
												}
											</div>
											<div className='flex gap-3 px-3'>
												<p className='text-mini'>{comment?.createdAt}</p>
												<p className='text-mini hover:font-bold cursor-pointer'>Thích</p>
											</div>
										</div>
									</div>
									
								</div>
							))
						}
					</div>
				</div>
				<div className='bg-slate-300 absolute px-1 py-2 w-full h-auto bottom-0 flex items-end gap-1 rounded-b-md'>
					<div className=''>
						<button className='px-1 py-[6px] rounded hover:bg-blue-300'>
							<FaImage size={20}/>
						</button>
						<button className='px-1 py-[6px] rounded hover:bg-blue-300'>
							<FaVideo size={20}/>
						</button>
					</div>
					<textarea type='text'
						ref={textareaRef}
						className='flex-grow w-56 h-[34px] max-h-[200px] rounded-lg py-1 px-2 resize-none overflow-hidden'
						placeholder='Aa'
						onInput={handleInput}
					/>
					<button className='px-1 py-1 rounded-lg hover:bg-blue-300'>
						<IoMdSend size={25}/>
					</button>
				</div>
			</div>
		</div>
	)
}

export default Comment