/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { MdEmail } from 'react-icons/md'
import { MdPhoneAndroid } from 'react-icons/md'
import { FaBirthdayCake } from 'react-icons/fa'
import { PiMapPinAreaFill } from 'react-icons/pi'
import { getUserById } from '../../../../apis/UserApi'

const IntroductionUser = ({ objectId }) => {
	const [userInformation, setUserInformation]=useState({})
	useEffect(() => {
		getUserById(objectId).then((data) => {
			setUserInformation(data?.data)
		})
	}, [objectId])
	
	return (
		<div className='bg-slate-200 rounded-md h-auto'>
			<div className='flex justify-between px-3 py-2'>
				<p className='text-2xl font-bold px-3'>Giới thiệu</p>
			</div>
			<div className='px-3 py-3 w-full h-auto'>
				<div className='px-3 space-y-2 w-[450px]'>
					<div className='flex gap-2 px-1 py-1 rounded-lg bg-slate-300'>
						<div className='flex items-start'>
							<div className='flex items-center gap-1 '>
								<MdEmail size={25}/>
								<p className='font-semibold'>Email:</p>
							</div>
						</div>
						<div className='flex items-start'>
							<div className='flex items-center'>
								<p className='break-words'>{userInformation?.email}</p>
							</div>
						</div>
					</div>
					<div className='flex gap-2 px-1 py-1 rounded-lg bg-slate-300'>
						<div className='flex items-start'>
							<div className='flex items-center gap-1 '>
								<MdPhoneAndroid size={25}/>
								<p className='font-semibold'>Phone:</p>
							</div>
						</div>
						<div className='flex items-start'>
							<div className='flex items-center'>
								<p className='break-words'>{userInformation?.phone}</p>
							</div>
						</div>
					</div>
					<div className='flex gap-2 px-1 py-1 rounded-lg bg-slate-300'>
						<div className='flex items-start'>
							<div className='flex items-center gap-1 '>
								<PiMapPinAreaFill size={25}/>
								<p className='font-semibold'>Address:</p>
							</div>
						</div>
						<div className='flex items-start'>
							<div className='flex items-center'>
								<p className='break-words'>{userInformation?.address}</p>
							</div>
						</div>
					</div>
					<div className='flex gap-2 px-1 py-1 rounded-lg bg-slate-300'>
						<div className='flex items-start'>
							<div className='flex items-center gap-1 '>
								<FaBirthdayCake size={25}/>
								<p className='font-semibold'>Birthday:</p>
							</div>
						</div>
						<div className='flex items-start'>
							<div className='flex items-center'>
								<p className='break-words'>{userInformation?.birthday}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default IntroductionUser