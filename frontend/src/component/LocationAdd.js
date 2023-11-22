import React, {useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const LocationAdd =()=>{
	const [data, setData] = useState({
    location_id: '',
    names: '',
    address: '',
    message:''
  	});

	const changeHandler = (event) => {
	    setData({ ...data, [event.target.name]: event.target.value });
	  };

	const { location_id, names, address, message } = data;
	const navigate  = useNavigate();

	const submitHandler = (e) => {
	  e.preventDefault();
	  console.log(data)
	  axios.post('http://localhost:5000/send', data)
	    .then((res) => {
	      console.log(data)
	      // Check for the specific status code indicating the conflict (400)
	      if (res.status === 400) {
	        console.log(res.status)
	        setData({ ...data, message: res.data }); // Set the error message in the state
	      } else if (res.status === 200) {
	        setData({ location_id: '',names: '',address: '', message: 'Data added successfully' });
	        navigate('/location')
	      }
	    })
	    .catch((err) => {
	      setData({ ...data, message: err.response.data }); // Set the error message in the state
	      console.log(err);
	    });
	};
	const back=()=>{
		navigate('/location')
	}
	const formFields = [
	    { label: 'Location ID', name: 'location_id', type: 'number' },
	    { label: 'Name', name: 'names', type: 'text' },
	    { label: 'Address', name: 'address', type: 'text' },
	    
	];

	
	return(
		<div className='container mt-5' style={{backgroundColor:'#E1E6E4', width:'60%'}}>
			<h1 className = 'text-center'>Add New Location</h1>
			{message &&  <p style={{ color: 'red'  }} className='m-5' >{message}</p>}
			<form onSubmit={submitHandler} className='m-5'>
		      	<div className="container">
		          	{formFields.map((field, index) => (
		            	<div className="row mb-3" key={index}>
		              		
		              		<div className='col-sm-12 col-md-6'>
		                		<label htmlFor={field.name} className="form-label">{field.label} :</label>
		              		</div>
		              		<div className="col-sm-12 col-md-6">
		                		<input
				                  type={field.type}
				                  name={field.name}
				                  value={eval(field.name)}  
				                  onChange={changeHandler}
				                  className="form-control"
				                  id={field.name}
		                		/>
		              		</div>
		              	<div className='col-md-3 mb-3'></div>
		            </div>
		          ))}
		          <button type='button' className='btn btn-primary m-3' onClick={back}>Back</button>
		          <button type='submit' className="btn btn-primary my-3">Submit</button>
		        </div>
		    </form>
		</div>
		)
}

export default LocationAdd