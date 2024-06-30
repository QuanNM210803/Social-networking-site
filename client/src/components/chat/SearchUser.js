/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import Loading from '../Loading'
import UserSearchCard from './UserSearchCard'
import { searchUserApi } from '../../apis/UserApi'
import { IoClose } from 'react-icons/io5'

const SearchUser = ({ onClose }) => {
	const [searchUser, setSearchUser]=useState([])
	const [loading, setLoading]=useState(false)
	const [search, setSearch]=useState('')
	useEffect(() => {
		setLoading(true)
		searchUserApi({ search: search==='' ? null: search }).then((data) => {
			setSearchUser(data.data)
			setLoading(false)
		})
	}, [search])

	return (
		<div className='fixed top-14 bottom-0 left-0 right-0 bg-slate-700 bg-opacity-40 p-2 z-50'>
			<div className='w-full max-w-lg mx-auto mt-14 h-[80%] overflow-auto rounded'>
				<div className='bg-slate-300 rounded-b h-14 overflow-hidden flex sticky top-0 z-50'>
					<input
						type='text'
						placeholder='Search user by email or name ...'
						className='w-full outline-none py-1 h-full px-4 bg-slate-300' 
						onChange={(e) => setSearch(e.target.value)}
						value={search}
					/>
					<div className='h-14 w-14 flex justify-center items-center'>
						<IoSearchOutline size={20}/>
					</div>
				</div>
				{
					searchUser?.length===0 && search!=='' && !loading && (
						<div className='bg-white mt-2 w-full p-4 rounded-t'>
							<p className='text-center text-slate-500'> Not user found!</p>
						</div>
					)
				}
				{
					loading && (
						<div className='bg-white mt-2 w-full p-4 rounded-t'>
							<p><Loading/></p>
						</div>
					)
				}
				{
					searchUser.length!==0 && !loading &&(
						<div className='bg-white mt-2 w-full p-4 rounded-t'>
							{searchUser.map((user, index) => {
								return (
									<UserSearchCard key={user._id} user={user} onClose={onClose}/>
								)
							})}
						</div>
					)
				}
			</div>
			<div className='absolute top-0 right-0 text-2xl mt-2 mr-2 lg:text-3xl cursor-pointer
            hover:text-slate-300 hover:bg-slate-900 bg-slate-300 rounded-full w-12 h-12 flex justify-center items-center'>
				<button onClick={onClose}>
					<IoClose/>
				</button>
			</div>
		</div>
	)
}

export default SearchUser