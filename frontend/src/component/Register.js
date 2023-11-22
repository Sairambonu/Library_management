import React, {useState} from 'react'
import { Outlet, Link  } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const Register = ()=>{
	const [data, setData] = useState({
		email:'',
		username:'',
		password:'',
		renterPassword:'',
		message:''
	})
	const navigate  = useNavigate();
	const changeHandler = (event) => {
	   	setData({ ...data, [event.target.name]: event.target.value });
		};
	const {email,username,password,renterPassword,message} = data
	const submitHandler = (e)=>{
		e.preventDefault()
		axios.post('http://localhost:5000/register', data)
		.then((res)=>{
			setData({email:'',username:'',password:'',renterPassword:'',message: 'registered successfully'})
			navigate('/login');
		})
		.catch((err)=>{
			setData({ ...data, message: err.response?.data ?? 'An error occurred' });
			console.log(err)
		})

	}
	const LoginHandler = (e)=>{
		e.preventDefault()
		navigate('/login')
	}
	return (
		<div>
		{message &&  <p style={{ color: 'red' }}>{message}</p>}

		<div className="container row mt-5 mb-5">
        		<div className="col-md-5 col-sm-0 col-lg-5"></div>
        		<div className="col-md-5 col-sm-12 col-lg-5">
          			<div className="card px-5 py-5">
            			<div className="card-title m-0">
              				<h2 className="text-center" style={{color:'blue', fontWeight: 'bold', margin:'-10px'}}>User rgister</h2>
            			</div>
            			<div className="card-body">
              			<form onSubmit={submitHandler} className='m-5'>
                
                		<div className="form-group">
	                  		<label htmlFor="email" className="form-label"
	                  		style={{ fontWeight: 'bold', fontSize: '20px', margin: '5px', padding: '5px' }}>Email :</label>
				            <input type='email' name='email' value={email} onChange={changeHandler} className="form-control" id="email" />
			        	</div>
			        	<div className="form-group m-2">
	                  		<label htmlFor="username" className="form-label"
	                  		style={{ fontWeight: 'bold', fontSize: '20px', margin: '5px', padding: '5px' }}>Username :</label>
				            <input type='text' name='username' value={username} onChange={changeHandler} className="form-control" id="username" />
			        	</div>
                		<div className="form-groupm-2">
	                  		<label htmlFor="password" className="form-label"
	                  		style={{fontWeight: 'bold',fontSize: '20px', margin: '5px', padding: '5px'}}>Password :</label>
				            <input type='password' name='password' value={password} onChange={changeHandler} className="form-control" id="password" />
			        	</div>
			        	<div className="form-group m-2">
	                  		<label htmlFor="renterPassword" className="form-label"
	                  		style={{fontWeight: 'bold',fontSize: '20px', margin: '5px', padding: '5px'}}>RenterPassword :</label>
				            <input type='password' name='renterPassword' value={renterPassword} onChange={changeHandler} className="form-control" id="renterPassword" />
			        	</div>
                		<br/>
                		<br/>
                		<div className="form-group">
                  			<div className="row">
	                			<div className='col-sm-12 col-md-6'>
	                				<button type="submit" className="btn btn-success btn-lg text-center px-4 my-2">Register</button>
	                			</div>
	                  			<div className='col-sm-12 col-md-6'>
	                  				<button type="button" className="btn btn-success btn-lg text-center px-4 my-2"
	                  				onClick={LoginHandler}>Login</button>
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

export default Register