/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Navbar from '../../components/news_feed/navbar/Navbar'
import Sidebar_friendPage from '../../components/news_feed/sidebar/Sidebar_friendPage'
import ProfileUser from '../../components/news_feed/DetailsObject/user/ProfileUser'

const FriendRequest = () => {
	const [idFriend, setIdFriend]=useState(null)
	const handleClickFriend=(id) => {
		setIdFriend(id)
	}
	return (
		<div>
			<div className='sticky top-0 bg-slate-500'>
				<Navbar/>
			</div>
			<div className='flex top-14 left-0 right-0 bottom-0'>
				<div className='h-[calc(100vh-56px)] w-[25%] bg-slate-100'>
					<Sidebar_friendPage handleClickFriend={handleClickFriend}/>
				</div>
				{
					idFriend===null ? (
						<div className='h-[calc(100vh-56px)] w-[80%] flex justify-center items-center overflow-auto bg-slate-300'>
							<h1 className='text-2xl text-slate-400'>Chọn tên của người mà bạn muốn xem trước trang cá nhân.</h1>
						</div>
					):(
						<div className='h-[calc(100vh-56px)] w-[80%] overflow-auto bg-slate-300'>
							<ProfileUser idFriend={idFriend} width={90}/>
						</div>
					)
				}
			</div>
		</div>
	)
}

export default FriendRequest