/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { FaImages } from 'react-icons/fa'
import { IoIosVideocam } from 'react-icons/io'
import { MdEmojiEmotions } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import NewsCard from '../../news/NewsCard'
import { getGroupById } from '../../../../apis/GroupApi'
import CreatePostInGroup from '../post/CreatePostInGroup'

const PostsGroup = ({ objectId, news, loading, handleLikePost, handleCommentPost }) => {
	const [showCreatePost, setShowCreatePost] = useState(false)
	const user=useSelector(state => state?.user)
	const handleCreatePost=() => {
		setShowCreatePost(!showCreatePost)
	}
	const [group, setGroup] = useState({})
	useEffect(() => {
		getGroupById(objectId).then((data) => {
			setGroup(data?.data)
		})
	}, [objectId])
	return (
		<div className='flex justify-center'>
			<div className='w-[80%] space-y-3 h-auto'>
				{group?.members?.some(member => member?._id.toString()===user?._id.toString()) && <div className='w-full h-auto bg-slate-200 px-4 py-2 space-y-2 rounded-md'>
					<div className='flex items-center gap-4'>
						<Link to={`/profileUser/${user?._id}`} className='w-12 h-12 flex-shrink-0'>
							<img
								src={user?.profile_pic}
								alt='profile'
								className='rounded-full w-12 h-12 object-cover cursor-pointer'
							/>
						</Link>
						<input
							type='text'
							placeholder='Bạn đang nghĩ gì thế ?'
							className='w-full h-10 px-3 rounded-xl cursor-pointer'
							onClick={() => handleCreatePost()}
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
						<div className='flex items-center gap-2 h-10 px-5 hover:bg-gray-300 cursor-pointer rounded-lg'
							onClick={() => handleCreatePost()}>
							<FaImages size={25} className='text-green-600'/>
							<p>Ảnh/Video</p>
						</div>
						<div className='flex items-center gap-2 h-10 px-5 hover:bg-gray-300 cursor-pointer rounded-lg'>
							<MdEmojiEmotions size={25} className='text-yellow-600'/>
							<p>Cảm xúc/hoạt động</p>
						</div>
					</div>
				</div>}
				<div className='w-full h-auto space-y-3'>
					{news.length>0 ? (
						news.map((item, index) => (
							<NewsCard news={item} handleLikePost={handleLikePost} handleCommentPost={handleCommentPost}/>
						))
					):(
						<div className='w-full h-20 bg-slate-200 rounded-md flex justify-center items-center'>
							<p className='text-slate-500'>Không có bài đăng nào!</p>
						</div>
					)}
				</div>
			</div>
			{showCreatePost && (
				<CreatePostInGroup handleCreatePost={handleCreatePost} groupId={group?._id} groupName={group?.name}/>
			)}
		</div>
	)
}

export default PostsGroup