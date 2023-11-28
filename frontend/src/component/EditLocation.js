import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditLocation = () => {
  const [locationData, setLocationData] = useState({
    _id: '',
    name: '',
    address: ''
  });
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchData = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/fetch/loc/indivi/${id}`);
    setLocationData(response.data);
  } catch (error) {
    console.error('Error fetching location data:', error.message);
  }
};
const fetchDetails=()=>{
    axios.get(`http://localhost:5000/fetch/loc/indivi/${id}`)
        .then((res) => {
          const fetchedData = res.data;
          setLocationData(fetchedData); // Set the received data in the state
        })
        .catch((err) => {
          console.log('Error fetching data:', err);
        });
  }
 	
  useEffect(() => {
    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocationData({ ...locationData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(locationData)
    try {
      await axios.put(`http://localhost:5000/send/location/indivi/${id}`, locationData);
      navigate('/location'); // Redirect back to the location list after submission
    } catch (error) {
      console.error('Error update location:', error.message);
    }
  };



  return (
    <div>
      <h2>Edit Location</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="locationId">Location ID</label>
          <input
            type="text"
            id="locationId"
            name="_id"
            value={locationData._id}
            disabled
            // Other attributes if needed
          />
        </div>
        <div>
          <label htmlFor="locationName">Name</label>
          <input
            type="text"
            id="locationName"
            name="name"
            value={locationData.name}
            onChange={handleInputChange}
            // Other attributes if needed
          />
        </div>
        <div>
          <label htmlFor="locationAddress">Address</label>
          <input
            type="text"
            id="locationAddress"
            name="address"
            value={locationData.address}
            onChange={handleInputChange}
            // Other attributes if needed
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditLocation;
