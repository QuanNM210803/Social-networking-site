/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-pattern */
import { createSlice } from '@reduxjs/toolkit'

// trạng thái khởi tạo cho slice
const initialState = {
	_id:'',
	name:'',
	email:'',
	profile_pic:'',
	token:'',
	onlineUsers:[],
	socketConnection: null
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	//reducers: Một đối tượng chứa các reducer function. Mỗi reducer function sẽ xử lý một loại action cụ thể.
	reducers: {
		setUser:(state, action) => {
			state._id=action.payload._id,
			state.name=action.payload.name,
			state.email=action.payload.email,
			state.profile_pic=action.payload.profile_pic
		},
		setToken:(state, action) => {
			state.token=action.payload
		},
		logout:(state, action) => {
			state._id='',
			state.name='',
			state.email='',
			state.profile_pic='',
			state.token='',
			state.socketConnection=null
		},
		setOnlineUsers:(state, action) => {
			state.onlineUsers=action.payload
		},
		setSocketConnection :(state, action) => {
			state.socketConnection=action.payload
		}
	}
})

// Đây là việc xuất ra các action creator. Redux Toolkit tự động tạo ra các action creator cho mỗi reducer function
export const { setUser, setToken, logout, setOnlineUsers, setSocketConnection } = userSlice.actions

//Đây là việc xuất ra reducer function. Redux Toolkit tự động tạo ra reducer function từ các reducer function bạn đã cung cấp
export default userSlice.reducer