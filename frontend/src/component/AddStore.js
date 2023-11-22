import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddStore= ()=>{
	const [data, setData] = useState({
	    store_id: '',
	    location_id: '',
	    book_id:'',
	    location_name: '',
	    book_name:'',
	    message:''
	});
	const [datas, setDatas] = useState({
	    dating:[],
	    locationIds:[],
	    booksIDS:[],
	});
	const changeHandler = (event) => {
	    setData({ ...data, [event.target.name]: event.target.value });
	};
	const { store_id, location_id, book_id,location_name, book_name, message } = data;
	const {dating, locationIds, booksIDS} = datas
	const navigate  = useNavigate();

	const submitHandler = (e) => {
	e.preventDefault();
	axios.post('http://localhost:5000/send/store', data)
	    .then((res) => {
	      console.log(data)

	      if (res.status === 400) {
	        setData({ ...data, message: res.data }); // Set the error message in the state
	      } else if (res.status === 200) {
	        setData({ store_id: '', location_id: '', book_id: '', location_name:'',
	          book_name:'', message: 'Data added successfully' });
	        fetchDetails()
	        navigate('/store')
	      }
	    })
	    .catch((err) => {
	      console.log(err.response.data)
	      setData({ ...data, message: err.response.data });
	      console.log(err);
	    });
	};
	const fetchDetails=()=>{
	    axios.get('http://localhost:5000/fetch/store')
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
	return (
		<div className='container mt-5' style={{backgroundColor:'#E1E6E4', width:'60%'}}>
			<h1 className = 'text-center'>Add New Store</h1>
			{message &&  <p style={{ color: 'red'  }} className='m-5' >{message}</p>}
			<form onSubmit={submitHandler} className='mt-5'>
		        <div className="row mb-3">
		          <div className="col-md-3"></div>
		          <div className="col-md-3">
		            <label htmlFor="store_id" className="form-label">Store ID:</label>
		          </div>
		          <div className="col-md-3">
		            <input type='number' name='store_id' value={store_id} onChange={changeHandler} className="form-control" id="store_id" />
		          </div>
		          <div className="col-md-3"></div>
		        </div>

		        <div className="row mb-3">
		          <div className="col-md-3"></div>
		          <div className="col-md-3">
		            <label htmlFor="location_id" className="form-label">LocationId:</label>
		          </div>
		          <div className="col-md-3">
		            <select name='location_id' value={location_id} onChange={changeHandler} className="form-control" id="location_id">
		              <option disabled value="">Select Location ID </option>
		              {locationIds.map((location, index) => (
		                <option key={index} value={location}>
		                  {location}
		                </option>
		              ))}
		            </select>
		          </div>
		          <div className="col-md-3"></div>
		        </div>

		        <div className="row mb-3">
		          <div className="col-md-3"></div>
		          <div className="col-md-3">
		            <label htmlFor="book_id" className="form-label">BookId:</label>
		          </div>
		          <div className="col-md-3">
		            <select name='book_id' value={book_id} onChange={changeHandler} className="form-control" id="book_id">
		            <option disabled value="">Select Book ID </option>
		              {booksIDS.map((book, index) => (
		                <option key={index} value={book}>
		                  {book}
		                </option>
		              ))}
		            </select>
		          </div>
		          <div className="col-md-3"></div>
		        </div>

		        <div className="row mb-3">
		          <div className="col-md-3"></div>
		          <div className="col-md-3">
		            <label htmlFor="location_name" className="form-label">location Name :</label>
		          </div>
		          <div className="col-md-3">
		            <input type='text' name='location_name' value={location_name} onChange={changeHandler} className="form-control" id="location_name" />
		          </div>
		          <div className="col-md-3"></div>
		        </div>
		        <div className="row mb-3">
		          <div className="col-md-3"></div>
		          <div className="col-md-3">
		            <label htmlFor="book_name" className="form-label">Book Name:</label>
		          </div>
		          <div className="col-md-3">
		            <input type='text' name='book_name' value={book_name} onChange={changeHandler} className="form-control" id="book_name" />
		          </div>
		          <div className="col-md-3"></div>
		        </div>
		        <button type='button' className='btn btn-primary m-3' onClick={back}>Back</button>
		        <button type='submit' className='btn btn-primary m-3'>Submit</button>
		        
		    </form>
		</div>
		)
}
export default AddStore