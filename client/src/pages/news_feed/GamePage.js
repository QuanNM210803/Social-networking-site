/* eslint-disable no-unused-vars */
import React from 'react'
import Navbar from '../../components/news_feed/navbar/Navbar'

const GamePage = () => {
	return (
		<div>
			<div className='sticky top-0 bg-slate-500'>
				<Navbar/>
			</div>
			<div className='flex top-14 left-0 right-0 bottom-0'>
				<div className='h-[calc(100vh-56px)] w-full bg-slate-300 flex items-center justify-center'>
					<p className='text-slate-500 text-2xl font-semibold'>Chưa có game nào được thêm vào dự án.</p>
				</div>
			</div>
		</div>
	)
}

export default GamePage