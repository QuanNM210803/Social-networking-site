import { useState } from 'react'
import { IoMdClose } from 'react-icons/io'

/* eslint-disable react/jsx-key */
function MediaTab({ media }) {
	const [showDatailMedia, setShowDetailMedia]=useState(false)
	const [url, setUrl]=useState('')
	const handleShowDetailMedia=(url) => () => {
		setUrl(url)
		setShowDetailMedia(!showDatailMedia)
	}
	return (
		<>
			<div className="grid grid-flow-row grid-cols-3 gap-1 z-0">
				{
					media.length>0 && media.map((item, index) => {
						return (
							<div className="w-full h-24 overflow-hidden cursor-pointer">
								{
									item.url.endsWith('.mp4') ? 
										<video 
											key={index} 
											src={item.url} 
											controls 
											className="w-full h-full object-cover"  
											onClick={handleShowDetailMedia(item.url)}
										/> : <img 
											key={index} 
											src={item.url} 
											alt={`Media ${index}`} 
											className="w-full h-full object-cover"
											onClick={handleShowDetailMedia(item.url)}
										/>
								}
							</div>
						)
					})
				}
				{
					media.length===0 && (
						<div className='flex items-center justify-center h-screen'>
							<p className='text-lg font-semibold text-gray-500'>Không có file phương tiện nào</p>
						</div>
					)
				}
			</div>
			{
				showDatailMedia && (
					<div className='fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-60
                  flex justify-center items-center'>
						{
							url.endsWith('.mp4') ? (
								<video
									src={url}
									className='w-auto h-full cursor-pointer'
									controls
									autoPlay
								/>
							):(
								<img
									src={url}
									alt='Media'
									className=''
								/>
							)
						}
						<div className='absolute top-0 right-0 mt-2 mr-2 text-3xl hover:text-slate-300 hover:bg-slate-900 
                     w-12 h-12 bg-slate-300 flex items-center justify-center rounded-full cursor-pointer'>
							<button onClick={handleShowDetailMedia('')}>
								<IoMdClose/>
							</button>
						</div>
					</div>
				)
			}
		</>
	)
}
export default MediaTab