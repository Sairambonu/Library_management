import React from 'react'
import {useAuth} from './auth'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
const Profile = ()=>{
	const auth = useAuth()
	const navigate  = useNavigate();
	const handleLogout = ()=>{
			auth.logout()
			navigate('/login');
		}
	return(
		
		<div>
			<Navbar/>
			<h2 className='mt-5'>Profile Page</h2>
			<h3>welcome {auth.user}</h3>
			<button className='btn btn-danger' onClick={handleLogout}>Logout</button>
		</div>
		)
}
export default Profile