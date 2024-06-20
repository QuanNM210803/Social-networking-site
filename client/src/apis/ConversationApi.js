/* eslint-disable no-console */
import axios from 'axios'
import toast from 'react-hot-toast'

export const api=axios.create({
	baseURL:'http://localhost:8080'
})

export async function getConversationsApi(userId) {
	try {
		const response=await api.get(`/conversation/conversations/${userId}`, { withCredentials:true })
		console.log(response.data)
		return response.data
	} catch (error) {
		console.log(error)
		toast.error(error?.response?.data?.message)
	}
}