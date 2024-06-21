/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { FaVideo } from 'react-icons/fa'
import { IoIosCall } from 'react-icons/io'
import { FaFileImage } from 'react-icons/fa'
import { FaFileVideo } from 'react-icons/fa6'
import { IoMdSend } from 'react-icons/io'
import { useSelector } from 'react-redux'

const ChatWindow = ({ handleCloseChatWindow, friendChat }) => {
	const textareaRef = useRef(null)
	const onlineUsers=useSelector(state => state?.user?.onlineUsers)
	const handleInput = () => {
		const textarea = textareaRef.current
		textarea.style.height = 'auto'
		textarea.style.height = `${textarea.scrollHeight}px`
	}
	
	return (
		<div className='absolute w-[22%] h-[65%] bottom-0 right-16 bg-blue-200 rounded-t-lg'>
			<div className='flex items-center justify-between w-full h-[52px] bg-blue-500 rounded-t-lg px-2'>
				<div className='flex items-center gap-3 '>
					<div className='relative w-10 h-10 flex-shrink-0'>
						<img
							src={friendChat?.profile_pic}
							className='rounded-full w-full h-full object-cover'
						/>
						{onlineUsers?.includes(friendChat?._id) && <div className='absolute bottom-0 right-0 w-[9px] h-[9px] rounded-full bg-green-500'></div>}
					</div>
					<p className='font-semibold'>{friendChat?.name}</p>
				</div>
				<div className='flex items-center'>
					<button className='hover:bg-blue-300 w-7 h-7 flex items-center justify-center rounded-full p-[2px]'>
						<FaVideo size={18}/>
					</button>
					<button className='hover:bg-blue-300 w-7 h-7 flex items-center justify-center rounded-full p-[2px]'>
						<IoIosCall size={20}/>
					</button>
					<button className='hover:bg-blue-300 w-7 h-7 flex items-center justify-center rounded-full p-[2px]' onClick={handleCloseChatWindow}>
						<IoMdClose size={25}/>
					</button>
				</div>
			</div>
			<div>
            Tin nhắn hiển thị ở đây
			</div>
			<div className='absolute px-1 py-2 w-full h-auto bottom-0 flex items-end gap-1'>
				<div className=''>
					<button className='px-1 py-[6px] rounded hover:bg-blue-300'>
						<FaFileImage size={20}/>
					</button>
					<button className='px-1 py-[6px] rounded hover:bg-blue-300'>
						<FaFileVideo size={20}/>
					</button>
				</div>
				<textarea type='text'
					ref={textareaRef}
					className='flex-grow w-56 h-[34px] max-h-[200px] rounded-lg py-1 px-2 resize-none overflow-hidden'
					placeholder='Aa'
					onInput={handleInput}
				/>
				<button className='px-1 py-1 rounded-lg hover:bg-blue-300'>
					<IoMdSend size={25}/>
				</button>
			</div>
		</div>
	)
}

export default ChatWindow