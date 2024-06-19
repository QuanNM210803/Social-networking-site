import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import RegisterPage from '../pages/RegisterPage'
import CheckEmailPage from '../pages/CheckEmailPage'
import CheckPasswordPage from '../pages/CheckPasswordPage'
import Home from '../pages/chat/Home'
import MessagePage from '../components/chat/message/MessagePage'
import AuthLayouts from '../layout/AuthLayouts'
import ForgotPassword from '../pages/ForgotPassword'
import HomePage from '../pages/news_feed/HomePage'
import FriendRequest from '../pages/news_feed/FriendRequest'
import VideoPage from '../pages/news_feed/VideoPage'
import GroupPage from '../pages/news_feed/GroupPage'
import GamePage from '../pages/news_feed/GamePage'
import ProfileUserPage from '../pages/news_feed/ProfileUserPage'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App/>,
		children:[
			{
				path:'register',
				element: <AuthLayouts> <RegisterPage/> </AuthLayouts>
			},
			{
				path:'email',
				element: <AuthLayouts> <CheckEmailPage/> </AuthLayouts>
			},
			{
				path:'password',
				element: <AuthLayouts> <CheckPasswordPage/> </AuthLayouts>
			},
			{
				path:'forgot-password',
				element: <AuthLayouts> <ForgotPassword/> </AuthLayouts>
			},
			{
				path:'chat',
				element: <Home/>,
				children:[
					{
						path:':userId',
						element: <MessagePage/>
					}
				]
			},
			{
				path:'home',
				element: <HomePage/>
			},
			{
				path: 'friend-request',
				element: <FriendRequest/>
			},
			{
				path: 'video',
				element: <VideoPage/>
			},
			{
				path: 'groups',
				element: <GroupPage/>
			},
			{
				path: 'games',
				element: <GamePage/>
			},
			{
				path: 'profileUser/:userId',
				element: <ProfileUserPage/>
			}
		]
	}
])

export default router