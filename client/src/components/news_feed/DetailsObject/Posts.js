/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import NewsCard from '../news/NewsCard'

const Posts = ({ userId }) => {
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
	// const [news, setNews]=useState([])
	return (
		<div className='flex justify-center'>
			<div className='w-[80%] h-auto space-y-3'>
				{news.length>0 ? (
					news.map((item, index) => (
						<NewsCard news={item}/>
					))
				):(
					<div className='w-full h-20 bg-slate-200 rounded-md flex justify-center items-center'>
						<p className='text-slate-500'>Người này chưa có bài đăng nào!</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default Posts