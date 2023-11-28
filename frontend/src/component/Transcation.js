import React, {useState, useEffect} from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Transaction =()=>{
	const [datas, setDatas] = useState({
		trans:[],
		user_idss:[]
	})
	const [serachQuery, setSearchQuery] = useState('')
	const {trans,user_idss} = datas
	const [filteredData, setFilteredData] = useState(trans)
	const navigate  = useNavigate();

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

  	const Addtranscation=()=>{
	    navigate('/transcation/addtranscation')
	}

  	const handleSearch = (event) => {
	    const { value } = event.target;
	    const intvalue = value
	    setSearchQuery(intvalue);

	    if (value.trim() === '') {
	      setFilteredData(trans);
	    } else {
	      const filteredItems = trans.filter((item) =>
	        item.user_id.toLowerCase().includes(value.toLowerCase()) ||
	        item.books.join(",").toLowerCase().includes(value.toLowerCase())
	      );
	      setFilteredData(filteredItems);
	    }
	};


	useEffect(() => {
	    fetchDetails()
	}, []);
	useEffect(() => {
	    setFilteredData(trans);
	}, [trans]);
	return(
		<div>
			<Navbar/>
			<br/>
			<br/>
			<div className="m-4 mx-left">
		        <label className="m-2" style={{ color: '#000', fontWeight: 'bold' }}>Search</label><input type='text' 
		        value={serachQuery} onChange={handleSearch} placeholder="book or username" style={{borderRadius:'10px'}}/>
		        
		      </div>
		      <div className='container'>
		        <div className="row">
		        {filteredData.map((item, index) => (
		          <div key={index} className="col-sm-12 col-md-4 mb-3">
		            <div className="card" style={{backgroundColor:'#E0F4FF'}}>
		              <div className="card-body">
		                <h5 className="card-title">
		                 	ID: {item._id}
		                </h5>
		                <p className="card-text">
		                  Username: {item.user_id}<br />
		                  Books: {item.books}<br/>
		                  Checkin: {item.checkin}<br />
		                  Checkout: {item.checkout}
		                </p>
		              </div>
		            </div>
		          </div>
		        ))}
		        </div>
		      </div>
		      <button type='button' className="btn btn-primary m-3" onClick={Addtranscation}>Add Transcation</button>
		</div>
		)
	}
export default Transaction