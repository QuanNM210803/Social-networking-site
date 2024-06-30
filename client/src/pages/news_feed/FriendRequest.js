/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/news_feed/navbar/Navbar'
import Sidebar_friendPage from '../../components/news_feed/sidebar/Sidebar_friendPage'
import ProfileUser from '../../components/news_feed/DetailsObject/user/ProfileUser'
import { useDispatch, useSelector } from 'react-redux'
import { initializeSocketConnection } from '../../socket/SocketUtils'
import { getPostsByUserId, likePost } from '../../apis/PostApi'
import { useNavigate } from 'react-router-dom'
import { FaAngleDoubleRight } from 'react-icons/fa'
import { FaAngleDoubleLeft } from 'react-icons/fa'

const FriendRequest = () => {
	const user=useSelector(state => state?.user)
	const navigate=useNavigate()
	const [idFriend, setIdFriend]=useState(null)
	const handleClickFriend=(id) => {
		setIdFriend(id)
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
	}, [idFriend])

	useEffect(() => {
		let mounted = true // Biến để đánh dấu component đã mount
		const fetchData = async () => {
			setLoading(true)
			try {
				if (idFriend!==null) {
					const data = await getPostsByUserId(idFriend, currentPage, limit)
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
	}, [currentPage, idFriend])
	
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

	const [isOpenSidebar, setIsOpenSidebar]=useState(false)
	useEffect(() => {
		setIsOpenSidebar(false)
	}, [idFriend])
	const handleOpenSidebar=() => {
		setIsOpenSidebar(!isOpenSidebar)
	}
	return (
		<div>
			<div className='sticky top-0 bg-slate-500' style={{ zIndex:1000 }}>
				<Navbar user={user} socketConnection={socketConnection}/>
			</div>
			<div className='flex top-0 left-0 right-0 bottom-0 relative'>
				<div className='h-[calc(100vh-56px)] lg:w-[25%] lg:block hidden bg-slate-100 overflow-auto scrollbar'>
					<Sidebar_friendPage handleClickFriend={handleClickFriend} socketConnection={socketConnection}/>
				</div>
				<div className='absolute left-0 top-0 lg:hidden block' style={{ zIndex:500 }}>
					{ 
						isOpenSidebar ? (
							<div className='flex relative'>
								<div className='h-[calc(100vh-56px)] w-[250px] bg-slate-100 overflow-auto scrollbar'>
									<Sidebar_friendPage handleClickFriend={handleClickFriend}/>
								</div>
								<div className='absolute top-0 right-0 px-1 py-[2px] flex items-center justify-center bg-slate-400' onClick={() => handleOpenSidebar()}>
									<FaAngleDoubleLeft size={40} className='text-slate-600  cursor-pointer hover:text-slate-800'/>
								</div>
							</div>
						):(
							<div className='flex items-center justify-center px-1 py-[2px] bg-slate-400 rounded-r' onClick={() => handleOpenSidebar()}>
								<FaAngleDoubleRight size={40} className='text-slate-600  cursor-pointer hover:text-slate-800'/>
							</div>
						)
					}
				</div>
				{
					idFriend===null ? (
						<div className='h-[calc(100vh-56px)] lg:w-[75%] w-full flex justify-center items-center overflow-auto bg-slate-300'>
							<h1 className='text-2xl text-slate-400 text-center'>Chọn tên của người mà bạn muốn xem trước trang cá nhân.</h1>
						</div>
					):(
						<div className='h-[calc(100vh-56px)] lg:w-[75%] w-full overflow-auto bg-slate-300' onScroll={handleScroll}>
							<ProfileUser idFriend={idFriend}
								news={news} loading={loading} handleLikePost={handleLikePost} handleCommentPost={handleCommentPost}
								socketConnection={socketConnection}/>
						</div>
					)
				}
			</div>
		</div>
	)
}

export default FriendRequest