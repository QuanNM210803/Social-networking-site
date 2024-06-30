/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react'
import { editUserDetails } from '../apis/UserApi'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/userSlice'
import { IoClose } from 'react-icons/io5'
import uploadFile from '../helpers/UploadFile'
import Loading from './Loading'

const EditUserDetails = ({ onClose }) => {
	const user=useSelector((state) => state?.user)
	const [data, setData]=useState({
		name: user?.name,
		cover_pic: user?.cover_pic,
		profile_pic: user?.profile_pic,
		phone: user?.phone,
		address: user?.address,
		dob: user?.dob ? new Date(user?.dob).toISOString().split('T')[0] : null
	})
	const uploadAvatarRef=useRef()
	const uploadCoverPicRef=useRef()
	const dispatch=useDispatch()
	const [loading, setLoading]=useState(false)
	const handleOnChange=(e) => {
		const { name, value }=e.target
		setData({
			...data, [name]:value
		})
	}

	const handleUploadPhoto=async(e) => {
		setLoading(true)
		const file=e.target.files[0]
		const name=e.target.name
		const uploadImage=await uploadFile(file)
		setData((preve) => {
			return {
				...preve, [name]:uploadImage?.url
			}
		})
		setLoading(false)
	}

	const handleOpenUploadAvatar=(e) => {
		e.preventDefault()
		e.stopPropagation()
		uploadAvatarRef.current.click()
	}
	const handleOpenUploadCover_pic=(e) => {
		e.preventDefault()
		e.stopPropagation()
		uploadCoverPicRef.current.click()
	}

	const handleSubmit=async(e) => {
		e.preventDefault()
		e.stopPropagation()
		const response=await editUserDetails(data)
		if (response?.success) {
			dispatch(setUser(response?.data))
			onClose()
		}
	}

	return (
		<div className='fixed top-14 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-70
         flex justify-center items-center z-10'>
			<div className='bg-slate-200 px-4 py-3 rounded w-full max-w-sm h-[80%] overflow-auto'>
				<div className='flex items-center justify-between w-full'>
					<h2 className='font-bold'>EDIT PROFILE</h2>
					<IoClose size={30} className='bg-slate-300 cursor-pointer rounded' onClick={onClose}/>
				</div>

				<form className='grid gap-3 mt-3' onSubmit={handleSubmit}>
					<div className='flex flex-col gap-1'>
						<label htmlFor='name' className='font-semibold'>Name</label>
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
					<div className='flex flex-col gap-1'>
						<label htmlFor='phone' className='font-semibold'>Phone</label>
						<input
							type='text'
							name='phone'
							id='phone'
							value={data.phone}
							onChange={handleOnChange}
							className='w-full py-1 px-2 focus:outline-primary border-0.5'
						>
						</input>
					</div>
					<div className='flex flex-col gap-1'>
						<label htmlFor='address' className='font-semibold'>Address</label>
						<input
							type='text'
							name='address'
							id='address'
							value={data.address}
							onChange={handleOnChange}
							className='w-full py-1 px-2 focus:outline-primary border-0.5'
						>
						</input>
					</div>
					<div className='flex flex-col gap-1'>
						<label htmlFor='dob' className='font-semibold'>Date of birth</label>
						<input
							type='date'
							name='dob'
							value={data.dob}
							onChange={handleOnChange}
							className='w-full py-1 px-2 focus:outline-primary border-0.5'
						/>
					</div>

					<div className='flex flex-col gap-1'>
						<div className='my-1 flex items-center gap-4'>
							<img
								src={data?.profile_pic}
								alt={data?.name}
								className='overflow-hidden rounded-full object-cover border-[1px] border-slate-400 w-10 h-10'
							/>
							<label htmlFor='profile_pic'>
								<button className='font-semibold bg-white px-2 py-1 rounded' onClick={handleOpenUploadAvatar}>Change Avatar</button>
								<input
									type='file'
									id='profile_pic'
									name='profile_pic'
									className='hidden'
									onChange={handleUploadPhoto}
									ref={uploadAvatarRef}
								/>
							</label>
						</div>
						<div className='my-1 flex items-center gap-4'>
							<img
								src={data?.cover_pic}
								alt={data?.name}
								className='overflow-hidden rounded-full object-cover border-[1px] border-slate-400 w-10 h-10'
							/>
							<label htmlFor='cover_pic'>
								<button className='font-semibold bg-white px-2 py-1 rounded' onClick={handleOpenUploadCover_pic}>Change Cover Picture</button>
								<input
									type='file'
									id='cover_pic'
									name='cover_pic'
									className='hidden'
									onChange={handleUploadPhoto}
									ref={uploadCoverPicRef}
								/>
							</label>
						</div>
					</div>
					<div>
						<hr className='bg-slate-200'/>
					</div>
					<div className='flex gap-2 ml-auto'>
						<button onClick={handleSubmit} className='bg-slate-600 text-white border px-4 py-1 rounded
                     hover:bg-secondary' disabled={loading}>
							{loading? <Loading/>:'Save'} 
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

//giúp React nhớ lại kết quả render của component và chỉ render lại nếu props của component thay đổi
export default React.memo(EditUserDetails)