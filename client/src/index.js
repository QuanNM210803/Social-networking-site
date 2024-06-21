/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.js'
import { RouterProvider } from 'react-router-dom'
import router from './routes/index.js'
import { Provider } from 'react-redux'
import store, { persistor } from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<RouterProvider router={router}>
		         <App/>
				</RouterProvider>
			</PersistGate>
		</Provider>
	</React.StrictMode>
)