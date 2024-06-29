/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React from 'react'
import { FaLink } from 'react-icons/fa'

const LinkTab = ({ link }) => {
	return (
		<>
			{
				link.length>0 && link.map((item, index) => {
					return (
						<div>
							<div className='w-full h-12 flex items-center gap-3 cursor-pointer hover:bg-slate-100 rounded p-1'
								onClick={() => window.open(item?.url, '_blank')}
							>
								<div className='w-10 h-10 rounded bg-slate-50 flex items-center justify-center flex-shrink-0'>
									<FaLink size={20}/>
								</div>
								<div className='flex-grow overflow-hidden'>
									<p className='font-semibold text-base truncate'>{item?.url}</p>
								</div>
								
							</div>
							<hr className='w-full border border-gray-300 my-2'/>
						</div>
					)
				})
			}
			{
				link.length===0 && (
					<div className='flex items-center justify-center h-screen'>
						<p className='text-lg font-semibold text-gray-500 text-center'>Không có liên kết nào</p>
					</div>
				)
			}
		</>
	)
}

export default LinkTab