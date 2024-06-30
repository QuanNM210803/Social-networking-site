/* eslint-disable no-unused-vars */
import { useState } from 'react'
import DetailsMedia from '../../DetailsMedia'

/* eslint-disable react/jsx-key */
function MediaTab({ media }) {
	const listMedia=media.map((item) => item.url)
	const [showDatailMedia, setShowDetailMedia]=useState(false)
	const [currentMedia, setCurrentMedia]=useState(null)
	const handleShowDetailMedia=(index) => {
		setCurrentMedia(index)
		setShowDetailMedia(true)
	}
	const handleCloseDetailMedia=() => {
		setShowDetailMedia(false)
	}
	return (
		<>
			<div className="grid grid-flow-row md:grid-cols-3 grid-cols-2 gap-1 z-0">
				{
					media?.length>0 && media.map((item, index) => {
						return (
							<div className="w-full h-24 overflow-hidden cursor-pointer">
								{
									item.url.endsWith('.mp4') ? 
										<video 
											key={index} 
											src={item.url} 
											title='Video'
											className="w-full h-full object-cover"  
											onClick={() => handleShowDetailMedia(index)}
										/> : <img 
											key={index} 
											src={item.url} 
											alt={`Media ${index}`} 
											title='Image'
											className="w-full h-full object-cover"
											onClick={() => handleShowDetailMedia(index)}
										/>
								}
							</div>
						)
					})
				}
			</div>
			{
				media.length===0 && (
					<div className='flex items-center justify-center h-screen'>
						<p className='text-lg text-center font-semibold text-gray-500'>Không có file phương tiện nào</p>
					</div>
				)
			}
			{
				showDatailMedia && (
					<DetailsMedia handleCloseDetailMedia={handleCloseDetailMedia}
						currentMedia={currentMedia}
						listMedia={listMedia}
						numMedia={listMedia?.length}
					/>
				)
			}
		</>
	)
}
export default MediaTab