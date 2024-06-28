/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import axios from 'axios'
import toast from 'react-hot-toast'

export const api=axios.create({
	baseURL:'http://localhost:8080'
})

export async function registerUser(data) {
	try {
		const response=await api.post('/user/register', data)
		toast.success(response.data.message)
		return response.data
	} catch (error) {
		toast.error(error?.response?.data?.message)
		console.log(error)
	}
}

export async function getUserDetails() {
	try {
		const response=await api.get('/user/user-details', { withCredentials: true })
		console.log('api  ', response.data)
		//toast.success(response.data.message)
		return response.data
	} catch (error) {
		// toast.error(error?.response?.data?.message)
		console.log(error)
	}
}

export async function editUserDetails(data) {
	try {
		const response=await api.put('/user/update-user', data, { withCredentials:true })
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
		const response=await api.post('/user/search-user', data, { withCredentials: true })
		console.log(response.data)
		//toast.success(response.date.message)
		return response.data
	} catch (error) {
		console.log(error)
		toast.error(error?.response?.data?.message)
	}
}

export async function getFriendRequest() {
	try {
		const response=await api.get('/user/getFriendRequest', { withCredentials:true })
		return response?.data
	} catch (error) {
		// toast.error(error?.response?.data?.message)
		console.log(error)
	}
}

export async function getUserById(userId) {
	try {
		const response=await api.get(`/user/getUserById/${userId}`, { withCredentials:true })
		return response?.data
	} catch (error) {
		// toast.error(error?.response?.data?.message)
		console.log(error)
	}
}

export async function getListFriend(objectId, search) {
	try {
		const response=await api.get('/user/getFriends', { params:{ objectId, search }, withCredentials:true })
		return response?.data
	} catch (error) {
		// toast.error(error?.response?.data?.message)
		console.log(error)
	}
}

export async function getFriendsSuggest() {
	try {
		const response=await api.get('/user/getFriendsSuggest', { withCredentials:true })
		return response?.data
	} catch (error) {
		// toast.error(error?.response?.data?.message)
		console.log(error)
	}
}

export async function getImagesByUserId(userId) {
	try {
		const response=await api.get('/user/getImagesByUserId', { params:{ userId }, withCredentials:true })
		return response?.data
	} catch (error) {
		// toast.error(error?.response?.data?.message)
		console.log(error)
	}
}

export async function getVideosByUserId(userId) {
	try {
		const response=await api.get('/user/getVideosByUserId', { params:{ userId }, withCredentials:true })
		return response?.data
	} catch (error) {
		// toast.error(error?.response?.data?.message)
		console.log(error)
	}
}

export async function searchUserGroup(search) {
	try {
		const response=await api.post('/user/search-user-group', { search }, { withCredentials:true })
		return response?.data
	} catch (error) {
		// toast.error(error?.response?.data?.message)
		console.log(error)
	}
}

export async function friendRequest(data) {
	try {
		const response=await api.put('/user/friendRequest', data, { withCredentials:true })
		toast.success(response?.data?.message)
		return response?.data
	} catch (error) {
		toast.error(error?.response?.data?.message)
		console.log(error)
	}
}

export async function cancelFriendRequest(data) {
	try {
		const response=await api.put('/user/cancelFriendRequest', data, { withCredentials:true })
		toast.success(response?.data?.message)
		return response?.data
	} catch (error) {
		toast.error(error?.response?.data?.message)
		console.log(error)
	}
}

export async function acceptFriend(data) {
	try {
		const response=await api.put('/user/acceptFriend', data, { withCredentials:true })
		toast.success(response?.data?.message)
		return response?.data
	} catch (error) {
		toast.error(error?.response?.data?.message)
		console.log(error)
	}
}

export async function unfriend(data) {
	try {
		const response=await api.put('/user/unfriend', data, { withCredentials:true })
		toast.success(response?.data?.message)
		return response?.data
	} catch (error) {
		toast.error(error?.response?.data?.message)
		console.log(error)
	}
}

export async function deleteFriendRequest(data) {
	try {
		const response=await api.put('/user/deleteFriendRequest', data, { withCredentials:true })
		toast.success(response?.data?.message)
		return response?.data
	} catch (error) {
		toast.error(error?.response?.data?.message)
		console.log(error)
	}
}