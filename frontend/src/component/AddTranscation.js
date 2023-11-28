import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddTranscation =()=>{
	const [data, setData] = useState({
		user_id:'',
		books:'',
		checkin:'',
		checkout:''
	})
	const [datas, setDatas] = useState({
		trans:[],
		user_idss:[]
	})
	const [message, setMessage] = useState('')
	const {user_id,books,checkin,checkout} = data
	const {trans,user_idss} = datas
	const navigate = useNavigate()

	const changeHandler = (event) => {
	    setData({ ...data, [event.target.name]: event.target.value });
	};
	
	const submitHandler = (e) => {
	e.preventDefault();
	axios.post('http://localhost:5000/send/transcation', data)
	    .then((res) => {

	      if (res.status === 400) {
	        setMessage(res.data); // Set the error message in the state
	      } else if (res.status === 200) {
	        setData({ user_id: '', books: '', checkin: '', checkout:'',
	          book_name:''});
	        setMessage('Data added successfully')
	        fetchDetails()
	        navigate('/transcation')
	      }
	    })
	    .catch((err) => {
	      console.log(err.response.data)
	      setMessage(err.response.data);
	      console.log(err);
	    });
	};

	const fetchDetails=()=>{
	    axios.get('http://localhost:5000/fetch/transcation')
	        .then((res) => {
	          const fetchedData = res.data;
	          setDatas(fetchedData); // Set the received data in the state
	        })
	        .catch((err) => {
	          console.log('Error fetching data:', err);
	        });
	}
	const back=()=>{
		navigate('/transcation')
	}

	useEffect(()=>{
		fetchDetails()
	},[])
	return(
		<div className='container mt-5' style={{backgroundColor:'#E1E6E4', width:'60%'}}>
			<h1 className = 'text-center'>Add New Store</h1>
			{message &&  <p style={{ color: 'red'  }} className='m-5' >{message}</p>}
			<form onSubmit={submitHandler} className='mt-5'>

		        <div className="row mb-3">
		          <div className="col-md-3"></div>
		          <div className="col-md-3">
		            <label htmlFor="user_id" className="form-label">User_id:</label>
		          </div>
		          <div className="col-md-3">
		            <select name='user_id' value={user_id} onChange={changeHandler} className="form-control" id="user_id">
		              <option disabled value="">Select User ID </option>
		              {user_idss.map((user, index) => (
		                <option key={index} value={user}>
		                  {user}
		                </option>
		              ))}
		            </select>
		          </div>
		          <div className="col-md-3"></div>
		        </div>

		        

		        <div className="row mb-3">
		          <div className="col-md-3"></div>
		          <div className="col-md-3">
		            <label htmlFor="books" className="form-label">Books :</label>
		          </div>
		          <div className="col-md-3">
		            <input type='text' name='books' value={books} onChange={changeHandler} className="form-control" id="books" />
		          </div>
		          <div className="col-md-3"></div>
		        </div>

		        <div className="row mb-3">
		          <div className="col-md-3"></div>
		          <div className="col-md-3">
		            <label htmlFor="checkin" className="form-label">Checkin:</label>
		          </div>
		          <div className="col-md-3">
		            <input type='text' name='checkin' value={checkin} onChange={changeHandler} className="form-control" id="checkin" />
		          </div>
		          <div className="col-md-3"></div>
		        </div>

		        <div className="row mb-3">
		          <div className="col-md-3"></div>
		          <div className="col-md-3">
		            <label htmlFor="checkout" className="form-label">Checkout:</label>
		          </div>
		          <div className="col-md-3">
		            <input type='text' name='checkout' value={checkout} onChange={changeHandler} className="form-control" id="checkout" />
		          </div>
		          <div className="col-md-3"></div>
		        </div>
		        <button type='button' className='btn btn-primary m-3' onClick={back}>Back</button>
		        <button type='submit' className='btn btn-primary m-3'>Submit</button>
		        
		    </form>
		</div>
		)
}

export default AddTranscation