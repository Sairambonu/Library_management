import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar'
import { useNavigate, useLocation } from 'react-router-dom';
const Book = () => {
  
  const [datas, setDatas] = useState([]); // Change the initial state to an empty array
  const navigate  = useNavigate();
  const [filteredData, setFilteredData] = useState(datas)
  const [serachQuery, setSearchQuery] = useState('')
  const Addlocation = ()=>{
    navigate('/book/addbook')
  }
  const fetchDetails=()=>{
    axios.get('http://localhost:5000/fetch/book')
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
      setFilteredData(datas);
    } else {
      const filteredItems = datas.filter((item) =>
        item.genre.toLowerCase().includes(value.toLowerCase()) ||
        item.author.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filteredItems);
    }
  };
  useEffect(() => {
    fetchDetails()
  }, []);
  useEffect(() => {
    setFilteredData(datas);
  }, [datas]);

  return (
    <div>
      <Navbar/>
      <br/>
      <br/>
      <h1 className='mt-3'>Book details</h1>
      <div className="m-3 mx-left">
        <label className="m-2" style={{ color: '#000', fontWeight: 'bold' }}>Search</label><input type='text' 
        value={serachQuery} onChange={handleSearch} placeholder="genre or author" style={{borderRadius:'10px'}}/>
      </div>
      <div className='container'>
        <div className="row">
        {filteredData.map((item, index) => (
          <div key={index} className="col-sm-12 col-md-4 mb-3">
            <div className="card">
              <div className="card-body" style={{backgroundColor:'#E0F4FF'}}>
                <h5 className="card-title">
                  Store ID: {item._id}
                </h5>
                <p className="card-text">
                  Title: {item.title}<br />
                  Author: {item.author}<br />
                  Publication Year: {item.publication_year}<br />
                  Genre: {item.genre}<br />
                  ISBN: {item.ISBN}<br />
                  Description: {item.description}<br />
                </p>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
      
      <button type='button' className="btn btn-primary mt-3" onClick={Addlocation}>Add Book</button>
    </div>
  );
};

export default Book;
