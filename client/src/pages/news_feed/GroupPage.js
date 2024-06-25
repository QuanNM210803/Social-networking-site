/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/news_feed/navbar/Navbar'
import Sidebar_groupPage from '../../components/news_feed/sidebar/Sidebar_groupPage'
import ProfileGroup from '../../components/news_feed/DetailsObject/group/ProfileGroup'
import { useDispatch, useSelector } from 'react-redux'
import { initializeSocketConnection } from '../../socket/SocketUtils'
import { useNavigate } from 'react-router-dom'

const GroupPage = () => {
	const user=useSelector(state => state?.user)
	const navigate=useNavigate()
	const [idGroup, setIdGroup]=useState(null)
	const handleClickGroup=(id) => {
		setIdGroup(id)
	}

	const [socketConnection, setSocketConnection]=useState(null)
	const dispatch=useDispatch()
	useEffect(() => {
		if (!user?._id) {
			navigate('/email')
		}
		const socketConnection=initializeSocketConnection(dispatch)
		setSocketConnection(socketConnection)
		return () => {
			socketConnection.disconnect()
		}
	}, [dispatch])
	return (
		<div>
			<div className='sticky top-0 bg-slate-500' style={{ zIndex:1000 }}>
				<Navbar user={user}/>
			</div>
			<div className='flex top-14 left-0 right-0 bottom-0'>
				<div className='h-[calc(100vh-56px)] w-[25%] bg-slate-100'>
					<Sidebar_groupPage handleClickGroup={handleClickGroup}/>
				</div>
				{
					idGroup===null ? (
						<div className='h-[calc(100vh-56px)] w-[75%] flex justify-center items-center overflow-auto bg-slate-300'>
							<h1 className='text-2xl text-slate-400'>Chọn tên của nhóm mà bạn muốn xem trước trang thông tin.</h1>
						</div>
					):(
						<div className='h-[calc(100vh-56px)] w-[75%] overflow-auto bg-slate-300'>
							<ProfileGroup idGroup={idGroup}/>
						</div>
					)
				}
			</div>
		</div>
	)
}

export default GroupPage