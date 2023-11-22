import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
const DeleteLocation = () => {
  const [locationId, setLocationId] = useState('');
  const [message, setMessage] = useState('')
  const navigate  = useNavigate();
  const handleDelete = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.delete(`http://localhost:5000/fetch/location/${locationId}`);
      navigate('/location')
      console.log(response.data); // Log the response message or handle it as needed
    } catch (error) {
      setMessage(error.response.message)
      console.error('Error deleting store:', error.message);
    }
  };
  const back = ()=>{
    navigate('/store')
  }
  return (
    <div className='container mt-5' style={{backgroundColor:'#E1E6E4', width:'60%'}}>
      <h1 className = 'text-center'>Delete Location</h1>
      {message &&  <p style={{ color: 'red'  }} className='m-5' >{message}</p>}

      <div className="container mt-3">   
          <div className="row mb-3">
            <div className='col-md-3'></div>
            <div className='col-md-3'>
              <label htmlFor='locationId' className="form-label">LocationId:</label>
            </div>
            <div className="col-md-3">
              <input
                type='number'
                value={locationId}
                onChange={(e) => setLocationId(e.target.value)}
                className="form-control"
                id="locationId"
              />
            </div>
            <div className='col-md-3 mb-3'></div>
          </div>
        </div>
      <button type='button' className="btn btn-primary m-3" onClick={back}>Back</button>
      <button className="btn btn-danger m-3" onClick={handleDelete}>Delete Location</button>
    </div>
  );
};

export default DeleteLocation;
