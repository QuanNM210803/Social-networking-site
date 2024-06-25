/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { getListFriend } from '../../../../apis/UserApi'
import { useSelector } from 'react-redux'
import { RiVerifiedBadgeFill } from 'react-icons/ri'
import DetailsMutualFriend from '../DetailsMutualFriend'

const FriendUser = ({ objectId }) => {
	const user=useSelector(state => state?.user)
	const [friends, setFriends]=useState([])
	const [search, setSearch]=useState('')
	useEffect(() => {
		getListFriend(objectId, search).then((data) => {
			setFriends(data?.data)
		})
	}, [search, objectId])
	const [isOpenDetailsMutualFriend, setIsOpenDetailsMutualFriend]=useState(false)
	const [mutualFriendWith, setMutualFriendWith]=useState({})
	const handleOpenDetailsMutualFriend=(friend) => {
		setMutualFriendWith(friend)
		setIsOpenDetailsMutualFriend(!isOpenDetailsMutualFriend)
	}

	return (
		<div className='bg-slate-200 rounded-md h-auto'>
			<div className='flex justify-between px-3 py-2'>
				<div className='flex items-center gap-7'>
					<p className='text-2xl font-bold px-3'>Bạn bè</p>
					<p>{friends?.length} nguời bạn</p>
				</div>
				<div className='flex items-center bg-slate-300 px-1 rounded-md'>
					<IoIosSearch size={20}/>
					<input
						type='text'
						name='search'
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder='Tìm kiếm bạn bè'
						className='px-2 py-1 w-[200px] bg-slate-300 outline-none'
					/>
				</div>
			</div>
			{friends?.length>0 ? (
				<div className='grid grid-flow-row grid-cols-3 gap-2 py-2 px-3'>
					{
						friends.map((friend, index) => (
							<div className='flex gap-3 hover:bg-slate-100 px-3 py-2 rounded-md border-slate-300 border'>
								<button onClick={() => window.location.href = `/profileUser/${friend?._id}`} className='flex-shrink-0'>
									<img
										src={friend?.profile_pic}
										className='rounded-lg cursor-pointer w-16 h-16 object-cover'
									/>
								</button>
								<div className='w-full h-full flex items-center'>
									<div className='w-auto h-auto'>
										<div className='flex items-center gap-1'>
											<button onClick={() => window.location.href = `/profileUser/${friend?._id}`} 
												className='text-sm font-semibold cursor-pointer hover:underline'>
												{friend?.name}
											</button>
											{friend?._id===user?._id && <RiVerifiedBadgeFill className='text-blue-600'/>}
										</div>
										{friend?._id!==user?._id && <p className='text-sm cursor-pointer hover:underline'
											onClick={() => handleOpenDetailsMutualFriend(friend)}>{friend?.mutualFriends?.length} bạn chung</p>}
									</div>
								</div>
								{objectId===user?._id && (
									<div className='flex items-center justify-end w-[100px] '>
										<div className='flex flex-col w-full'>
											<p className='w-full px-2 py-1'>{friend?.createdAt}</p>
											<button className='bg-slate-300 rounded px-2 py-1 hover:bg-red-500 hover:text-white'>
                                    Unfriend
											</button>
										</div>
									</div>
								)}
							</div>
						))
					}
				</div>
			):(
				<div className='w-full h-20 flex justify-center items-center'>
					<p className='text-slate-500 text-lg'>Không có bạn bè nào.</p>
				</div>
			)}
			{
				isOpenDetailsMutualFriend && <DetailsMutualFriend
					setIsOpenDetailsMutualFriend={setIsOpenDetailsMutualFriend} 
					mutualFriendWith={mutualFriendWith}/>
			}
		</div>
	)
}

export default FriendUser