// eslint-disable-next-line no-unused-vars
import React from 'react'
import logo from '../assets/xing.svg'


const AuthLayouts = ({ children }) => {
	return (
		<>
			<header className='flex justify-center items-center py-3 h-20 shadow-md bg-white'>
				<img src={logo} alt='logo' className='w-16 h-16 rounded-full bg-slate-300'></img>
			</header>
			{
				children
			}
		</>
	)
}

export default AuthLayouts