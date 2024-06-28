/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import toast from 'react-hot-toast'

export const api=axios.create({
	baseURL:'http://localhost:8080'
})

export const getCommentsByPostId=async (postId) => {
	try {
		const response=await api.get(`/comment/getCommentsByPostId/${postId}`, { withCredentials:true })
		return response?.data
	} catch (error) {
		// toast.error(error?.response?.data?.message)
		console.error(error)
	}
}

export const createComment=async (postId, text, image, video) => {
	try {
		const formData=new FormData()
		formData.append('postId', postId)
		formData.append('text', text)
		formData.append('image', image)
		formData.append('video', video)
		const response=await api.post('/comment/create-comment', formData, { withCredentials:true })
		toast.success(response?.data?.message)
		return response?.data
	} catch (error) {
		toast.error(error?.response?.data?.message)
		console.error(error)
	}
}