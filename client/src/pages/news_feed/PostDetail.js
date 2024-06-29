/* eslint-disable no-console */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/news_feed/navbar/Navbar.js'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { initializeSocketConnection } from '../../socket/SocketUtils'
import { getPostByPostId, likePost } from '../../apis/PostApi'
import NewsCard from '../../components/news_feed/news/NewsCard.js'

const PostDetail = () => {
	const user=useSelector(state => state?.user)
	const { postId }=useParams()
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

	const [news, setNews]=useState([])
	useEffect(() => {
		getPostByPostId(postId).then((data) => {
			setNews(data?.data)
		})
	}, [postId])

	const handleLikePost=async (postId) => {
		try {
			const response=await likePost(postId)
			if (response?.liked===true) {
				socketConnection.emit('like', { senderId:user?._id, postId })
				setNews(prevNews => (
					prevNews.map(post => 
						post._id===postId ? { ...post, like:[...post?.like, user?._id] } : post
					)
				))
			} else if (response?.liked===false) {
				setNews(prevNews => (
					prevNews.map(post => 
						post._id===postId ? { ...post, like: post?.like.filter(userId => userId!==user?._id) } : post
					)
				))
			}
		} catch (error) {
			console.error(error)
		}
	}
	const handleCommentPost=async (postId) => {
		try {
			socketConnection.emit('comment', { senderId:user?._id, postId })
			setNews(prevNews => (
				prevNews.map(post =>
					post._id===postId ? { ...post, comment:post?.comment+1 } : post
				)
			))
		} catch (error) {
			console.error(error)
		}
	}
	return (
		<div>
			<div className='sticky top-0 bg-slate-500' style={{ zIndex:1000 }}>
				<Navbar user={user} socketConnection={socketConnection}/>
			</div>
			<div className='flex top-14 left-0 right-0 bottom-0 justify-center bg-slate-300 overflow-auto' style={{ zIndex:0 }}>
				<div className='min-h-[calc(100vh-56px)] lg:w-[50%] md:w-[70%] sm:w-[80%] sm:px-0 w-full px-3 py-5'>
					<NewsCard news={news[0]} handleLikePost={handleLikePost} handleCommentPost={handleCommentPost}/>
				</div>
			</div>
		</div>
	)
}

export default PostDetail