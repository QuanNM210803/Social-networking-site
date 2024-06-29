/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { getUserById } from '../../../apis/UserApi'

const DetailsLike = ({ handleOpenDetailsLike, likes }) => {
	const [liker, setLiker]=useState([])
	useEffect(() => {
		if (likes.length>0) {
			const fetchPromises=likes.map((likerId) => getUserById(likerId))
			Promise.all(fetchPromises)
				.then((data) => {
					const fetchedLikers=data.map((item) => item?.data)
					setLiker(fetchedLikers)
				})
				.catch((error) => {
					console.error('Error fetching data:', error)
				})
		}
	}, [likes])
	return (
		<div className='fixed top-14 left-0 right-0 bottom-0 bg-gray-700 bg-opacity-70
       z-50 flex justify-center items-center'>
			<div className='xl:w-[35%] lg:w-[40%] md:w-[45%] sm:w-[60%] w-auto h-auto rounded bg-slate-200'>
				<div className='flex items-center justify-center relative py-2'>
					<p className='font-bold text-lg'>Ai đã like bài viết này ?</p>
					<IoCloseOutline size={30} className='absolute right-2 cursor-pointer hover:bg-slate-300 rounded-full'
						onClick={() => handleOpenDetailsLike()}/>
				</div>
				<div className='flex justify-center items-center w-full py-1 px-5'>
					<hr className='border-[1px] border-slate-300 w-full'/>
				</div>
				<div className='w-full h-auto max-h-[450px] overflow-auto py-1 px-2'>
					{
						liker?.length>0 && liker.map((item, index) => (
							<Link to={`/profileUser/${item?._id}`} key={index} className='flex items-center gap-2 py-2 px-5 hover:bg-slate-100 rounded-md cursor-pointer'>
								<img
									src={item?.profile_pic}
									alt='profile'
									className='rounded-full object-cover w-12 h-12'
								/>
								<p className='text-nomal font-semibold'>{item?.name}</p>
							</Link>
						))
					}
					{
						liker?.length===0 && (
							<div className='w-full h-20 flex justify-center items-center'>
								<p>Chưa có ai like bài viết này!</p>
							</div>
						)
					}
				</div>
			</div>
		</div>
	)
}

export default DetailsLike