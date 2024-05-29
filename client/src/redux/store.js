//tạo ra một Redux store sử dụng Redux Toolkit
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
// import không nhất thiết phải là userReducer, đây chỉ là cái tên
export const store = configureStore({
	//reducer là một đối tượng chứa tất cả các reducer của ứng dụng
	reducer: {
		user: userReducer // tên user không cần thiết phải giống name:'user' trong userSlice.js
	}
})