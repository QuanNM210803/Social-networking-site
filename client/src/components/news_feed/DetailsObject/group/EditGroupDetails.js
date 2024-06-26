/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import Loading from '../../../Loading'
import { IoClose } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import uploadFile from '../../../../helpers/UploadFile'
import { editGroup, getGroupById } from '../../../../apis/GroupApi'

const EditGroupDetails = ({ onClose, objectId }) => {
	const user=useSelector((state) => state?.user)
	const [group, setGroup]=useState({})

	useEffect(() => {
		getGroupById(objectId).then((data) => {
			setGroup(data?.data)
		})
	}, [objectId])
	console.log('data', group)

	const uploadAvatarRef=useRef()
	const uploadCoverPicRef=useRef()

	const [loading, setLoading]=useState(false)
	const handleOnChange=(e) => {
		const { name, value }=e.target
		setGroup({
			...group, [name]:value
		})
	}

	const handleUploadPhoto=async(e) => {
		setLoading(true)
		const file=e.target.files[0]
		const name=e.target.name
		const uploadImage=await uploadFile(file)
		setGroup((preve) => {
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
		const response=await editGroup({
			groupId: group?._id,
			name: group?.name,
			profile_pic: group?.profile_pic,
			cover_pic: group?.cover_pic,
			privacy: group?.privacy
		})
		if (response?.success) {
			onClose()
			window.location.reload()
		}
	}

	const handleChangePrivacy=(event) => {
		setGroup({ ...group, privacy:event.target.value })
	}

	return (
		<div className='fixed top-14 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-70
         flex justify-center items-center z-10'>
			<div className='bg-slate-200 px-4 py-3 rounded w-full max-w-sm'>
				<div className='flex items-center justify-between w-full'>
					<h2 className='font-bold'>EDIT GROUP</h2>
					<IoClose size={30} className='bg-slate-300 cursor-pointer rounded' onClick={() => onClose()}/>
				</div>

				<form className='grid gap-3 mt-3' onSubmit={handleSubmit}>
					<div className='flex flex-col gap-1'>
						<label htmlFor='name' className='font-semibold'>Name</label>
						<input
							type='text'
							name='name'
							id='name'
							value={group?.name}
							onChange={handleOnChange}
							className='w-full py-1 px-2 focus:outline-primary border-0.5 rounded-md'
						>
						</input>
					</div>
					<div className='flex flex-col gap-1'>
						<label htmlFor='privacy' className='font-semibold'>Privacy</label>
						<select id="privacy" name="privacy" className="w-full py-1 px-2 rounded-md border border-slate-400 cursor-pointer"
							onChange={handleChangePrivacy} value={group?.privacy}>
							<option value="public">Công khai</option>
							<option value="private">Riêng tư</option>
						</select>
					</div>

					<div className='flex flex-col gap-1'>
						<div className='my-1 flex items-center gap-4'>
							<img
								src={group?.profile_pic}
								alt={group?.name}
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
								src={group?.cover_pic}
								alt={group?.name}
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

export default React.memo(EditGroupDetails)