/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { io } from 'socket.io-client'
import { setOnlineUsers } from '../redux/userSlice'

export function initializeSocketConnection(dispatch) {
	const socketConnection=io(process.env.REACT_APP_BACKEND_URL, {
		auth:{
			token:localStorage.getItem('token')
		}
	})
	socketConnection.on('onlineUsers', (data) => {
		dispatch(setOnlineUsers(data))
	})
	return socketConnection
}