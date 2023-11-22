import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Outlet, Link } from "react-router-dom";
import {useAuth} from './auth'
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar'
const DataFetch = () => {
  
  const [datas, setDatas] = useState({
    dating:[],
    locationIds:[]
  }); // Change the initial state to an empty array
  const [serachQuery, setSearchQuery] = useState('')
  const {dating,locationIds} = datas
  const [filteredData, setFilteredData] = useState(dating)
  const auth = useAuth()
  const navigate  = useNavigate();
  
  const fetchDetails=()=>{
    axios.get('http://localhost:5000/fetch')
        .then((res) => {
          const fetchedData = res.data;
          setDatas(fetchedData); // Set the received data in the state
        })
        .catch((err) => {
          console.log('Error fetching data:', err);
        });
  }

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchQuery(value);

    if (value.trim() === '') {
      setFilteredData(dating);
    } else {
      const filteredItems = dating.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.address.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filteredItems);
    }
  };
  const Addlocation = ()=>{
    navigate('/location/addlocation')
  }
  const Updatelocation=()=>{
    navigate('/location/updatelocation')
  }
  const DeleteLocation=()=>{
    navigate('/store/deletelocation')
  }
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
      <h3 className='m-3'>Locations</h3>
      <div className="m-3 mx-left">
        <label className="m-2" style={{ color: '#000', fontWeight: 'bold' }}>Search</label><input type='text' 
        value={serachQuery} onChange={handleSearch} placeholder="name or address" style={{borderRadius:'10px'}}/>
        
      </div>
      <div className='container'>
        <div className="row">
        {filteredData.map((item, index) => (
          <div key={index} className="col-sm-12 col-md-4 mb-3">
            <div className="card" style={{backgroundColor:'#E0F4FF'}}>
              <div className="card-body">
                <h5 className="card-title">
                  Location ID: {item._id}
                </h5>
                <p className="card-text">
                  Name: {item.name}<br />
                  Address: {item.address}<br />
                </p>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
      <button type='button' className="btn btn-primary m-3" onClick={Updatelocation}>Update Location</button>
      <button type='button' className="btn btn-primary m-3" onClick={Addlocation}>Add Location</button>
      <button type='button' className="btn btn-primary m-3" onClick={DeleteLocation}>Delete Location</button>
    </div>
  );
};

export default DataFetch;
