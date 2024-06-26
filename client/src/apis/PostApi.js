/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import toast from 'react-hot-toast'

export const api=axios.create({
	baseURL:'http://localhost:8080'
})

export const createPost=async (post) => {
	try {
		const formData=new FormData()
		formData.append('text', post.text)
		Array.from(post.image).forEach(image => {
			formData.append('image', image)
		})
		Array.from(post.video).forEach(video => {
			formData.append('video', video)
		})
		const response=await api.post('/post/create', formData, { withCredentials:true })
		toast.success(response?.data?.message)
		return response?.data
	} catch (error) {
		toast.error(error?.response?.data?.message)
		console.error(error)
	}
}

export const createPostInGroup=async (post) => {
	try {
		const formData=new FormData()
		formData.append('groupId', post?.groupId)
		formData.append('text', post?.text)
		Array.from(post?.image).forEach(image => {
			formData.append('image', image)
		})
		Array.from(post?.video).forEach(video => {
			formData.append('video', video)
		})
		const response=await api.post('/post/createInGroup', formData, { withCredentials:true })
		toast.success(response?.data?.message)
		return response?.data
	} catch (error) {
		toast.error(error?.response?.data?.message)
		console.error(error)
	}
}

export const getPostsPagination=async (page, limit) => {
	try {
		const response=await api.get(`/post/posts?page=${page}&limit=${limit}`, { withCredentials:true })
		return response?.data
	} catch (error) {
		console.error(error)
		toast.error('Can\'t load more')
	}
}

export const getPostsPaginationInGroup=async (groupId, page, limit) => {
	try {
		const response=await api.get(`/post/posts/group?groupId=${groupId}&page=${page}&limit=${limit}`, { withCredentials:true })
		return response?.data
	} catch (error) {
		console.error(error)
		toast.error('Can\'t load more')
	}
}

export const getPostsByUserId=async (userId, page, limit) => {
	try {
		const response=await api.get(`/post/all/user?userId=${userId}&page=${page}&limit=${limit}`, { withCredentials:true })
		return response?.data
	} catch (error) {
		console.error(error)
		toast.error('Can\'t load more')
	}
}

export const likePost=async (postId) => {
	try {
		const response=await api.put('/post/like-post', { postId }, { withCredentials:true })
		toast.success(response?.data?.liked ? 'Post liked' : 'Post unliked')
		return response?.data
	} catch (error) {
		console.log(error)
		toast.error(error?.response?.data?.message)
	}
}