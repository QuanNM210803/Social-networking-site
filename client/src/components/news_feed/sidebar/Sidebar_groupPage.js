/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { MdGroups } from 'react-icons/md'
import { FaAngleRight } from 'react-icons/fa6'
import { FaArrowLeft } from 'react-icons/fa6'
import { IoAddOutline } from 'react-icons/io5'
import { IoMdClose } from 'react-icons/io'
import { createGroup, getGroupByUserId } from '../../../apis/GroupApi'
import { useSelector } from 'react-redux'

const Sidebar_groupPage = ({ handleClickGroup }) => {
	const user=useSelector(state => state?.user)
	const [option, setOption]=useState(null)
	const [onOpenCreateGroup, setOnOpenCreateGroup]=useState(false)

	const [profile_pic, setProfile_pic]=useState('https://res.cloudinary.com/daygzzzwz/image/upload/v1719383894/chat-app-file/caj3g7ohm42ghm3ffkmu.jpg')
	const [cover_pic, setCover_pic]=useState('https://res.cloudinary.com/daygzzzwz/image/upload/v1719383900/chat-app-file/xufmmzamzwem5wthrtpr.png')
	const [valuePrivacy, setValuePrivacy]=useState('')
	const [groupNameCreate, setGroupNameCreate]=useState('')

	const [errorInput, setErrorInput]=useState('')
   
	const [groups, setGroups]=useState([])
	const [groupsShow, setGroupsShow]=useState([])
	const [search, setSearch]=useState('')

	useEffect(() => {
		getGroupByUserId(user?._id).then(data => {
			setGroups(data?.data)
			setGroupsShow(data?.data)
		})
	}, [user])

	useEffect(() => {
		if (search==='') {
			setGroupsShow(groups)
		} else {
			const newGroups = groups.filter(group => group?.name?.toLowerCase().includes(search?.toLowerCase()))
			setGroupsShow(newGroups)
		}
	}, [search])

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
	const handleCreateGroup=async () => {
		if (groupNameCreate==='' || valuePrivacy==='') {
			setErrorInput('Vui lòng điền đầy đủ thông tin')
		} else {
			setErrorInput('')
			console.log('Tạo nhóm thành công', { groupNameCreate, valuePrivacy })
			await createGroup({ name:groupNameCreate, privacy:valuePrivacy, profile_pic, cover_pic })
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
		<div className='h-full'>
			<div className='px-3 py-2 bg-slate-300 flex justify-between items-center'>
				<p className='font-bold lg:text-2xl text-xl text-slate-800'>Nhóm</p>
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
						<input 
							type='text' 
							name='search'
							value={search}
							onChange={(e) => setSearch(e?.target?.value)}
							placeholder='Tìm kiếm nhóm của bạn' 
							className='w-full h-8 px-3 bg-slate-200 rounded-md'/>
					</div>
					{
						groupsShow?.length===0 ? (
							<div className='py-5 px-5'>
								<p className='text-center text-slate-500 xl:text-lg text-[15px]'>Bạn chưa tham gia vào bất kì nhóm nào</p>
							</div>
						):(
							<div className='p-3 space-y-2 h-auto'>
								<div className='w-full space-y-3'>
									{
										groupsShow?.map((group, index) => (
											<div className='flex gap-3 py-1 px-2 hover:bg-slate-200 rounded-md'>
												<div className='flex-shrink-0'>
													<img
														src={group?.profile_pic}
														className='rounded-lg cursor-pointer xl:w-14 xl:h-14 lg:w-10 lg:h-10 w-8 h-8 object-cover'
														onClick={() => handleClickGroup(group?._id)}
													/>
												</div>
												<div className='w-full h-auto'>
													<p className='xl:text-lg lg:text-[15px] text-[13px] font-semibold cursor-pointer hover:underline'
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
				<div className='fixed top-14 bottom-0 left-0 right-0 z-50 bg-gray-700 bg-opacity-70
                  flex justify-center items-center'>
					<div className='bg-slate-300 w-[500px] h-auto max-h-[80%] rounded-md py-2 overflow-auto'>
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
                     w-11 h-11 bg-slate-300 flex items-center justify-center rounded-full cursor-pointer' onClick={handleOpenCreateGroup}>
						<button>
							<IoMdClose size={30}/>
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default Sidebar_groupPage