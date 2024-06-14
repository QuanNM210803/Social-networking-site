/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React from 'react'
import NewsCard from '../../news/NewsCard'
import VideoCard from './VideoCard'

const ContentVideoPage = ({ news }) => {
	return (
		<div className='w-full flex justify-center'>
			<div className='w-[70%] h-auto space-y-3'>
				{news.length>0 ? (
					news.map((item, index) => (
						item?.content?.video.map((it, index) => (
							<VideoCard news={{
								content:{
									text: item?.content?.text,
									video: it
								},
								like: item?.like,
								comment: item?.comment,
								poster:{
									name: item?.poster?.name,
									avatar: item?.poster?.avatar
								},
								createdAt: item?.createdAt
							}}/>
						))
					))
				):(
					<div className='w-full h-20 bg-slate-200 rounded-md flex justify-center items-center'>
						<p className='text-slate-500'>Không có video nào dành cho bạn!</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default ContentVideoPage