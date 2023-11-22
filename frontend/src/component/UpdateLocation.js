import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

const UpdateLocation = () => {
  const [locationId, setLocationId] = useState('');
  const [locationName, setLocationName] = useState('');
  const [message, setMessage] = useState('')
  const navigate  = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/fetch/location/${locationId}`, {
        address: locationName,
      });
      
      navigate('/store')
      console.log(response.data); // Handle the updated store object as needed
    } catch (error) {
      setMessage(error.response.data || 'Error updating store'); 
      console.error('Error updating store:', error.message);
    }
  };

  const back = ()=>{
    navigate('/store')
  }
  return (
    <div className='container mt-5' style={{backgroundColor:'#E1E6E4', width:'60%'}}>
      <h1 className = 'text-center'>Update Address</h1>
      {message &&  <p style={{ color: 'red'  }} className='m-5' >{message}</p>}
      <form onSubmit={handleUpdate}>
      <div className="container m-3">   
          <div className="row mb-3">
            <div className='col-md-3'></div>
            <div className='col-md-3'>
              <label htmlFor='locationId' className="form-label">Location Id:</label>
            </div>
            <div className="col-md-3">
              <input
                type='number'
                value={locationId}
                onChange={(e) => setLocationId(e.target.value)}
                className="form-control"
                id="storeid"
              />
            </div>
            <div className='col-md-3 mb-3'></div>
          </div>

          <div className="row mb-3">
            <div className='col-md-3'></div>
            <div className='col-md-3'>
              <label htmlFor='location' className="form-label">Location Name:</label>
            </div>
            <div className="col-md-3">
              <input
                type="text"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                className="form-control"
                id="location"
              />
            </div>
            <div className='col-md-3 mb-3'></div>
          </div>
        <button type='button' className="btn btn-primary m-3" onClick={back}>Back</button>
        <button type='submit' className="btn btn-primary m-3">Submit</button>
      </div>
      </form>
    </div>
  );
};

export default UpdateLocation;
