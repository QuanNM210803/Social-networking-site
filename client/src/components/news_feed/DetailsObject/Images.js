/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import DetailsMedia from '../../DetailsMedia'

const Images = ({ objectId, typeObject }) => {
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
	const [images, setImages]=useState([
		'https://www.w3schools.com/howto/img_avatar.png',
		'https://www.w3schools.com/howto/img_avatar2.png',
		'https://www.w3schools.com/howto/img_avatar.png',
		'https://www.w3schools.com/howto/img_avatar2.png',
		'https://www.w3schools.com/howto/img_avatar.png',
		'https://www.w3schools.com/howto/img_avatar2.png',
		'https://www.w3schools.com/howto/img_avatar.png',
		'https://www.w3schools.com/howto/img_avatar2.png',
		'https://www.w3schools.com/howto/img_avatar.png',
		'https://www.w3schools.com/howto/img_avatar2.png',
		'https://www.w3schools.com/howto/img_avatar.png',
		'https://www.w3schools.com/howto/img_avatar2.png',
		'https://www.w3schools.com/howto/img_avatar.png',
		'https://www.w3schools.com/howto/img_avatar2.png',
		'https://www.w3schools.com/howto/img_avatar.png',
		'https://www.w3schools.com/howto/img_avatar2.png',
		'https://www.w3schools.com/howto/img_avatar.png',
		'https://www.w3schools.com/howto/img_avatar2.png',
		'https://www.w3schools.com/howto/img_avatar.png',
		'https://www.w3schools.com/howto/img_avatar2.png',
		'https://www.w3schools.com/howto/img_avatar.png',
		'https://www.w3schools.com/howto/img_avatar2.png',
		'https://www.w3schools.com/howto/img_avatar.png',
		'https://www.w3schools.com/howto/img_avatar2.png'

	])
	// const [images, setImages]=useState([])
	return (
		<div>
			<div className='bg-slate-200 rounded-md h-auto'>
				<div className='flex justify-between px-3 py-2'>
					<div className='flex items-center gap-7'>
						<p className='text-2xl font-bold px-3'>Ảnh của {typeObject==='user' ? (words[words?.length-1]):(name)}</p>
						<p>{images.length} ảnh</p>
					</div>
				</div>
				{
					images.length===0 ? (
						<div className='w-full h-20 flex justify-center items-center'>
							<p className='text-slate-500 text-lg'>Không có ảnh nào.</p>
						</div>
					):(
						<div className='px-6 py-3 w-full h-auto grid grid-cols-5 gap-1'>
							{
								images?.map((image, index) => (
									<div key={index} onClick={() => handleOpenDetailMedia(index)} className='cursor-pointer'>
										<img src={image} alt='Image' className='w-full h-full object-cover rounded-md'/>
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
						listMedia={images} numMedia={images.length}
					/>
				)
			}
		</div>
	)
}

export default Images