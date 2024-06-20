/* eslint-disable no-console */
import axios from 'axios'
import toast from 'react-hot-toast'

export const api=axios.create({
	baseURL:'http://localhost:8080'
})

export async function checkEmail(data) {
	try {
		const response=await api.post('/api/email', data)
		toast.success(response.data.message)
		console.log(response)
		return response.data
	} catch (error) {
		toast.error(error?.response?.data?.message)
		console.log(error)
	}
}

export async function checkPassword(data) {
	try {
		const response=await api.post('/api/password', data, { withCredentials: true })
		toast.success(response.data.message)
		console.log(response)
		return response.data
	} catch (error) {
		toast.error(error?.response?.data?.message)
		console.log(error)
	}
}

export async function logoutServer() {
	try {
		const response=await api.get('/api/logout', { withCredentials: true })
		toast.success(response.data.message)
		return response.data
	} catch (error) {
		toast.error(error?.response?.data?.message)
		console.log(error)
	}
}