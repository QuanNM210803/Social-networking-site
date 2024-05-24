/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import uploadFile from '../helpers/UploadFile'
import { registerUser } from '../apis/CallAPI'

const RegisterPage = () => {
	const [data, setData]=useState({
		name:'',
		email:'',
		password:'',
		profile_pic:''
	})

	const [uploadPhoto, setUploadPhoto]=useState('')
	const navigate=useNavigate()

	const handleOnChange=(e) => {
		const { name, value }=e.target
		setData({ ...data, [name]:value })
	}
   
	const handleUploadPhoto= async (e) => {
		const file=e.target.files[0]
		const uploadPhoto=await uploadFile(file)
		setUploadPhoto(file)
		setData((preve) => {
			return {
				...preve,
				profile_pic: uploadPhoto?.url
			}
		})
	}

	const clearUploadPhoto=(e) => {
		// nếu có bất kỳ trình xử lý sự kiện nào khác
		// được đặt lên các phần tử cha của phần tử đang xử lý sự kiện này, chúng sẽ không được kích hoạt.
		e.stopPropagation() 
		e.preventDefault() //chặn hành vi mặc định của sự kiện
		setUploadPhoto('')
	}

	const handleSubmit=async(e) => {
		e.preventDefault()
		e.stopPropagation()
		const response=await registerUser(data)
		if (response?.success) {
			setData({
				name:'',
				email:'',
				password:'',
				profile_pic:''
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
						<label htmlFor='name'>Name : </label>
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
					<div className='flex flex-col gap-1'>
						<label htmlFor='profile_pic'>Photo : 
							<div className='h-14 bg-slate-200 
                     flex justify-center items-center 
                     border rounded hover:border-primary
                     cursor-pointer'>
								<p className='text-sm max-w-[300px] line-clamp-1'>
									{uploadPhoto?.name ? uploadPhoto?.name: 'Upload profile photo'}
								</p>

								{
									uploadPhoto?.name && (
										<button className='text-lg ml-2 hover:text-red-600' onClick={clearUploadPhoto}>
											<IoClose/>
										</button>
									)
								}
								
							</div>
						</label>

						<input
							type='file'
							id='profile_pic'
							name='profile_pic'
							className='bg-slate-100 px-2 py-1 focus:outline-primary hidden'
							onChange={handleUploadPhoto}
						>
						</input>
					</div>

					<button
						className='bg-primary text-lg px-1 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
					>
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