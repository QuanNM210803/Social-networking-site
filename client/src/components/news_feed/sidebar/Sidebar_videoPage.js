/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { BiSolidVideos } from 'react-icons/bi'
import { MdOutlineStorage } from 'react-icons/md'

const Sidebar_videoPage = ({ option, setOption }) => {
	return (
		<div className='h-auto'>
			<div className='px-3 py-2 bg-slate-300'>
				<p className='font-bold text-2xl text-slate-800'>Video</p>
			</div>
			<div className='p-2'>
				<div className={option===1 ? ('p-2 flex items-center rounded-md cursor-pointer bg-slate-200' 
				   ):('p-2 flex items-center rounded-md cursor-pointer')} onClick={() => {setOption(1)}}>
					<div className='flex items-center gap-4'>
						<BiSolidVideos size={30}/>
						<p className='font-semibold text-nomal'>Trang chủ</p>
					</div>
				</div>
				<div className={option===2 ? ('p-2 flex items-center rounded-md cursor-pointer bg-slate-200' 
				   ):('p-2 flex items-center rounded-md cursor-pointer')} onClick={() => {setOption(2)}}>
					<div className='flex items-center gap-4'>
						<MdOutlineStorage size={30}/>
						<p className='font-semibold text-nomal'>Video đã lưu</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Sidebar_videoPage