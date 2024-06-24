/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../apis/UserApi'

const RegisterPage = () => {
	const [data, setData]=useState({
		name:'',
		email:'',
		password:'',
		profile_pic:'https://res.cloudinary.com/daygzzzwz/image/upload/v1719162989/chat-app-file/egw2p3zf856pnjgdmzcs.jpg',
		cover_pic:'https://res.cloudinary.com/daygzzzwz/image/upload/v1719159225/hggaafvvu6hpclerkpol.png'
	})
	const navigate=useNavigate()

	const handleOnChange=(e) => {
		const { name, value }=e.target
		setData({ ...data, [name]:value })
	}
   
	const handleSubmit=async(e) => {
		e.preventDefault()
		e.stopPropagation()
		const response=await registerUser(data)
		if (response?.success) {
			setData({
				name:'',
				email:'',
				password:''
			})
			navigate('/email')
		}
		console.log(response)
	}

	return (
		<div className='mt-5'>
			<div className='bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto'>
				<h3>Welcome to Chat app!</h3>

				<form className='grid gap-4 mt-5' onSubmit={handleSubmit}>
					<div className='flex flex-col gap-1'>
						<label htmlFor='name'>Name</label>
						<input
							type='text'
							id='name'
							name='name'
							placeholder='Enter your name'
							className='bg-slate-100 px-2 py-1 focus:outline-primary'
							value={data.name}
							onChange={handleOnChange}
							required
						>
						</input>
					</div>
					<div className='flex flex-col gap-1'>
						<label htmlFor='email'>Email</label>
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
					<div className='flex flex-col gap-1'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							id='password'
							name='password'
							placeholder='Enter your password'
							className='bg-slate-100 px-2 py-1 focus:outline-primary'
							value={data.password}
							onChange={handleOnChange}
							required
						>
						</input>
					</div>
					<button className='bg-primary text-lg px-1 py-1 hover:bg-secondary
                  rounded mt-2 font-bold text-white leading-relaxed tracking-wide'>
                  Register
					</button>
				</form>
				<p className='text-center my-3'>
               Already have account ? 
					<Link to={'/email'} className='hover:text-primary font-semibold'> Login</Link>
				</p>
			</div>
		</div>
	)
}

export default RegisterPage

//2:40:00