/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import { FaAngleLeft } from 'react-icons/fa6'
import { FaAngleRight } from 'react-icons/fa6'

const DetailsMedia = ({ handleCloseDetailMedia, currentMedia, listMedia, numMedia }) => {
	const [current, setCurrent]=useState(currentMedia)
	const videoRef=useRef(null)
	const handleNextMedia=() => {
		if (videoRef.current) {
			videoRef.current.pause()
		}
		setCurrent((current+1)%numMedia)
	}
	const handlePrevMedia=() => {
		if (videoRef.current) {
			videoRef.current.pause()
		}
		setCurrent((current-1+numMedia)%numMedia)
	}
	return (
		<>
			<div className='fixed top-14 bottom-0 left-0 right-0 z-50 bg-gray-700 bg-opacity-70
                  flex justify-center items-center'>
				{
					listMedia[current]?.endsWith('.mp4') ? (
						<video
							src={listMedia[current]}
							ref={videoRef}
							className='w-auto h-full cursor-pointer rounded-md'
							controls
							autoPlay
						/>
					):(
						<TransformWrapper>
							<TransformComponent>
								<img
									src={listMedia[current]}
									alt='Media'
									className='w-auto md:h-[600px] h-[500px] rounded-md'
								/>
							</TransformComponent>
						</TransformWrapper>
					)
				}
				{
					listMedia?.length>1 && (
						<>
							<div className='absolute top-auto left-5 text-3xl hover:bg-slate-200 hover:text-black text-slate-200
                     w-12 h-12 flex items-center justify-center rounded-full cursor-pointer' onClick={handlePrevMedia}>
								<button>
									<FaAngleLeft size={40}/>
								</button>
							</div>
							<div className='absolute top-auto right-5 text-3xl hover:bg-slate-200 hover:text-black text-slate-200
                     w-12 h-12 flex items-center justify-center rounded-full cursor-pointer' onClick={handleNextMedia}>
								<button>
									<FaAngleRight size={40}/>
								</button>
							</div>
						</>
					)
				}
				<div className='absolute top-0 right-0 mt-2 mr-3 text-3xl hover:bg-slate-50 
                     w-12 h-12 bg-slate-300 flex items-center justify-center rounded-full cursor-pointer' onClick={() => handleCloseDetailMedia()}>
					<button>
						<IoMdClose/>
					</button>
				</div>
			</div>
		</>
	)
}

export default DetailsMedia