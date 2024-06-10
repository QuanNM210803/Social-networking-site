/* eslint-disable no-unused-vars */
import React from 'react'
import Navbar from '../../components/news_feed/navbar/Navbar.js'
import ProfileUser from '../../components/news_feed/DetailsObject/user/ProfileUser.js'
import { useParams } from 'react-router-dom'

const ProfileUserPage = () => {
	const { userId }=useParams()
	return (
		<div>
			<div className='sticky top-0 bg-slate-500'>
				<Navbar/>
			</div>
			<div className='flex top-14 left-0 right-0 bottom-0'>
				<div className='h-[calc(100vh-56px)] overflow-auto bg-slate-300 w-full'>
					<ProfileUser idFriend={userId} width={75}/>
				</div>
			</div>
		</div>
	)
}

export default ProfileUserPage