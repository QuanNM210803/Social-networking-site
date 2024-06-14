/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { IoIosVideocam } from 'react-icons/io'
import { FaImages } from 'react-icons/fa'
import { MdEmojiEmotions } from 'react-icons/md'
import NewsCard from './NewsCard'

const Content = () => {
	const [news, setNews]=useState([
		{
			content:{
				text: 'Day la ban tin moi nhat cua toi',
				image:[],
				video:[
					'https://www.w3schools.com/html/mov_bbb.mp4'
				]
			},
			like: 10,
			comment: 10,
			poster:{
				name:'Nguyễn Minh Quân',
				avatar:'https://www.w3schools.com/howto/img_avatar.png'
			},
			createdAt: '54 phút'
		},
		{
			content:{
				text: 'Hom nay la mot ngay dep troi',
				image:[
					'https://www.w3schools.com/howto/img_avatar.png'
				],
				video:[
					'https://www.w3schools.com/html/mov_bbb.mp4'
				]
			},
			like: 10,
			comment: 10,
			poster:{
				name:'Nguyễn Minh Quân',
				avatar:'https://www.w3schools.com/howto/img_avatar.png'
			},
			createdAt: '54 phút'
		},
		{
			content:{
				text: '',
				image:[
					'https://www.w3schools.com/howto/img_avatar.png'
					
				],
				video:[
					'https://www.w3schools.com/html/mov_bbb.mp4',
					'https://www.w3schools.com/html/movie.mp4'
					
				]
			},
			like: 10,
			comment: 10,
			poster:{
				name:'Nguyễn Minh Quân',
				avatar:'https://www.w3schools.com/howto/img_avatar.png'
			},
			createdAt: '54 phút'
		},
		{
			content:{
				text: 'Toi vua di choi ve',
				image:[
					'https://www.w3schools.com/howto/img_avatar.png',
					'https://www.w3schools.com/howto/img_avatar.png',
					'https://www.w3schools.com/howto/img_avatar.png'
				],
				video:[
					'https://www.w3schools.com/html/mov_bbb.mp4'
					
				]
			},
			like: 10,
			comment: 10,
			poster:{
				name:'Nguyễn Minh Quân',
				avatar:'https://www.w3schools.com/howto/img_avatar.png'
			},
			createdAt: '54 phút'
		},
		{
			content:{
				text: '',
				image:[
					'https://www.w3schools.com/howto/img_avatar.png',
					'https://www.w3schools.com/howto/img_avatar.png',
					'https://www.w3schools.com/howto/img_avatar.png',
					'https://www.w3schools.com/howto/img_avatar.png',
					'https://www.w3schools.com/howto/img_avatar.png'
				],
				video:[
					'https://www.w3schools.com/html/mov_bbb.mp4',
					'https://www.w3schools.com/html/mov_bbb.mp4'
				]
			},
			like: 10,
			comment: 10,
			poster:{
				name:'Nguyễn Minh Quân',
				avatar:'https://www.w3schools.com/howto/img_avatar.png'
			},
			createdAt: '54 phút'
		},
		{
			content:{
				text: '',
				image:[
					'https://www.w3schools.com/howto/img_avatar.png',
					'https://www.w3schools.com/howto/img_avatar.png'
				],
				video:[
					'https://www.w3schools.com/html/mov_bbb.mp4',
					'https://www.w3schools.com/html/mov_bbb.mp4',
					'https://www.w3schools.com/html/mov_bbb.mp4'
				]
			},
			like: 10,
			comment: 10,
			poster:{
				name:'Nguyễn Minh Quân',
				avatar:'https://www.w3schools.com/howto/img_avatar.png'
			},
			createdAt: '54 phút'
		},
		{
			content:{
				text: '',
				image:[
					'https://www.w3schools.com/howto/img_avatar.png',
					'https://www.w3schools.com/howto/img_avatar.png',
					'https://www.w3schools.com/howto/img_avatar.png'
				],
				video:[
					'https://www.w3schools.com/html/mov_bbb.mp4',
					'https://www.w3schools.com/html/mov_bbb.mp4',
					'https://www.w3schools.com/html/mov_bbb.mp4',
					'https://www.w3schools.com/html/mov_bbb.mp4',
					'https://www.w3schools.com/html/mov_bbb.mp4',
					'https://www.w3schools.com/html/mov_bbb.mp4'
				]
			},
			like: 10,
			comment: 10,
			poster:{
				name:'Nguyễn Minh Quân',
				avatar:'https://www.w3schools.com/howto/img_avatar.png'
			},
			createdAt: '54 phút'
		},
		{
			content:{
				text: '',
				image:[
					'https://www.w3schools.com/howto/img_avatar.png',
					'https://www.w3schools.com/w3images/avatar2.png',
					'https://www.w3schools.com/howto/img_avatar.png',
					'https://www.w3schools.com/w3images/avatar2.png',
					'https://www.w3schools.com/howto/img_avatar.png',
					'https://www.w3schools.com/w3images/avatar2.png'
				],
				video:[
					'https://www.w3schools.com/html/mov_bbb.mp4'
				]
			},
			like: 10,
			comment: 10,
			poster:{
				name:'Nguyễn Minh Quân',
				avatar:'https://www.w3schools.com/howto/img_avatar.png'
			},
			createdAt: '54 phút'
		},
		{
			content:{
				text: '',
				image:[
					'https://www.w3schools.com/howto/img_avatar.png',
					'https://www.w3schools.com/howto/img_avatar.png',
					'https://www.w3schools.com/howto/img_avatar.png',
					'https://www.w3schools.com/howto/img_avatar.png',
					'https://www.w3schools.com/howto/img_avatar.png',
					'https://www.w3schools.com/howto/img_avatar.png'
				],
				video:[]
			},
			like: 10,
			comment: 10,
			poster:{
				name:'Nguyễn Minh Quân',
				avatar:'https://www.w3schools.com/howto/img_avatar.png'
			},
			createdAt: '54 phút'
		}
	])
	return (
		<div className='w-[850px] space-y-3 px-20'>
			<div className='w-full h-auto bg-slate-200 px-4 py-2 space-y-2 rounded-md'>
				<div className='flex items-center gap-4'>
					<img
						src='https://www.w3schools.com/howto/img_avatar.png'
						alt='profile'
						className='rounded-full w-12 h-12'
					/>
					<input
						type='text'
						placeholder='Bạn đang nghĩ gì thế ?'
						className='w-full h-10 px-3 rounded-xl'
					/>
				</div>
				<div>
					<hr className='border-gray-300'/>
				</div>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-2 h-10 px-5 hover:bg-gray-300 cursor-pointer rounded-lg'>
						<IoIosVideocam size={25} className='text-red-600'/>
						<p>Video trực tiếp</p>
					</div>
					<div className='flex items-center gap-2 h-10 px-5 hover:bg-gray-300 cursor-pointer rounded-lg'>
						<FaImages size={25} className='text-green-600'/>
						<p>Ảnh/Video</p>
					</div>
					<div className='flex items-center gap-2 h-10 px-5 hover:bg-gray-300 cursor-pointer rounded-lg'>
						<MdEmojiEmotions size={25} className='text-yellow-600'/>
						<p>Cảm xúc/hoạt động</p>
					</div>
				</div>
			</div>
			<div className='w-full h-auto space-y-3'>
				{news.length>0 ? (
					news.map((item, index) => (
						<NewsCard news={item}/>
					))
				):(
					<div className='w-full h-20 bg-slate-200 rounded-md flex justify-center items-center'>
						<p className='text-slate-500'>Không có bài đăng nào xuất hiện trên bản tin của bạn!</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default Content