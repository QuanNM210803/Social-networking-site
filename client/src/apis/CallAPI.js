/* eslint-disable no-console */
import axios from 'axios'
import toast from 'react-hot-toast'


export const api=axios.create({
	baseURL : 'http://localhost:8080'
})

export async function registerUser(data) {
	try {
		const response=await api.post('/api/register', data)
		toast.success(response.data.message)
		return response.data
	} catch (error) {
		toast.error(error?.response?.data?.message)
		console.log(error)
	}
}

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

export async function getUserDetails() {
	try {
		const response=await api.get('/api/user-details', { withCredentials: true })
		console.log('api  ', response.data)
		//toast.success(response.data.message)
		return response.data
	} catch (error) {
		toast.error(error?.response?.data?.message)
		console.log(error)
	}
}

export async function editUserDetails(data) {
	try {
		const response=await api.put('/api/update-user', data, { withCredentials:true })
		toast.success(response.data.message)
		console.log(response.data)
		return response.data
	} catch (error) {
		console.log(error)
		toast.error(error?.response?.data?.message)
	}
}

export async function searchUserApi(data) {
	try {
		const response=await api.post('/api/search-user', data, { withCredentials: true })
		console.log(response.data)
		//toast.success(response.date.message)
		return response.data
	} catch (error) {
		console.log(error)
		toast.error(error?.response?.data?.message)
	}
}