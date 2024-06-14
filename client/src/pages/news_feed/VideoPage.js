/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/news_feed/navbar/Navbar'
import Sidebar_videoPage from '../../components/news_feed/sidebar/Sidebar_videoPage'
import ContentVideoPage from '../../components/news_feed/DetailsObject/videoPage/ContentVideoPage'

const VideoPage = () => {
	const [option, setOption]=useState(1)
	const [listVideo, setListVideo]=useState(['listVideo'])
	const [storageVideo, setStorageVideo]=useState(['storageVideo'])
	useEffect(() => {
		if (option===1) {
			console.log('Option 1')
		}
		if (option===2) {
			console.log('Option 2')
		}
	}, [option])
	return (
		<div>
			<div className='sticky top-0 bg-slate-500'>
				<Navbar/>
			</div>
			<div className='flex top-14 left-0 right-0 bottom-0'>
				<div className='h-[calc(100vh-56px)] w-[20%] bg-slate-100'>
					<Sidebar_videoPage option={option} setOption={setOption}/>
				</div>
				{option===1 &&(
					<div className='h-[calc(100vh-56px)] w-[80%] overflow-auto bg-slate-300'>
						<ContentVideoPage news={listVideo}/>
					</div>
				)}
				{option===2 &&(
					<div className='h-[calc(100vh-56px)] w-[80%] overflow-auto bg-slate-300'>
						<ContentVideoPage news={storageVideo}/>
					</div>
				)}
			</div>
			
		</div>
	)
}

export default VideoPage