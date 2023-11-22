import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar'
import { useNavigate, useLocation } from 'react-router-dom';

const StoreConnect =()=>{
  const [datas, setDatas] = useState({
    dating:[],
    locationIds:[],
    booksIDS:[],
  });
  const [serachQuery, setSearchQuery] = useState('')
  
  const {dating, locationIds, booksIDS} = datas
  const [filteredData, setFilteredData] = useState(dating)
  const navigate  = useNavigate();
  // console.log(dating)
  // console.log(filteredData)
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
  const AddStore =()=>{
    navigate('/store/addstore')
  }
  const UpdateteStore=()=>{
    navigate('/store/updatestore')
  }
  const DeleteStore=()=>{
    navigate('/store/deletestore')
  }
const handleSearch = (event) => {
    const { value } = event.target;
    setSearchQuery(value);

    if (value.trim() === '') {
      setFilteredData(dating);
    } else {
      const filteredItems = dating.filter((item) =>
        item.location_name.toLowerCase().includes(value.toLowerCase()) ||
        item.book_name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filteredItems);
    }
  };

  
  

  useEffect(() => {
    fetchDetails()
  }, []);
  useEffect(() => {
    setFilteredData(dating);
  }, [dating]);

  return (
    <div>
      <Navbar/>
      <br/>
      <br/>
      <br/>
      <h1> Store Details:</h1>
      <div className="m-4 mx-left">
        <label className="m-2" style={{ color: '#000', fontWeight: 'bold' }}>Search</label><input type='text' value={serachQuery} onChange={handleSearch} 
        placeholder="bookname or locationname" style={{borderRadius:'10px'}}/>
        
      </div>
      <div className='container'>
        <div className="row">
        {filteredData.map((item, index) => (
          <div key={index} className="col-sm-12 col-md-4 mb-3">
            <div className="card" style={{backgroundColor:'#E0F4FF'}}>
              <div className="card-body">
                <h5 className="card-title">
                  Store ID: {item._id}
                </h5>
                <p className="card-text">
                  Location ID: {item.location_id}<br />
                  Book ID: {item.book_id}<br />
                  Location Name: {item.location_name}<br />
                  Book Name: {item.book_name}
                </p>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
      <button type='button' className="btn btn-primary m-3" onClick={UpdateteStore}>Update Store</button>
      <button type='button' className="btn btn-primary m-3" onClick={AddStore}>Add Store</button>
      <button type='button' className="btn btn-primary m-3" onClick={DeleteStore}>Delete Store</button>
    </div>
  );
};

export default StoreConnect;
