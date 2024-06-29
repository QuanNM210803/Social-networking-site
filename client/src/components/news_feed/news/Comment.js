/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa'
import { IoMdSend } from 'react-icons/io'
import { IoCloseOutline } from 'react-icons/io5'
import { FaImage } from 'react-icons/fa'
import { createComment, getCommentsByPostId } from '../../../apis/CommentApi'
import { Link } from 'react-router-dom'
import Loading from '../../Loading'

const Comment = ({ handleOpenComment, news, handleCommentPost }) => {
	const [post, setPost]=useState()
	const listMedia=news?.content?.video.concat(news?.content?.image)
	const numImage = news?.content?.image?.length
	const numVideo = news?.content?.video?.length
	const numMedia = numImage + numVideo
	const [comments, setComments]=useState([])
	useEffect(() => {
		getCommentsByPostId(news?._id).then((data) => {
			setComments(data?.data)
		})
	}, [comments])

	const textareaRef = useRef(null)
	const [contentText, setContentText] = useState('')
	const [contentImage, setContentImage] = useState(null)
	const [contentVideo, setContentVideo] = useState(null)
	const [loading, setLoading] = useState(false)

	const handleImageClick=() => {
		document.getElementById('fileInput').click()
	}

	const handleFileChange=async(event) => {
		const file=event?.target?.files[0]
		file.type.startsWith('image') ? setContentImage(file) : setContentVideo(file)
	}

	const handleRemoveFile=() => {
		setContentImage(null)
		setContentVideo(null)
   
	}

	const handleChange = (event) => {
		setContentText(event.target.value)
		autoResize()
	}

	const autoResize = () => {
		if (textareaRef?.current) {
			textareaRef.current.style.height = 'auto'
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
		}
	}

	const handleSendComment=async() => {
		setLoading(true)
		await createComment(news?._id, contentText, contentImage, contentVideo).then((data) => {
			setComments([data?.data, ...comments])
			setContentText('')
			setContentImage(null)
			setContentVideo(null)
			handleCommentPost(news?._id)
		})
		setLoading(false)
	}
	useEffect(() => {
		setPost(news)
	}, [news])

	return (
		<div className='fixed top-14 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-70
         z-50 flex justify-center items-center'>
			<div className='absolute top-0 right-0 mt-2 mr-3 sm:p-1 rounded-full hover:bg-slate-100 hover:text-black cursor-pointer
            bg-slate-300 text-slate-600' onClick={handleOpenComment}>
				<IoCloseOutline size={40}/>
			</div>
			<div className='relative lg:w-[50%] md:w-[60%] sm:w-[70%] w-[80%] sm:h-[600px] h-[550px] bg-slate-200 rounded-md'>
				<div className='w-full sm:h-[550px] h-[500px] bg-slate-200 px-4 py-2 rounded-t-md space-y-2 overflow-auto'>
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
							<p>{post?.like?.length}</p>
						</div>
						<div className='flex items-center gap-1'>
							<p>{comments && comments?.length} Comment</p>
						</div>
					</div>
					{/* <div>
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
					</div> */}
					<div>
						<hr className='border-gray-300'/>
					</div>
					<div className='space-y-3'>
						<p>Tất cả bình luận</p>
						{
							comments && comments.map((comment, index) => (
								<div className='space-y-1'>
									<div key={index} className='flex gap-3'>
										<Link to={`/profileUser/${comment?.commenter?._id}`} className='flex-shrink-0'>
											<img
												src={comment?.commenter?.profile_pic}
												className='rounded-full object-cover cursor-pointer w-[40px] h-[40px]'
											/>
										</Link>
										<div className='space-y-1 w-auto max-w-md'>
											<div className='bg-slate-300 py-1 px-2 rounded-md'>
												<p className='font-semibold'>{comment?.commenter?.name}</p>
												<p className='text-mini-1 text-justify leading-4 py-1'>{comment?.content?.text}</p>
											</div>
											<div className=''>
												{comment?.content?.image && (
													<img
														src={comment?.content?.image}
														className='w-[250px] h-auto object-cover rounded-md'
													/>
												)}
												{
													comment?.content?.video && (
														<video
															src={comment?.content?.video}
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
				{!loading ? (<div className='bg-slate-300 absolute px-1 py-2 w-full h-auto bottom-0 rounded-b-md space-y-1'>
					{(contentImage || contentVideo) && 
                  <div className='flex items-center gap-2 px-2'>
                  	<p>{contentImage?.name || contentVideo?.name}</p>
                  	<IoCloseOutline size={20} className='hover:bg-slate-200 cursor-pointer rounded-full'
                  		onClick={() => handleRemoveFile()}/>
                  </div>}
					<div className='flex gap-2 items-end'>
						<div className='flex items-center'>
							<button className='px-1 py-1 rounded' onClick={handleImageClick}>
								<FaImage size={25} className='text-green-700'/>
							</button>
							<input
								type='file'
								id='fileInput'
								className='hidden'
								multiple
								accept='image/*,video/*'
								onChange={handleFileChange}
							/>
						</div>
						<textarea type='text'
							ref={textareaRef}
							className='flex-grow w-56 h-[34px] max-h-[150px] rounded-lg py-1 px-2 resize-none'
							placeholder='Aa'
							onChange={handleChange}
							value={contentText}
							rows={1}
						/>
						<button className='px-1 py-1 rounded-lg' onClick={() => handleSendComment()}>
							<IoMdSend size={25} className='hover:text-blue-600'/>
						</button>
					</div>
				</div>):(
					<div className='bg-slate-300 absolute px-1 py-2 w-full h-auto bottom-0 rounded-b-md space-y-1'>
						<div className='flex justify-center items-center'>
							<Loading/>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Comment