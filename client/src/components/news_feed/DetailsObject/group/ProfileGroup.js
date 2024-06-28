/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-undef */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Tab from '../../../chat/rightbar/Tab'
import Images from '../Images'
import Videos from '../Videos'
import IntroductionGroup from './IntroductionGroup'
import MemberGroup from './MemberGroup'
import PostsGroup from './PostsGroup'
import { getGroupById, outGroup, requestJoinGroup } from '../../../../apis/GroupApi'
import { useSelector } from 'react-redux'
import EditGroupDetails from './EditGroupDetails'
import PendingMembers from './PendingMembers'

const ProfileGroup = ({ idGroup, news, loading, handleLikePost, handleCommentPost, socketConnection }) => {
	const user=useSelector(state => state?.user)
	const [activeTab, setActiveTab] =useState('Bài viết')
	const [group, setGroup] = useState({})
	useEffect(() => {
		getGroupById(idGroup).then((data) => {
			setGroup(data?.data)
		})
	}, [idGroup])

	const handleOnclickMembers=() => {
		setActiveTab('Thành viên')
	}

	const [showEditGroup, setShowEditGroup]=useState(false)
	const handleShowEditGroup=() => {
		setShowEditGroup(!showEditGroup)
	}

	const handleRequestJoinGroup=async (join) => {
		await requestJoinGroup({ groupId:idGroup }).then((data) => {
			if (join===true) {
				socketConnection.emit('request-join-group', { request:user?._id, groupId:idGroup })
			}
			if (data?.request) {
				setGroup({
					...group,
					pending_members:[...group?.pending_members, { _id:user?._id, name:user?.name, profile_pic:user?.profile_pic }]
				})
			} else {
				setGroup({
					...group,
					pending_members:group?.pending_members?.filter(member => member?._id?.toString()!==user?._id.toString())
				})
			}
		})
	}

	const handleOutGroup=async() => {
		await outGroup({ groupId:idGroup }).then((data) => {
			if (data?.success) {
				window.location.reload()
			}
		})
	}

	return (
		<div className='w-full h-auto'>
			<div className='relative w-full h-[500px] bg-slate-200'>
				<div className='flex justify-center rounded-b-md'>
					<img
						src={group?.cover_pic}
						className={'w-[80%] h-[350px] object-cover rounded-b-md'}
					/>
				</div>
				<div className='flex justify-center w-full h-auto absolute top-[60%]'>
					<div className={'h-auto w-[80%] flex justify-between'}>
						<div className='flex gap-5'>
							<div className='ml-10'>
								<img
									src={group?.profile_pic}
									className='w-[180px] h-[180px] object-cover rounded-full border-4 border-slate-300'
								/>
							</div>
							{
								(group?.privacy==='public' || group?.members?.some(member => member?._id.toString()===user?._id.toString())) ? (
									<div className='items-center mt-16'>
										<div className='flex items-end gap-4'>
											<p className='font-bold text-3xl'>{group?.name}</p>
											<p>{group?.privacy==='private' ? '(Riêng tư)':'(Công khai)'}</p>
										</div>
										<p onClick={() => handleOnclickMembers()} className='cursor-pointer'>{group?.members?.length} thành viên</p>
									</div>
								):(
									<div className='items-center mt-16'>
										<p className='font-bold text-3xl'>{group?.name}</p>
										<p>Tham gia nhóm ngay</p>
									</div>
								)
							}
						</div>
						{
							(group?.admin && group?.admin?.some((ad) => ad?._id===user?._id)) ? (
								<div className='mt-16 mr-10 flex items-end gap-2'>
									<button className='bg-slate-400 text-white hover:bg-slate-600 rounded-md px-3 py-1'
										onClick={() => handleShowEditGroup()}>
                              Chỉnh sửa thông tin nhóm
									</button>
								</div>
							):(
								group?.members?.some(member => member?._id.toString()===user?._id.toString()) ? (
									<div className='mt-16 mr-10 flex items-end gap-2'>
										<button className='bg-slate-400 text-white hover:bg-slate-600 rounded-md px-3 py-1'
											onClick={() => handleOutGroup()}>
                                 Rời nhóm
										</button>
									</div>
								):(
									group?.pending_members?.some(member => member?._id?.toString()===user?._id) ? (
										<div className='mt-16 mr-10 flex items-end gap-2'>
											<button className='bg-slate-400 text-white hover:bg-slate-600 rounded-md px-3 py-1'
												onClick={() => handleRequestJoinGroup(false)}>
                                    Hủy yêu cầu tham gia
											</button>
										</div>
									):(
										<div className='mt-16 mr-10 flex items-end gap-2'>
											<button className='bg-blue-600 text-white hover:bg-blue-800 rounded-md px-3 py-1'
												onClick={() => handleRequestJoinGroup(true)}>
                                    Tham gia nhóm
											</button>
										</div>
									)
								)
							)
						}
					</div>
				</div>
			</div>
			<div className='flex justify-center bg-slate-200'>
				<hr className={'w-[80%] border-slate-300'}/>
			</div>
			<div className='flex justify-center bg-slate-200'>
				<div className={'w-[80%] px-1 py-3 flex items-center gap-1'}>
					<Tab label="Bài viết" isActive={activeTab === 'Bài viết'} onClick={() => setActiveTab('Bài viết')}/>
					<Tab label="Giới thiệu" isActive={activeTab === 'Giới thiệu'} onClick={() => setActiveTab('Giới thiệu')}/>
					<Tab label="Thành viên" isActive={activeTab === 'Thành viên'} onClick={() => setActiveTab('Thành viên')}/>
					<Tab label="Ảnh" isActive={activeTab === 'Ảnh'} onClick={() => setActiveTab('Ảnh')}/>
					<Tab label="Video" isActive={activeTab === 'Video'} onClick={() => setActiveTab('Video')}/>
					{
						group?.admin?.some((ad) => ad?._id===user?._id) && (
							<Tab label="Duyệt thành viên" isActive={activeTab === 'Duyệt thành viên'} onClick={() => setActiveTab('Duyệt thành viên')}/>
						)
					}
				</div>
			</div>
			<div className='flex justify-center'>
				<div className={'w-[80%] h-auto py-5'}>
					{
						group?.privacy==='public' || group?.members?.some(member => member?._id.toString()===user?._id.toString()) ? (
							<>
								{activeTab==='Bài viết' && (
									<PostsGroup objectId={group?._id} news={news} loading={loading} handleLikePost={handleLikePost} handleCommentPost={handleCommentPost}/>
								)}
								{activeTab==='Giới thiệu' && (
									<IntroductionGroup objectId={group?._id}/>
								)}
								{activeTab==='Thành viên' && (
									<MemberGroup objectId={group?._id}/>
								)}
								{activeTab==='Ảnh' && (
									<Images objectId={group?._id} typeObject={'group'}/>
								)}
								{activeTab==='Video' && (
									<Videos objectId={group?._id} typeObject={'group'}/>
								)}
								{
									group?.admin?.some((ad) => ad?._id===user?._id) && (
										activeTab==='Duyệt thành viên' && <PendingMembers objectId={group?._id} socketConnection={socketConnection}/>
									)
								}
							</>
						):(
							<div className='bg-white mt-2 w-full p-4 rounded'>
								<p className='text-center text-slate-500'> Nhóm này là nhóm riêng tư, bạn cần tham gia nhóm để xem nội dung!</p>
							</div>
						)
					}
				</div>
			</div>
			{
				showEditGroup && (
					<EditGroupDetails onClose={handleShowEditGroup} objectId={idGroup}/>
				)
			}
		</div>
	)
}

export default ProfileGroup