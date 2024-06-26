/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-pattern */
import { createSlice } from '@reduxjs/toolkit'

// trạng thái khởi tạo cho slice
const initialState = {
	_id:'',
	name:'',
	email:'',
	profile_pic:'',
	cover_pic:'',
	phone:'',
	address:'',
	dob:'',
	friends:[],
	friend_requests:[],
	storagedVideo:[],
	token:'',
	onlineUsers:[]
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	//reducers: Một đối tượng chứa các reducer function. Mỗi reducer function sẽ xử lý một loại action cụ thể.
	reducers: {
		setUser:(state, action) => {
			state._id=action?.payload?._id,
			state.name=action?.payload?.name,
			state.email=action?.payload?.email,
			state.profile_pic=action?.payload?.profile_pic
			state.cover_pic=action?.payload?.cover_pic
			state.phone=action?.payload?.phone
			state.address=action?.payload?.address
			state.dob=action?.payload?.dob
			state.friends=action?.payload?.friends
			state.friend_requests=action?.payload?.friend_requests
			state.storagedVideo=action?.payload?.storagedVideo
		},
		setFriends:(state, action) => {
			state.friends=action?.payload
		},
		setFriendRequests:(state, action) => {
			state.friend_requests=action?.payload
		},
		setToken:(state, action) => {
			state.token=action.payload
		},
		logout:(state, action) => {
			state._id='',
			state.name='',
			state.email='',
			state.profile_pic='',
			state.cover_pic='',
			state.phone='',
			state.address='',
			state.dob='',
			state.friends=[],
			state.friend_requests=[],
			state.storagedVideo=[],
			state.token='',
			state.onlineUsers=[]
		},
		setOnlineUsers:(state, action) => {
			state.onlineUsers=action?.payload
		}
	}
})

// Đây là việc xuất ra các action creator. Redux Toolkit tự động tạo ra các action creator cho mỗi reducer function
export const { setUser, setToken, logout, setOnlineUsers, setFriends, setFriendRequests } = userSlice.actions

//Đây là việc xuất ra reducer function. Redux Toolkit tự động tạo ra reducer function từ các reducer function bạn đã cung cấp
export default userSlice.reducer