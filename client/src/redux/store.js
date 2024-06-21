//tạo ra một Redux store sử dụng Redux Toolkit
//import { configureStore } from '@reduxjs/toolkit'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from './userSlice'
// import không nhất thiết phải là userReducer, đây chỉ là cái tên

const rootReducer=combineReducers({
	user:userReducer // tên user không cần thiết phải giống name:'user' trong userSlice.js
})

const persistConfig={
	key:'root',
	storage: storage,
	whitelist:['user']
}

const persistedReducer=persistReducer(persistConfig, rootReducer)

const store = configureStore({
	//reducer là một đối tượng chứa tất cả các reducer của ứng dụng
	reducer: persistedReducer
})

export const persistor=persistStore(store)
export default store