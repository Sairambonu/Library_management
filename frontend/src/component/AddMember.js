import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddMember =()=>{
	const [data, setData] = useState({
		email:'',
		username:'',
		role:'',
		late_fee:'',
		contact_info:{
			phone:"",
			address:""
		}
	})
	const [datas, setDatas] = useState({
		MemberData:[],
		Email:[]
	})
	const [message, setMessage] = useState('')
	const navigate  = useNavigate();

	const {email,username,role,late_fee,contact_info} = data
	const {phone,address} = contact_info
	const {MemberData,Email} = datas
	const changeHandler = (event) => {
		const { name, value } = event.target;
		  setData((prevData) => ({
		    ...prevData,
		    [name]: value,
		    contact_info: {
		      ...prevData.contact_info,
		      [name]: value,
		    },
		  }));
		};


	const submitHandler =(e)=>{
		e.preventDefault()
		axios.post('http://localhost:5000/send/member', data)
		.then((res)=>{
			if (res.status === 400) {
				setMessage(res.data)
			}else if (res.status === 200) {
			setMessage(res.data)
			setData({email:'', username:'', role:'', late_fee:'', contact_info:{phone:"", address:""}})
			// fetchDetails()
			navigate('/member')}
		})
		.catch((err)=>{
			setMessage(err.response.data)
			console.log('Error while adding data', err)
		})
	}

	const fetchDetails=()=>{
	    axios.get('http://localhost:5000/fetch/member')
	        .then((res) => {
	          const fetchedData = res.data;
	          setDatas(fetchedData); // Set the received data in the state
	        })
	        .catch((err) => {
	          console.log('Error fetching data:', err);
	        });
	}
	const back=()=>{
		navigate('/store')
	}
	useEffect(() => {
	    fetchDetails()
	}, []);
	return(
		<div className='container mt-5' style={{backgroundColor:'#E1E6E4', width:'60%'}}>
			<h1 className = 'text-center'>Add New Member</h1>
			{message &&  <p style={{ color: 'red'  }} className='m-5' >{message}</p>}
			<form onSubmit={submitHandler} className='mt-5'>
		        <div className="container">
		           	<div className="row mb-3">
		            <div className='col-md-3'></div>
		            <div className='col-md-3'>
		              <label htmlFor='email' className="form-label">Email :</label>
		            </div>
		            <div className="col-md-3">
		              <select
		                name='email'
		                value={email}
		                onChange={changeHandler}
		                className="form-select"
		                id='email'
		              >
		                <option value=''>Select Email</option>
		                {Email.map((emailOption, index) => (
		                  <option key={index} value={emailOption}>
		                    {emailOption}
		                  </option>
		                ))}
		              </select>
		            </div>
		            <div className='col-md-3 mb-3'></div>
		          	</div>

          			<div className="row mb-3">
			          <div className="col-md-3"></div>
			          <div className="col-md-3">
			            <label htmlFor="username" className="form-label">Username:</label>
			          </div>
			          <div className="col-md-3">
			            <input type='text' name='username' value={username} onChange={changeHandler} className="form-control" id="username" />
			          </div>
			          <div className="col-md-3"></div>
			        </div>

			        <div className="row mb-3">
			          <div className="col-md-3"></div>
			          <div className="col-md-3">
			            <label htmlFor="role" className="form-label">Role:</label>
			          </div>
			          <div className="col-md-3">
			            <input type='text' name='role' value={role} onChange={changeHandler} className="form-control" id="role" />
			          </div>
			          <div className="col-md-3"></div>
			        </div>

			        <div className="row mb-3">
			          <div className="col-md-3"></div>
			          <div className="col-md-3">
			            <label htmlFor="late_fee" className="form-label">Late Fee:</label>
			          </div>
			          <div className="col-md-3">
			            <input type='number' name='late_fee' value={late_fee} onChange={changeHandler} className="form-control" id="late_fee" />
			          </div>
			          <div className="col-md-3"></div>
			        </div>

			        <div className="row mb-3">
			          <div className="col-md-3"></div>
			          <div className="col-md-3">
			            <label htmlFor="phone" className="form-label">Phone No:</label>
			          </div>
			          <div className="col-md-3">
			            <input type='number' name='phone' value={phone} onChange={changeHandler} className="form-control" id="phone" />
			          </div>
			          <div className="col-md-3"></div>
			        </div>

			        <div className="row mb-3">
			          <div className="col-md-3"></div>
			          <div className="col-md-3">
			            <label htmlFor="address" className="form-label">Address:</label>
			          </div>
			          <div className="col-md-3">
			            <input type='text' name='address' value={address} onChange={changeHandler} className="form-control" id="address" />
			          </div>
			          <div className="col-md-3"></div>
			        </div>
		          <button type='button' className='btn btn-primary m-3' onClick={back}>Back</button>
		          <button type='submit' className="btn btn-primary m-3">Submit</button>
		        </div>
		    </form>
		</div>
		)
}

export default AddMember