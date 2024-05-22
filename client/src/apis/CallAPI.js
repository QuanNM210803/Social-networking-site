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