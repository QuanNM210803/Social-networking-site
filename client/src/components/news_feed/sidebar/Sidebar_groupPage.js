/* eslint-disable no-console */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { MdGroups } from 'react-icons/md'
import { FaAngleRight } from 'react-icons/fa6'
import { FaArrowLeft } from 'react-icons/fa6'
import { IoAddOutline } from 'react-icons/io5'
import { IoMdClose } from 'react-icons/io'

const Sidebar_groupPage = ({ handleClickGroup }) => {
	const [option, setOption]=useState(null)
	const [onOpenCreateGroup, setOnOpenCreateGroup]=useState(false)
	const [valuePrivacy, setValuePrivacy]=useState('')
	const [groupNameCreate, setGroupNameCreate]=useState('')
	const [errorInput, setErrorInput]=useState('')
	const [groups, setGroups]=useState([
		{
			_id: '1',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Code ptit'
		},
		{
			_id: '2',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Mùa lúa chín'
		},
		{
			_id: '3',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Hưng Yên quê tôi'
		},
		{
			_id: '4',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Tôi yêu Ptit'
		},
		{
			_id: '5',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Cộng đồng PUPG Việt Nam'
		},
		{
			_id: '6',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Học lập trình cùng Ptit'
		},
		{
			_id: '7',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Ảo thật đấy'
		},
		{
			_id: '8',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Anh em code dạo'
		},
		{
			_id: '9',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Học code mạng xã hội'
		},
		{
			_id: '10',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Không có gì hôm nay?'
		},
		{
			_id: '11',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A'
		},
		{
			_id: '12',
			avatar: 'https://www.w3schools.com/howto/img_avatar.png',
			name: 'Nguyễn Văn A'
		}
	])
	const handleClickedOption=(value) => {
		setOption(value)
	}
	const handleOpenCreateGroup=() => {
		setOnOpenCreateGroup(!onOpenCreateGroup)
	}
	const handleChangePrivacy=(e) => {
		setValuePrivacy(e?.target?.value)
	}
	const handleGroupNameChange = (event) => {
		setGroupNameCreate(event?.target?.value)
	}
	const handleCreateGroup=() => {
		if (groupNameCreate==='' || valuePrivacy==='') {
			setErrorInput('Vui lòng điền đầy đủ thông tin')
		} else {
			setErrorInput('')
			console.log('Tạo nhóm thành công', { groupNameCreate, valuePrivacy })
			setOnOpenCreateGroup(false)
		}
	}

	useEffect(() => {
		if (errorInput) {
			const timer = setTimeout(() => {
				setErrorInput('')
			}, 2000)
  
			return () => clearTimeout(timer)
		}
	}, [errorInput])
	return (
		<div className='h-auto'>
			<div className='px-3 py-2 bg-slate-300 flex justify-between items-center'>
				<p className='font-bold text-2xl text-slate-800'>Nhóm</p>
				<button className='flex items-center gap-1 hover:bg-slate-200 px-2 py-1 rounded' onClick={handleOpenCreateGroup}>
					<IoAddOutline size={21}/>
					<p>Tạo nhóm</p>
				</button>
			</div>
			{option===null && (
				<div>
					<div className='px-3 py-2 flex items-center justify-between hover:bg-slate-200 rounded-md cursor-pointer'
						onClick={() => handleClickedOption(1)}>
						<div className='flex items-center gap-4'>
							<MdGroups size={30}/>
							<p className='font-semibold text-nomal'>Nhóm của bạn</p>
						</div>
						<FaAngleRight size={25}/>
					</div>
				</div>
			)}
			{option===1 && (
				<div className=''>
					<div className='flex items-center px-3 py-1 gap-4 bg-slate-300'>
						<FaArrowLeft size={30} className='cursor-pointer p-1 rounded-full hover:bg-slate-200'
							onClick={() => handleClickedOption(null)}/>
						<p className='font-semibold text-nomal'>Nhóm của bạn</p>
					</div>
					<div className='flex items-center px-3 py-2 bg-slate-300'>
						<input type='text' placeholder='Tìm kiếm nhóm của bạn' className='w-full h-8 px-3 bg-slate-200 rounded-md'/>
					</div>
					{
						groups.length===0 ? (
							<div className='py-5 px-5'>
								<p className='text-center text-slate-500'>Bạn chưa tham gia vào bất kì nhóm nào</p>
							</div>
						):(
							<div className='p-3 space-y-2 h-[510px] overflow-auto scrollbar-newsfeed'>
								<div className='w-[335px] space-y-3'>
									{
										groups.map((group, index) => (
											<div className='flex gap-3'>
												<div className=''>
													<img
														src={group?.avatar}
														width={60}
														height={60}
														className='rounded-lg cursor-pointer'
														onClick={() => handleClickGroup(group?._id)}
													/>
												</div>
												<div className='w-full h-auto'>
													<p className='text-lg font-semibold cursor-pointer hover:underline'
														onClick={() => handleClickGroup(group?._id)}>{group?.name}</p>
												</div>
											</div>
										))
									}
								</div>
							</div>
						)
					}
				</div>
			)}
			{onOpenCreateGroup && (
				<div className='fixed top-0 bottom-0 left-0 right-0 z-50 bg-gray-700 bg-opacity-70
                  flex justify-center items-center'>
					<div className='bg-slate-300 w-[500px] h-auto rounded-md py-2'>
						<div className='w-full h-auto flex justify-center items-center py-2'> 
							<p className='font-bold text-xl'>Tạo nhóm mới</p>
						</div>
						<div className='w-full h-auto flex justify-center items-center py-1'> 
							<p className='text-sm'>Bạn sẽ có quyền quản trị của nhóm do bạn tạo ra</p>
						</div>
						
						<div className='flex items-center justify-center w-auto h-auto mt-5'>
							<input type='text' value={groupNameCreate} onChange={handleGroupNameChange} placeholder='Tên nhóm' className='w-[80%] py-2 px-3 rounded-md border border-slate-400'/>
						</div>
						<div className="flex items-center justify-center w-auto h-auto mt-5">
							<select id="privacy" name="privacy" className="w-[80%] py-2 px-3 rounded-md border border-slate-400"
								onChange={handleChangePrivacy} value={valuePrivacy}>
								<option value="" className='hidden' selected disabled>Chọn quyền riêng tư</option>
								<option value="public">Công khai</option>
								<option value="private">Riêng tư</option>
							</select>
						</div>
						{errorInput && (
							<div className='w-full h-auto flex justify-center items-center py-1 mt-1'> 
								<p className='text-sm text-red-600'>{errorInput}</p>
							</div>
						)}
						<div className='flex items-center justify-center w-auto h-auto mt-5'>
							<p className='text-white bg-slate-500 hover:bg-slate-600 px-5 py-2 rounded-md cursor-pointer'
								onClick={handleCreateGroup}>Tạo nhóm</p>
						</div>
					</div>
					<div className='absolute top-0 right-0 mt-2 mr-3 text-3xl hover:bg-slate-50 
                     w-12 h-12 bg-slate-300 flex items-center justify-center rounded-full cursor-pointer' onClick={handleOpenCreateGroup}>
						<button>
							<IoMdClose/>
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default Sidebar_groupPage