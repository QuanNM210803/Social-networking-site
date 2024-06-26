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

export async function getGroupById(groupId) {
	try {
		const response=await api.get(`/group/groupDetails/${groupId}`, { withCredentials:true })
		return response.data
	} catch (error) {
		toast.error(error?.response?.data?.message)
		console.log(error)
	}
}

export async function getImagesByGroupId(groupId) {
	try {
		const response=await api.get(`/group/getImagesByGroupId?groupId=${groupId}`, { withCredentials:true })
		return response.data
	} catch (error) {
		toast.error(error?.response?.data?.message)
		console.log(error)
	}
}

export async function getVideosByGroupId(groupId) {
	try {
		const response=await api.get(`/group/getVideosByGroupId?groupId=${groupId}`, { withCredentials:true })
		return response.data
	} catch (error) {
		toast.error(error?.response?.data?.message)
		console.log(error)
	}
}

export async function editGroup(data) {
	try {
		const response=await api.put('/group/editGroup', data, { withCredentials:true })
		toast.success(response?.data?.message)
		return response?.data
	} catch (error) {
		toast.error(error?.response?.data?.message)
		console.log(error)
	}
}

export async function createGroup(data) {
	try {
		const response=await api.post('/group/create', data, { withCredentials:true })
		toast.success(response?.data?.message)
		return response?.data
	} catch (error) {
		toast.error(error?.response?.data?.message)
		console.log(error)
	}
}

export async function requestJoinGroup(data) {
	try {
		const response=await api.put('/group/requestJoinGroup', data, { withCredentials:true })
		toast.success(response?.data?.message)
		return response?.data
	} catch (error) {
		toast.error(error?.response?.data?.message)
		console.log(error)
	}
}

export async function outGroup(data) {
	try {
		const response=await api.put('/group/outGroup', data, { withCredentials:true })
		toast.success(response?.data?.message)
		return response?.data
	} catch (error) {
		toast.error(error?.response?.data?.message)
		console.log(error)
	}
}

export async function acceptJoinGroup(data) {
	try {
		const response=await api.put('/group/acceptJoinGroup', data, { withCredentials:true })
		toast.success(response?.data?.message)
		return response?.data
	} catch (error) {
		toast.error(error?.response?.data?.message)
		console.log(error)
	}
}