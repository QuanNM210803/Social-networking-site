/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { getUserById } from '../../../apis/UserApi'
import { Link } from 'react-router-dom'

const DetailsMutualFriend = ({ setIsOpenDetailsMutualFriend, mutualFriendWith }) => {
	const [listMutualFriends, setListMutualFriends]=useState([])
	useEffect(() => {
		if (mutualFriendWith?.mutualFriends?.length>0) {
			const fetchPromises=mutualFriendWith?.mutualFriends?.map((mutualFriend) => getUserById(mutualFriend))
			Promise.all(fetchPromises)
				.then((data) => {
					const fetchedMutualFriends=data.map((item) => item?.data)
					setListMutualFriends(fetchedMutualFriends)
				})
				.catch((error) => {
					console.error('Error fetching data:', error)
				})
		}
	}, [mutualFriendWith])
	return (
		<div className='fixed top-14 left-0 right-0 bottom-0 bg-gray-700 bg-opacity-70
       z-50 flex justify-center items-center'>
			<div className='w-[30%] h-auto rounded bg-slate-200'>
				<div className='flex items-center justify-center relative py-2'>
					<p className='font-bold text-lg'>Bạn chung với {mutualFriendWith?.name}</p>
					<IoCloseOutline size={30} className='absolute right-2 cursor-pointer hover:bg-slate-300 rounded-full'
						onClick={() => setIsOpenDetailsMutualFriend(false)}/>
				</div>
				<div className='flex justify-center items-center w-full py-1 px-5'>
					<hr className='border-[1px] border-slate-300 w-full'/>
				</div>
				<div className='w-full h-auto max-h-[450px] overflow-auto py-1 px-2 mb-1'>
					{
						listMutualFriends?.length>0 && listMutualFriends.map((item, index) => (
							<Link to={`/profileUser/${item?._id}`} key={index} className='flex items-center gap-3 py-2 px-5 hover:bg-slate-50 rounded-md cursor-pointer'>
								<img
									src={item?.profile_pic}
									alt='profile'
									className='rounded-full object-cover w-12 h-12'
								/>
								<p className='text-nomal font-semibold'>{item?.name}</p>
							</Link>
						))
					}
					{
						listMutualFriends?.length===0 && (
							<div className='w-full h-20 flex justify-center items-center'>
								<p>Không có bạn chung nào!</p>
							</div>
						)
					}
				</div>
			</div>
		</div>
	)
}

export default DetailsMutualFriend