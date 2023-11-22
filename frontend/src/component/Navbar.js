import React from 'react'
import {useAuth} from './auth'
import { useNavigate, useLocation} from 'react-router-dom';
import { Outlet, Link } from "react-router-dom";
const Navbar = ()=>{
	const auth = useAuth()
  	const navigate  = useNavigate();
  	const location = useLocation();
  	const handleLogout =()=>{
	  auth.login()
	  navigate('/')
	}
	return(
		<div>
		<div className="container mx-3">
		<nav className="navbar navbar-expand-md fixed-top" style={{ backgroundColor: '#1974D2' }}>
		      <span className="navbar-brand text-white mx-3">Library</span>
		      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#non">
		        collapse
		      </button>
		      <div className="collapse navbar-collapse" id='non'>
		        <ul className="navbar-nav ms-auto d-flex flex-row">
		          <li className={`nav-item ${location.pathname === '/book' ? 'd-none' : ''}`}>
		            	<Link className="nav-link text-white" style={{ borderRadius: '8px', border: '2px solid white' }}
		            to="/book">Book</Link>
		          </li>
		          <li className="nav-item mx-1">
		          	<Link className="nav-link text-white" style={{ borderRadius: '8px', border: '2px solid white' }}
		          	to="/location">Location</Link>
		          </li>
		          
		          <li className="nav-item mx-1">
		            <Link className="nav-link text-white" style={{ borderRadius: '8px', border: '2px solid white' }}
		            to="/store">Store</Link>
		          </li>
		          <li className="nav-item mx-1">
		            <Link className="nav-link text-white" style={{ borderRadius: '8px', border: '2px solid white' }}
		            to="/profile">Profile</Link>
		          </li>
		          {!auth.user ?(
		            <li className="nav-item mx-1">
		              <Link className="nav-link text-white" style={{ borderRadius: '8px', border: '2px solid white' }}
						to="/login">Login</Link>
		            </li>
		            )
		          :(
		            <li className="nav-item mx-1">
		              <button className='btn p-2 text-white' style={{ borderRadius: '8px', border: '2px solid white' }}
		              onClick={handleLogout}>Logout</button>
		            </li>
		            )
		        }
		        </ul>
		      </div>
		    </nav>
			<Outlet/>
			</div>
		</div>
		)
}
export default Navbar