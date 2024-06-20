/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import toast from 'react-hot-toast'

export const api=axios.create({
	baseURL:'http://localhost:8080'
})

export async function getGroupByUserId() {
	try {
		const response=await api.get('/group/getGroupOfUser', { withCredentials:true })
		return response.data
	} catch (error) {
		toast.error(error?.response?.data?.message)
		console.log(error)
	}
}