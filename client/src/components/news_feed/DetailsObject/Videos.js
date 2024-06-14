/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { FaRegPlayCircle } from 'react-icons/fa'
import DetailsMedia from '../../DetailsMedia'

const Videos = ({ objectId, typeObject }) => {
	const name='Nguyễn Minh Quân'
	const words=name?.split(' ')
	const [currentMedia, setCurrentMedia]=useState(0)
	const [isOpenDetailMedia, setIsOpenDetailMedia]=useState(false)
	const handleOpenDetailMedia = (index) => {
		setIsOpenDetailMedia(true)
		setCurrentMedia(index)
	}
	const handleCloseDetailMedia = () => {
		setIsOpenDetailMedia(false)
	}
	const [videos, setVideos]=useState([
		'https://www.w3schools.com/html/mov_bbb.mp4',
		'https://www.w3schools.com/html/mov_bbb.mp4',
		'https://www.w3schools.com/html/mov_bbb.mp4',
		'https://www.w3schools.com/html/mov_bbb.mp4',
		'https://www.w3schools.com/html/movie.mp4',
		'https://www.w3schools.com/html/movie.mp4',
		'https://www.w3schools.com/html/movie.mp4',
		'https://www.w3schools.com/html/mov_bbb.mp4',
		'https://www.w3schools.com/html/movie.mp4',
		'https://www.w3schools.com/html/mov_bbb.mp4',
		'https://www.w3schools.com/html/movie.mp4',
		'https://www.w3schools.com/html/mov_bbb.mp4',
		'https://www.w3schools.com/html/movie.mp4'
	])
	return (
		<div>
			<div className='bg-slate-200 rounded-md h-auto'>
				<div className='flex justify-between px-3 py-2'>
					<div className='flex items-center gap-7'>
						<p className='text-2xl font-bold px-3'>Video của {typeObject==='user' ? (words[words?.length-1]):(name)}</p>
						<p>{videos.length} video</p>
					</div>
				</div>
				{
					videos.length===0 ? (
						<div className='w-full h-20 flex justify-center items-center'>
							<p className='text-slate-500 text-lg'>Không có video nào.</p>
						</div>
					):(
						<div className='px-6 py-3 w-full h-auto grid grid-cols-5 gap-1'>
							{
								videos?.map((video, index) => (
									<div key={index} className='cursor-pointer relative opacity-80' onClick={() => handleOpenDetailMedia(index)}>
										<video src={video} alt='video' className='w-auto h-[200px] object-cover rounded-md'/>
										<div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
											<FaRegPlayCircle size={50}/>
										</div>
									</div>
								))
							}
						</div>
					)
				}
			</div>
			{
				isOpenDetailMedia && (
					<DetailsMedia handleCloseDetailMedia={handleCloseDetailMedia} currentMedia={currentMedia}
						listMedia={videos} numMedia={videos?.length}
					/>
				)
			}
		</div>
	)
}

export default Videos