/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React from 'react'
import { CiFileOn } from 'react-icons/ci'

const FileTab = ({ file }) => {
	return (
		<>
			{
				file.length>0 && file.map((item, index) => {
					return (
						<div>
							<div className='w-full h-12 flex items-center gap-3'>
								<div className='w-10 h-10 rounded bg-slate-50 flex items-center justify-center'>
									<CiFileOn size={25}/>
								</div>
								<div className=''>
									<p className='font-semibold text-base'>{item?.name}</p>
									<p className='text-xs'>{item?.size}</p>
								</div>
								
							</div>
							<hr className='w-full border border-gray-300 my-2'/>
						</div>
					)
				})
			}
			{
				file.length===0 && (
					<div className='flex items-center justify-center h-screen'>
						<p className='text-lg font-semibold text-gray-500'>Không có file nào</p>
					</div>
				)
			}
		</>
	)
}

export default FileTab