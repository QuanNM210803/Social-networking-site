/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { checkPassword } from '../apis/CallAPI'
import Avatar from '../components/Avatar'
import { useDispatch } from 'react-redux'
import { setToken } from '../redux/userSlice'

const CheckPasswordPage = () => {

	const navigate=useNavigate()
	const location=useLocation()
	const dispatch=useDispatch()

	const [data, setData]=useState({
		password:'',
		userId:location?.state?._id
	})

	useEffect(() => {
		if (!location?.state?.name) {
			navigate('/email')
		}
	}, [])

	const handleOnChange=(e) => {
		const { name, value }=e.target
		setData({ ...data, [name]:value })
	}

	const handleSubmit=async(e) => {
		e.preventDefault()
		e.stopPropagation()
		const response=await checkPassword(data)
		if (response?.success) {
			dispatch(setToken(response?.token))
			localStorage.setItem('token', response?.token)
			setData({
				password:''
			})
			navigate('/home')
		}
	}
	return (
		<div className='mt-5'>
			<div className='bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto'>
				<div className='w-fit mx-auto mb-2 flex justify-center items-center flex-col'>
					<Avatar
						width={70}
						height={70}
						name={location?.state?.name}
						imageUrl={location?.state?.profile_pic}
					/>
					<h2 className='font-semibold text-lg mt-1'>{location?.state?.name}</h2>
				</div>
				<form className='grid gap-4 mt-3' onSubmit={handleSubmit}>
					<div className='flex flex-col gap-1'>
						<label htmlFor='password'>Password : </label>
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

					<button
						className='bg-primary text-lg px-1 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
					>
                  Login
					</button>
				</form>

				<p className='text-center my-3'>
					<Link to={'/forgot-password'} className='hover:text-primary font-semibold'> Forgot password ?</Link>
				</p>

			</div>
		</div>
	)
}

export default CheckPasswordPage