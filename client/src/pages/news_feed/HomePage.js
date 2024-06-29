/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/news_feed/navbar/Navbar.js'
import Sidebar from '../../components/news_feed/sidebar/Sidebar'
import Rightbar from '../../components/news_feed/rightbar/Rightbar.js'
import Content from '../../components/news_feed/news/Content.js'
import { getUserDetails } from '../../apis/UserApi.js'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, setUser } from '../../redux/userSlice.js'
import { initializeSocketConnection } from '../../socket/SocketUtils.js'
import { getPostsPagination, likePost } from '../../apis/PostApi.js'

const HomePage = () => {
	const user=useSelector(state => state?.user)
	const dispatch=useDispatch()
	const navigate=useNavigate()
	const [socketConnection, setSocketConnection]=useState(null)
	useEffect(() => {
		getUserDetails().then((data) => {
			if (!data?.data) {
				dispatch(logout())
				navigate('/email')
			} else {
				dispatch(setUser(data?.data))
			}
		})
	}, [])
	useEffect(() => {
		const socketConnection=initializeSocketConnection(dispatch)
		setSocketConnection(socketConnection)
		return () => {
			socketConnection.disconnect()
		}
	}, [dispatch])

	const limit=5
	const [loading, setLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [maxPulled, setMaxPulled] = useState(0)
	const [news, setNews]=useState([])

	useEffect(() => {
		let mounted = true // Biến để đánh dấu component đã mount
		const fetchData = async () => {
			setLoading(true)
			try {
				const data = await getPostsPagination(currentPage, limit)
				if (mounted) {
					setNews(prevNews => [...prevNews, ...data?.data])
					setTotalPages(data.totalPages)
				}
			} catch (error) {
				console.error('Error fetching data:', error)
			}
			setLoading(false)
		}
		if (mounted) {
			fetchData()
		}
		return () => {
			mounted = false
		}
	}, [currentPage])
	
	const handleScroll=(event) => {
		const scrollTop=event.target.scrollTop
		const clientHeight=event.target.clientHeight
		const scrollHeight=event.target.scrollHeight
		setMaxPulled(Math.max(scrollTop, maxPulled))
		if (!loading && (maxPulled + clientHeight >= scrollHeight - 1000)) {
			if (currentPage < totalPages) {
				setCurrentPage(prevPages => prevPages + 1)
			}
		}
	}
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
			<div className='bg-slate-300 flex top-14 left-0 right-0 bottom-0'>
				<div className='h-[calc(100vh-56px)] w-[20%] overflow-auto scrollbar-newsfeed xl:block hidden'>
					<Sidebar user={user}/>
				</div>
				<div className='h-[calc(100vh-56px)] xl:w-[60%] lg:w-[75%] w-full overflow-auto scrollbar-newsfeed' onScroll={handleScroll}>
					<Content news={news} loading={loading} handleLikePost={handleLikePost} handleCommentPost={handleCommentPost}/>
				</div>
				<div className='h-[calc(100vh-56px)] xl:w-[20%] lg:w-[25%] overflow-auto scrollbar-newsfeed lg:block hidden'>
					<Rightbar user={user} socketConnection={socketConnection}/>
				</div>
			</div>
		</div>
	)
}

export default HomePage