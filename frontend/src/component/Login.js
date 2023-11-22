import React, {useState} from 'react'
import { Outlet, Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';
import {useAuth} from './auth'
const Login = ()=>{
	const [data, setData] = useState({
		email:'',
		password:'',
		message:''
	})
	const changeHandler = (event) => {
	   	setData({ ...data, [event.target.name]: event.target.value });
		};
	const {email,password,message} = data
	const auth = useAuth()
	const navigate  = useNavigate();
	const location = useLocation()

	const redirectPath = location.state?.path || '/location'
	const submitHandler = (e) =>{
		e.preventDefault()
		axios.post('http://localhost:5000/login', data)
		.then((res)=>{
			auth.login(email)
			setData({email:'',password:''})
			
			navigate(redirectPath, {replace:true});
		})
		.catch((err)=>{
			setData({ ...data, message: err.response.data });
			console.log(err)
		})
	}
	const RegisterHandler = (e)=>{
		e.preventDefault()
		navigate('/register')
	}
	return (
		<div>
			{message &&  <p style={{ color: 'red' }}>{message}</p>}
			
			<div className="container row mt-5 mb-5">
        		<div className="col-md-5 col-sm-0 col-lg-5"></div>
        		<div className="col-md-5 col-sm-12 col-lg-5">
          			<div className="card px-5 py-5">
            			<div className="card-title">
              				<h2 className="text-center" style={{color:'blue', fontWeight: 'bold'}}>User Login</h2>
            			</div>
            			<div className="card-body">
              			<form onSubmit={submitHandler} className='m-5'>
                
                		<div className="form-group">
	                  		<label htmlFor="email" className="form-label"
	                  		style={{ fontWeight: 'bold', fontSize: '20px', margin: '5px', padding: '5px' }}>Email :</label>
				            <input type='email' name='email' value={email} onChange={changeHandler} className="form-control" id="email" />
			        	</div>
                		<div className="form-group">
	                  		<label htmlFor="password" className="form-label"
	                  		style={{fontWeight: 'bold',fontSize: '20px', margin: '5px', padding: '5px'}}>password :</label>
				            <input type='password' name='password' value={password} onChange={changeHandler} className="form-control" id="password" />
			        	</div>
                		<br/>
                		<br/>
                		<div className="form-group">
                		<div className="row">
                			<div className='col-sm-12 col-md-6'>
                				<button type="submit" className="btn btn-success btn-lg text-center px-4 my-2">Log In</button>
                			</div>
                  			<div className='col-sm-12 col-md-6'>
                  				<button type="button" className="btn btn-success btn-lg text-center px-4 my-2"
                  				onClick={RegisterHandler}>Register</button>
                  			</div>
                		</div>
                		</div>
              			</form>
              			</div>
          			</div>
        		</div>
        		<br/>
    		</div>
		</div>
		)
}

export default Login