/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import Avatar from './Avatar'
import uploadFile from '../helpers/UploadFile'
import Divider from './Divider'
import { editUserDetails } from '../apis/CallAPI'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/userSlice'

const EditUserDetails = ({ onClose, user }) => {
	const [data, setData]=useState({
		name: user?.name,
		profile_pic: user?.profile_pic
	})
	const uploadPhotoRef=useRef()
	const dispatch=useDispatch()

	useEffect(() => {
		setData((preve) => {
			return {
				...preve,
				...user
			}
		})
	}, [user])

	const handleOnChange=(e) => {
		const { name, value }=e.target
		setData({
			...data, [name]:value
		})
	}

	const handleUploadPhoto=async(e) => {
		const file=e.target.files[0]
		const uploadPhoto=await uploadFile(file)
		setData((preve) => {
			return {
				...preve,
				profile_pic: uploadPhoto?.url
			}

		})
	}

	const handleOpenUploadPhoto=(e) => {
		e.preventDefault()
		e.stopPropagation()
		//phần tử nào tham chiếu uploadPhotoRef sẽ được click
		uploadPhotoRef.current.click()
	}

	const handleSubmit=async(e) => {
		e.preventDefault()
		e.stopPropagation()
		console.log('data update', data)
		const response=await editUserDetails({ name: data?.name, profile_pic: data?.profile_pic })
		if (response?.success) {
			dispatch(setUser(response?.data))
			onClose()
		}
	}

	return (
		<div className='fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40
         flex justify-center items-center z-10'>
			<div className='bg-white p-4 m-1 rounded w-full max-w-sm'>
				<h2 className='font-semibold'>Profile details</h2>
				<p className='text-sm'>Edit user details</p>

				<form className='grid gap-3 mt-3' onSubmit={handleSubmit}>
					<div className='flex flex-col gap-1'>
						<label htmlFor='name'>Name:</label>
						<input
							type='text'
							name='name'
							id='name'
							value={data.name}
							onChange={handleOnChange}
							className='w-full py-1 px-2 focus:outline-primary border-0.5'
						>
						</input>
					</div>

					<div>
						<div>Photo:</div>
						<div className='my-1 flex items-center gap-4'>
							<Avatar
								width={40}
								height={40}
								imageUrl={data?.profile_pic}
								name={data?.name}
							/>
							<label htmlFor='profile_pic'>
								<button className='font-semibold' onClick={handleOpenUploadPhoto}>Change Photo</button>
								<input
									type='file'
									id='profile_pic'
									className='hidden'
									onChange={handleUploadPhoto}
									ref={uploadPhotoRef}
								/>
							</label>
						</div>
					</div>
					<Divider/>
					<div className='flex gap-2 ml-auto'>
						<button onClick={onClose} className='border-primary text-primary border px-4 py-1 rounded
                  hover:bg-primary hover:text-white'
						>
                     Cancel
						</button>   
						<button onClick={handleSubmit} className='border-primary bg-primary text-white border px-4 py-1 rounded
                  hover:bg-secondary'
						>
                     Save 
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

//giúp React nhớ lại kết quả render của component và chỉ render lại nếu props của component thay đổi
export default React.memo(EditUserDetails)

// 4:29:36