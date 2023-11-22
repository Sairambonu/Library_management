import React, {useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const AddBook = ()=>{

	const [data, setData] = useState({
	    bookId: '',
	    title: '',
	    author: '',
	    publication_year:'',
	    genre:'',
	    ISBN:'',
	    description:'',
	    message:''
	  });

	const changeHandler = (event) => {
	    setData({ ...data, [event.target.name]: event.target.value });
	  };
	const navigate  = useNavigate();
	const { bookId, title, author, publication_year, genre,ISBN,description,message } = data;

	const submitHandler = (e) => {
	  e.preventDefault();
	  axios.post('http://localhost:5000/send/book', data)
	    .then((res) => {
	      console.log(data)
	      // Check for the specific status code indicating the conflict (400)
	      if (res.status === 400) {
	        console.log(res.data)
	        setData({ ...data, message: res.data }); // Set the error message in the state
	      } else if (res.status === 200) {
	        setData({ bookId: '', title: '', author: '', publication_year:'', genre:'', ISBN:'',
	          description:'', message: 'Data added successfully' });
	        navigate('/book')
	      }
	    })
	    .catch((err) => {
	      setData({ ...data, message: err.response.message});
	      console.log(err);
	    });
	};
	  const back=()=>{
		navigate('/store')
	}
	const formFields = [
	    { label: 'Book ID', name: 'bookId', type: 'number' },
	    { label: 'Title', name: 'title', type: 'text' },
	    { label: 'Author', name: 'author', type: 'text' },
	    { label: 'Publication Year', name: 'publication_year', type: 'number' },
	    { label: 'Genre', name: 'genre', type: 'text' },
	    { label: 'ISBN', name: 'ISBN', type: 'number' },
	    { label: 'Description', name: 'description', type: 'text' },
	];
	return(
		<div className='container mt-5' style={{backgroundColor:'#E1E6E4', width:'60%'}}>
			<h1 className = 'text-center'>Add New Book</h1>
			{message &&  <p style={{ color: 'red'  }} className='m-5' >{message}</p>}
			<form onSubmit={submitHandler} className='mt-5'>
		        <div className="container">
		          {formFields.map((field, index) => (
		            <div className="row mb-3" key={index}>
		              <div className='col-md-3'></div>
		              <div className='col-md-3'>
		                <label htmlFor={field.name} className="form-label">{field.label} :</label>
		              </div>
		              <div className="col-md-3">
		                <input
		                  type={field.type}
		                  name={field.name}
		                  value={eval(field.name)} // Access state dynamically (consider using another approach for dynamic state)
		                  onChange={changeHandler}
		                  className="form-control"
		                  id={field.name}
		                />
		              </div>
		              <div className='col-md-3 mb-3'></div>
		            </div>
		          ))}
		          <button type='button' className='btn btn-primary m-3' onClick={back}>Back</button>
		          <button type='submit' className="btn btn-primary m-3">Submit</button>
		        </div>
		        
		    </form>
		</div>
		)
}

export default AddBook