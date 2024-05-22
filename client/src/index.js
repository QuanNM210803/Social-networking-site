/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.js'
import { RouterProvider } from 'react-router-dom'
import router from './routes/index.js'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<RouterProvider router={router}>
		   <App/>
		</RouterProvider>
	</React.StrictMode>
)