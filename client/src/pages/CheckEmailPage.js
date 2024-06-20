/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */

import React, { useState } from 'react'
import { PiUserCircle } from 'react-icons/pi'
import { Link, useNavigate } from 'react-router-dom'
import { checkEmail } from '../apis/IndexApi'

const CheckEmailPage = () => {

	const [data, setData]=useState({
		email:''
	})
	const navigate=useNavigate()

	const handleOnChange=(e) => {
		const { name, value }=e.target
		setData({ ...data, [name]:value })
	}

	const handleSubmit=async(e) => {
		e.preventDefault()
		e.stopPropagation()

		const response=await checkEmail(data)
		if (response?.success) {
			setData({
				email:''
			})
			navigate('/password', {
				state: response?.data
			})
		}
	}
	return (
		<div className='mt-5'>
			<div className='bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto'>
				<div className='w-fit mx-auto mb-2'>
					<PiUserCircle
						size={80}
					/>
				</div>
				<h3 className='flex justify-center items-center'>Welcome to NuaQ!</h3>
				<form className='grid gap-4 mt-3' onSubmit={handleSubmit}>
					<div className='flex flex-col gap-1'>
						<label htmlFor='email'>Email : </label>
						<input
							type='email'
							id='email'
							name='email'
							placeholder='Enter your email'
							className='bg-slate-100 px-2 py-1 focus:outline-primary'
							value={data.email}
							onChange={handleOnChange}
							required
						>
						</input>
					</div>

					<button
						className='bg-primary text-lg px-1 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
					>
                  Let's Go
					</button>
				</form>

				<p className='text-center my-3'>
               New User? 
					<Link to={'/register'} className='hover:text-primary font-semibold'> Register</Link>
				</p>

			</div>
		</div>
	)
}

export default CheckEmailPage