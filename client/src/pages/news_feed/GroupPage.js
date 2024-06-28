/* eslint-disable no-console */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/news_feed/navbar/Navbar'
import Sidebar_groupPage from '../../components/news_feed/sidebar/Sidebar_groupPage'
import ProfileGroup from '../../components/news_feed/DetailsObject/group/ProfileGroup'
import { useDispatch, useSelector } from 'react-redux'
import { initializeSocketConnection } from '../../socket/SocketUtils'
import { useNavigate } from 'react-router-dom'
import { getPostsPaginationInGroup, likePost } from '../../apis/PostApi'

const GroupPage = () => {
	const user=useSelector(state => state?.user)
	const navigate=useNavigate()
	const [idGroup, setIdGroup]=useState(null)
	const handleClickGroup=(id) => {
		setIdGroup(id)
	}

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

	const limit=5
	const [loading, setLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [maxPulled, setMaxPulled] = useState(0)
	const [news, setNews]=useState([])

	useEffect(() => {
		setNews([])
		setCurrentPage(1)
	}, [idGroup])

	useEffect(() => {
		let mounted = true // Biến để đánh dấu component đã mount
		const fetchData = async () => {
			setLoading(true)
			try {
				if (idGroup!==null) {
					const data = await getPostsPaginationInGroup(idGroup, currentPage, limit)
					if (mounted) {
						setNews(prevNews => [...prevNews, ...data?.data])
						setTotalPages(data.totalPages)
					}
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
	}, [currentPage, idGroup])
	
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
			<div className='flex top-14 left-0 right-0 bottom-0'>
				<div className='h-[calc(100vh-56px)] w-[25%] bg-slate-100'>
					<Sidebar_groupPage handleClickGroup={handleClickGroup}/>
				</div>
				{
					idGroup===null ? (
						<div className='h-[calc(100vh-56px)] w-[75%] flex justify-center items-center overflow-auto bg-slate-300'>
							<h1 className='text-2xl text-slate-400'>Chọn tên của nhóm mà bạn muốn xem trước trang thông tin.</h1>
						</div>
					):(
						<div className='h-[calc(100vh-56px)] w-[75%] overflow-auto bg-slate-300' onScroll={handleScroll}>
							<ProfileGroup idGroup={idGroup}
								news={news} loading={loading} handleLikePost={handleLikePost} handleCommentPost={handleCommentPost}
								socketConnection={socketConnection}/>
						</div>
					)
				}
			</div>
		</div>
	)
}

export default GroupPage