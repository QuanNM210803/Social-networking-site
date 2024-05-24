//tạo ra một Redux store sử dụng Redux Toolkit
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'

export const store = configureStore({
	//reducer là một đối tượng chứa tất cả các reducer của ứng dụng
	reducer: {
		user: userReducer
	}
})