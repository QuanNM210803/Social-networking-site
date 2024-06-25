/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/news_feed/navbar/Navbar'
import Sidebar_videoPage from '../../components/news_feed/sidebar/Sidebar_videoPage'
import ContentVideoPage from '../../components/news_feed/DetailsObject/videoPage/ContentVideoPage'
import { useDispatch, useSelector } from 'react-redux'
import { initializeSocketConnection } from '../../socket/SocketUtils'
import { useNavigate } from 'react-router-dom'

const VideoPage = () => {
	const user=useSelector(state => state?.user)
	const [option, setOption]=useState(1)
	const [listVideo, setListVideo]=useState([
		{
			content:{
				text: 'Day la ban tin moi nhat cua toi',
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
		}
	])
	const [storageVideo, setStorageVideo]=useState([
		{
			content:{
				text: 'Hom nay la mot ngay dep troi',
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
		}
	])
	// const [listVideo, setListVideo]=useState([])
	useEffect(() => {
		if (option===1) {
			console.log('Option 1')
		}
		if (option===2) {
			console.log('Option 2')
		}
	}, [option])
	const navigate=useNavigate()
	const [socketConnection, setSocketConnection]=useState(null)
	const dispatch=useDispatch()
	useEffect(() => {
		if (!user?._id) {
			navigate('/email')
		}
		const socketConnection=initializeSocketConnection(dispatch)
		setSocketConnection(socketConnection)
		return () => {
			socketConnection.disconnect()
		}
	}, [dispatch])
	return (
		<div>
			<div className='sticky top-0 bg-slate-500' style={{ zIndex:1000 }}>
				<Navbar user={user}/>
			</div>
			<div className='flex top-14 left-0 right-0 bottom-0'>
				<div className='h-[calc(100vh-56px)] w-[20%] bg-slate-100'>
					<Sidebar_videoPage option={option} setOption={setOption}/>
				</div>
				{option===1 &&(
					<div className='h-[calc(100vh-56px)] w-[80%] py-3 overflow-auto bg-slate-300'>
						<ContentVideoPage news={listVideo}/>
					</div>
				)}
				{option===2 &&(
					<div className='h-[calc(100vh-56px)] w-[80%] py-3 overflow-auto bg-slate-300'>
						<ContentVideoPage news={storageVideo}/>
					</div>
				)}
			</div>
			
		</div>
	)
}

export default VideoPage