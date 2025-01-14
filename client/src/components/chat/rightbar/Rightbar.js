/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Avatar from '../../Avatar'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { RiArrowDropUpLine } from 'react-icons/ri'
import { AiFillPicture } from 'react-icons/ai'
import { FaFile } from 'react-icons/fa'
import { FaLink } from 'react-icons/fa'
import { MdOutlineEmail } from 'react-icons/md'
import ShowFile from './ShowFile'
import { Link } from 'react-router-dom'

const Rightbar = ({ receiver, socketConnection }) => {
	const user=useSelector(state => state?.user)
	const [isOpenFile, setIsOpenFile]=useState(false)
	const [isOpenPrivate, setIsOpenPrivate]=useState(false)
	const [isOpenCustomize, setIsOpenCustomize]=useState(false)
	const [showFile, setShowFile]=useState(false)
	const [content, setContent]=useState('')
	const toggleDropdownFile=() => {
		setIsOpenFile(!isOpenFile)
	}
	const toggleDropdownPrivate=() => {
		setIsOpenPrivate(!isOpenPrivate)
	}
	const toggleDropdownCustomize=() => {
		setIsOpenCustomize(!isOpenCustomize)
	}
	const handleShowFile=(content) => {
		setContent(content)
		setShowFile(!showFile)
	}
	return (
		<div className=''>
			{!showFile && (
				<div className='w-full h-full bg-slate-200 overflow-auto'>
					<Link to={`/profileUser/${receiver?._id}`} className='flex items-center justify-center mt-8'>
						<Avatar
							imageUrl={receiver?.profile_pic}
							name={receiver?.name}
							width={90}
							height={90}
							userId={receiver?._id}
						/>
					</Link>
					<div className='text-base mt-4 flex justify-center items-center gap-2'>
						<MdOutlineEmail/>
						<p className='font-semibold mb-1'>{receiver?.email}</p>
					</div>
					<p className='font-bold flex justify-center text-xl mt-0 text-center'>{receiver?.name}</p>

					<div className="bg-slate-200 py-1 px-1 h-auto w-full mt-[10%]">
						<div className='bg-slate-200 w-full h-auto py-1 font-semibold'>
							<div onClick={toggleDropdownFile} className='flex items-center justify-between px-2 rounded hover:bg-slate-100 cursor-pointer'>
								<p className='text-base'>
                           File phương tiện, file và liên kết
								</p>
								<button className=''>
									{!isOpenFile && <RiArrowDropDownLine size={35}/>}
									{isOpenFile && <RiArrowDropUpLine size={35}/>}
								</button>
							</div>
							{
								isOpenFile && (
									<div className='mt-2 space-y-1 h-auto'>
										<div onClick={() => handleShowFile('media')} className='rounded hover:bg-slate-100 cursor-pointer py-1 px-2'>
											<button className='flex gap-2 items-center'>
												<AiFillPicture size={20}/>
												<span>File phương tiện</span>
											</button>
										</div>
										<div onClick={() => handleShowFile('file')} className='rounded hover:bg-slate-100 cursor-pointer py-1 px-2'>
											<button className='flex gap-2 items-center'>
												<FaFile size={20}/>
												<span>File</span>
											</button>
										</div>
										<div onClick={() => handleShowFile('link')} className='rounded hover:bg-slate-100 cursor-pointer py-1 px-2'>
											<button className='flex gap-2 items-center'>
												<FaLink size={20}/>
												<span>Liên kết</span>
											</button>
										</div>
									</div>
								) 
							}
						</div>

					</div>
				</div>)}
			{
				showFile && (
					<ShowFile handleShowFile={handleShowFile} content={content} socketConnection={socketConnection}/>
				)
			}
		</div>
	)
}

export default Rightbar