/* eslint-disable no-unused-vars */
import React from 'react'
import Navbar from '../../components/news_feed/navbar/Navbar.js'
import Sidebar from '../../components/news_feed/sidebar/Sidebar'
import Rightbar from '../../components/news_feed/rightbar/Rightbar.js'
import Content from '../../components/news_feed/news/Content.js'

const HomePage = () => {
	return (
		<div>
			<div className='sticky top-0 bg-slate-500'>
				<Navbar/>
			</div>
			<div className='bg-slate-300 flex top-14 left-0 right-0 bottom-0'>
				<div className='h-[calc(100vh-56px)] w-[27%] overflow-auto scrollbar-newsfeed'>
					<Sidebar/>
				</div>
				<div className='h-[calc(100vh-56px)] w-[63%] overflow-auto scrollbar-newsfeed'>
					<Content/>
				</div>
				<div className='h-[calc(100vh-56px)] w-[22%] overflow-auto scrollbar-newsfeed'>
					<Rightbar/>
				</div>
			</div>
		</div>
	)
}

export default HomePage