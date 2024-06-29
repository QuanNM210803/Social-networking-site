/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { BsEmojiSmileFill } from 'react-icons/bs'
import { FaImages } from 'react-icons/fa'
import { createPost } from '../../../../apis/PostApi'
import Loading from '../../../Loading'
const CreatePost = ({ handleCreatePost }) => {
	const user=useSelector((state) => state?.user)
	const textareaRef = useRef(null)

	const [contentText, setContentText] = useState('')
	// const [payloadImages, setPayloadImages] = useState([])
	// const [payloadVideos, setPayloadVideos] = useState([])
	const [contentImage, setContentImage] = useState([])
	const [contentVideo, setContentVideo] = useState([])
	const [loadingFile, setLoadingFile]=useState(false)
	const handleFileChange =async (event) => {
		setLoadingFile(true)
		const newFiles = Array.from(event.target.files)
		const newImages = newFiles.filter(file => file.type.startsWith('image'))
		const newVideos = newFiles.filter(file => file.type.startsWith('video'))
		setContentImage(prevImages => [...prevImages, ...newImages])
		setContentVideo(prevVideos => [...prevVideos, ...newVideos])
		// let copyImages=[...newImages]
		// let copyVideos=[...newVideos]
		// setContentImage(prevImages => [...prevImages, ...newImages.map(file => URL.createObjectURL(file))])
		// setContentVideo(prevVideos => [...prevVideos, ...newVideos.map(file => URL.createObjectURL(file))])

		// if (copyImages?.length) {
		// 	for (let i=0;i<copyImages.length;i++) {
		// 		await uploadFile(copyImages[i]).then((data) => {
		// 			setPayloadImages(prevImages => [...prevImages, data?.url])
		// 		})
		// 	}
		// }
		// if (copyVideos?.length) {
		// 	for (let i=0;i<copyVideos.length;i++) {
		// 		await uploadFile(copyVideos[i]).then((data) => {
		// 			setPayloadVideos(prevVideos => [...prevVideos, data?.url])
		// 		})
		// 	}
		// }
		setLoadingFile(false)
	}

	const handleImageClick = () => {
		document.getElementById('fileInput').click()
	}

	const handleRemoveImage = (index) => {
		setContentImage(prevImages => prevImages.filter((_, i) => i !== index))
		// setPayloadImages(prevImages => prevImages.filter((_, i) => i !== index))
	}
	const handleRemoveVideo = (index) => {
		setContentVideo(prevVideos => prevVideos.filter((_, i) => i !== index))
		// setPayloadVideos(prevVideos => prevVideos.filter((_, i) => i !== index))
	}

	const handleChange = (event) => {
		setContentText(event.target.value)
		autoResize()
	}

	const autoResize = () => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto'
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
		}
	}
	const handlePost=async() => {
		const data={
			text: contentText,
			// image: payloadImages,
			// video: payloadVideos
			image: contentImage,
			video: contentVideo
		}
		setLoadingFile(true)
		const response=await createPost(data)
		setLoadingFile(false)
		if (response?.success) {
			handleCreatePost()
			window.location.reload()
		}
	}
	return (
		<div className='fixed top-14 bottom-0 right-0 left-0 bg-gray-700 bg-opacity-70
         z-50 flex justify-center items-center'>
			<div className='bg-slate-200 lg:w-[40%] md:w-[50%] sm:w-[60%] w-[80%] h-auto max-h-[600px] rounded'>
				<div className='flex items-center justify-center relative py-2'>
					<p className='font-bold text-lg'>Tạo bài viết</p>
					<IoCloseOutline size={30} className='absolute right-2 cursor-pointer hover:bg-slate-300 rounded-full'
						onClick={() => handleCreatePost()}/>
				</div>
				<div className='flex justify-center items-center w-full py-1 px-5'>
					<hr className='border-[1px] border-slate-300 w-full'/>
				</div>
				<div className='flex gap-3 py-2 px-5 items-center'>
					<Link to={`/profileUser/${user?._id}`} className='flex-shrink-0'>
						<img
							src={user?.profile_pic}
							alt='profile'
							className='rounded-full w-10 h-10 object-cover'
						/>
					</Link>
					<Link to={`/profileUser/${user?._id}`} className='text-nomal font-semibold'>{user?.name}</Link>
				</div>
				<div className='overflow-auto w-full max-h-[380px] h-auto'>
					<div className="w-full h-auto px-5 py-1">
						<textarea
							ref={textareaRef}
							className="w-full px-2 py-[6px] border border-gray-300 rounded-lg resize-none overflow-hidden"
							placeholder="Bạn đang nghĩ gì thế?"
							value={contentText}
							onChange={handleChange}
							rows={3}
						/>
					</div>
					<div className='w-full px-5 py-1'>
						{contentImage.length > 0 && (
							<div className='w-full'>
								<h2 className="text-lg font-semibold">Ảnh ({contentImage?.length})</h2>
								<div className="flex justify-center flex-wrap gap-2">
									{contentImage.map((file, index) => (
										<div key={index} className="w-24 h-24 relative">
											<IoCloseOutline size={20} className='absolute top-1 right-1 cursor-pointer bg-slate-200 rounded-full
                                 hover:text-slate-200 hover:bg-slate-700' onClick={() => handleRemoveImage(index)}/>
											<img src={URL.createObjectURL(file)} alt="upload" className="w-full h-full object-cover rounded-md" />
										</div>
									))}
								</div>
							</div>
						)}
						{contentVideo.length > 0 && (
							<div className="mt-4">
								<h2 className="text-lg font-semibold">Video ({contentVideo?.length})</h2>
								<div className="flex justify-center flex-wrap gap-2">
									{contentVideo.map((file, index) => (
										<div key={index} className="w-24 h-24 relative">
											<IoCloseOutline size={20} className='absolute top-1 right-1 cursor-pointer bg-slate-200 rounded-full
                                 hover:text-slate-200 hover:bg-slate-700' onClick={() => handleRemoveVideo(index)} style={{ zIndex:1 }}/>
											<video src={URL.createObjectURL(file)} className="w-full h-full object-cover rounded-md" />
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
				<div className='w-full h-auto px-5 py-2 space-y-2'>
					<div className='bg-slate-300 flex items-center justify-between w-full h-auto rounded-md px-2 py-1'>
						<p className='sm:block hidden'>Thêm vào bài viết của bạn</p>
						<div className='flex items-center gap-2 px-2 py-1'>
							<FaImages size={25} className='text-green-600 cursor-pointer' onClick={handleImageClick} />
							<BsEmojiSmileFill size={25} className='text-yellow-600 cursor-pointer'/>
						</div>
					</div>
					<input
						type="file"
						id="fileInput"
						className="hidden"
						multiple
						accept="image/*,video/*"
						onChange={handleFileChange}
					/>
					<div className='w-full py-1'>
						<button className='w-full bg-blue-600 text-white hover:bg-blue-800 rounded-md px-3 py-1 font-semibold text-lg'
							onClick={() => handlePost()} disabled={loadingFile}>
							{loadingFile ? <Loading/>:'Đăng'}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CreatePost