/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Avatar from '../../Avatar'
import { HiDotsVertical } from 'react-icons/hi'
import { FaAngleLeft } from 'react-icons/fa6'
import { FaPlus } from 'react-icons/fa'
import { FaImage } from 'react-icons/fa6'
import { FaVideo } from 'react-icons/fa6'
import uploadFile from '../../../helpers/UploadFile'
import { IoClose } from 'react-icons/io5'
import Loading from '../../Loading'
import backgroundImage from '../../../assets/wallapaper.jpeg'
import { IoMdSend } from 'react-icons/io'
import moment from 'moment'
import { FcVideoCall } from 'react-icons/fc'
import { IoCall } from 'react-icons/io5'
import Rightbar from '../rightbar/Rightbar'

const MessagePage = () => {
	const params= useParams()
	const socketConnection=useSelector(state => state?.user?.socketConnection)
	const user=useSelector(state => state?.user)
	const [dataUser, setDataUser]=useState({
		_id:'',
		name:'',
		email:'',
		profile_pic:'',
		online:false
	})

	const [openImageVideoUpload, setOpenImageVideoUpload]=useState(false)
	const [message, setMessage]=useState({
		text:'',
		imageUrl:'',
		videoUrl:''
	})

	const [loading, setLoading]=useState(false)
	const [allMessages, setAllMessages]=useState([])
	const currentMessage= useRef()
	const [openDetailsConversation, setOpenDetailsConversation]=useState(true)

	useEffect(() => {
		if (currentMessage) {
			currentMessage.current?.scrollIntoView({ behavior:'smooth', block:'end' })
		}
	}, [allMessages])

	useEffect(() => {
		if (socketConnection) {
			socketConnection.emit('message-page', params?.userId)

			socketConnection.emit('seen', params?.userId)

			socketConnection.on('message-user', (data) => {
				console.log('message-user', data)
				setDataUser(data)
			})

			socketConnection.on('message', (data) => {
				setAllMessages(data)
			})

		}
	}, [socketConnection, params?.userId, user])


	const handleUploadImageVideoOpen =() => {
		setOpenImageVideoUpload(!openImageVideoUpload)
	}

	const handleUploadImage= async (e) => {
		const file=e.target.files[0]

		setLoading(true)
		const uploadImage=await uploadFile(file)
		setLoading(false)
		handleUploadImageVideoOpen()
		setMessage((preve) => {
			return {
				...preve,
				imageUrl: uploadImage.url
			}
		})
	}

	const handleClearUploadImage=() => {
		setMessage((preve) => {
			return {
				...preve,
				imageUrl:''
			}
		})
	}
	const handleUploadVideo= async (e) => {
		const file=e.target.files[0]
		setLoading(true)
		const uploadVideo=await uploadFile(file)
		setLoading(false)
		handleUploadImageVideoOpen()
		setMessage((preve) => {
			return {
				...preve,
				videoUrl: uploadVideo.url
			}
		})
	}
	const handleClearUploadVideo=() => {
		setMessage((preve) => {
			return {
				...preve,
				videoUrl:''
			}
		})
	}

	const handleOnChange=(e) => {
		const { name, value }=e.target

		setMessage((preve) => {
			return {
				...preve,
				text: value
			}
		})
	}

	const handleSendMessage=(e) => {
		e.preventDefault()
		if (message.text || message.imageUrl || message.videoUrl) {
			if (socketConnection) {
				socketConnection.emit('new-message', {
					sender: user?._id,
					receiver: params?.userId,
					text: message.text,
					imageUrl: message.imageUrl,
					videoUrl: message.videoUrl,
					msgByUserId: user?._id
				})
				setMessage({
					text:'',
					imageUrl:'',
					videoUrl:''
				})
			}
		}
	}

	const handleOpenDetailsConversation=() => {
		setOpenDetailsConversation(!openDetailsConversation)
	}

	return (
		<div>
			<div style={{ backgroundImage: `url(${backgroundImage})` }} className={`
            bg-no-repeat bg-cover z-0 ${openDetailsConversation ? 'mr-80':''}`}>
            
				<header className='sticky top-0 h-16 bg-white flex justify-between items-center px-4'>
					<div className='flex items-center gap-4'>
						<Link to={'/'} className='lg:hidden'>
							<FaAngleLeft size={20}/>
						</Link>
						<div>
							<Avatar
								width={50}
								height={50}
								imageUrl={dataUser?.profile_pic}
								name={dataUser?.name}
								userId={dataUser?._id}
							/>
						</div>
						<div>
							<h3 className='font-semibold text-lg my-0 text-ellipsis line-clamp-1'>
								{dataUser?.name}
							</h3>
							<p className='-my-1 text-sm'>
								{
									dataUser?.online ? (
										<span className='text-primary'>Online</span>
									):(
										<span className='text-slate-400'>Offline</span>
									)
								}
							</p>
						</div>
					</div>
					<div className='flex items-center gap-4'>
						<div className='sm:block hidden' title='Call'>
							<button className=''>
								<IoCall size={20}/>
							</button>
						</div>
						<div className='sm:block hidden' title='Video call'>
							<button className=''>
								<FcVideoCall size={25} className='text-black'/>
							</button>
						</div>
						<div className='' onClick={handleOpenDetailsConversation} title='Information Conversation'>
							<button className=''>
								<HiDotsVertical size={20}/>
							</button>
						</div>
					</div>
				</header>

				{/** show all message */}
				<section className='relative bg-slate-200 bg-opacity-50 h-[calc(100vh-128px)] 
               overflow-x-hidden overflow-y-scroll scrollbar'>
               
					{/** all message show here */}
					<div className='flex flex-col gap-2 py-2 mx-2' ref={currentMessage}>
						{
							allMessages.map((msg, index) => {
								return (
									<div className={`bg-white p-1 py-1 rounded w-fit max-w-[280px] md:max-w-sm lg:max-w-md 
                              ${user._id===msg?.msgByUserId ? 'ml-auto bg-teal-100':'bg-white'}`}>
										<div className='w-full'>
											{
												msg?.imageUrl && (
													<img
														src={msg?.imageUrl}
														className='w-full h-full object-scale-down'
													/>
												)
											}
											{
												msg?.videoUrl && (
													<video
														src={msg?.videoUrl}
														className='w-full h-full object-scale-down'
														controls
														autoPlay
													/>
												)
											}
										</div>
										<p className='px-2'>
											{msg?.text}
										</p>
										<p className='text-xs ml-auto w-fit'>
											{ moment(msg.createdAt).format('HH:mm')}
										</p>
									</div>
								)
							})
						}
					</div>

					{/** upload image display */}
					{
						message.imageUrl && (
							<div className='sticky bottom-0 w-full h-full bg-slate-700 bg-opacity-30 flex justify-center items-center
                     rounded overflow-hidden'>
								<div onClick={handleClearUploadImage} className='w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600'>
									<IoClose size={25}/>
								</div>
								<div className='bg-white p-3'>
									<img 
										src={message.imageUrl}
										alt='uploadImage'
										className='aspect-square w-full h-full max-w-sm m-2 object-scale-down'
									/>
								</div>
							</div>
						)
					}
					{/** upload video display */}
					{
						message.videoUrl && (
							<div className='sticky bottom-0 w-full h-full bg-slate-700 bg-opacity-30 flex justify-center items-center
                        rounded overflow-hidden'>
								<div onClick={handleClearUploadVideo} className='w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600'>
									<IoClose size={25}/>
								</div>
								<div className='bg-white p-3'>
									<video
										src={message.videoUrl}
										alt='uploadVideo'
										className='aspect-square w-full h-full max-w-sm m-2 object-scale-down'
										controls
										muted
										autoPlay
									/>
								</div>
							</div>
						)
					}

					{
						loading && (
							<div className='sticky bottom-0 w-full h-full flex justify-center items-center'>
								<Loading/>
							</div>
						)
					}
				</section>
                     
				{/** send message */}
				<section className='h-16 bg-white flex items-center px-4'>
					<div className=' relative'>
						<button onClick={handleUploadImageVideoOpen} className='flex justify-center items-center w-11 h-11 rounded-full
                  hover:bg-primary hover:text-white'>
							<FaPlus size={20}/>
						</button>

						{/** video and image */}
						{
							openImageVideoUpload && (
								<div className='bg-white shadow rounded absolute bottom-12 w-36 p-2'>
									<form>
										<label htmlFor='uploadImage' className='flex items-center p-2 gap-3
                              hover:bg-slate-300 px-3 cursor-pointer'>
											<div className='text-primary'>
												<FaImage size={18}/>
											</div>
											<p>Image</p>
										</label>
										<label htmlFor='uploadVideo' className='flex items-center p-2 gap-3
                              hover:bg-slate-300 px-3 cursor-pointer'>
											<div className='text-purple-500'>
												<FaVideo size={18}/>
											</div>
											<p>Video</p>
										</label>
										<input
											type='file'
											accept='image/*'
											id='uploadImage'
											onChange={handleUploadImage}
											className='hidden'
										/>
										<input
											type='file'
											accept='video/*'
											id='uploadVideo'
											onChange={handleUploadVideo}
											className='hidden'
										/>
									</form>
								</div>
							)
						}
					</div>
					{/** input box */}
					<form className='h-full w-full flex gap-2' onSubmit={handleSendMessage}>
						<input
							type='text'
							placeholder='Type a message'
							className='w-full h-full py-1 px-4 outline-none'
							value={message.text}
							onChange={handleOnChange}
						/>
						<button className='text-primary hover:text-secondary'>
							<IoMdSend size={28}/>
						</button>
					</form>
				</section>
			</div>
			{
				openDetailsConversation && (
					<div className='w-80 fixed right-0 top-0 z-0 h-full'>
						<Rightbar receiver={dataUser}/>
					</div>
				)
			}
		</div>
	)
}

export default MessagePage