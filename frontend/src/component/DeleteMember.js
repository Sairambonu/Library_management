import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
const DeleteMember = () => {
  const [email, setEmail] = useState('');
  const [datas, setDatas] = useState({
    MemberData:[],
    Email:[]
  })
  const [message, setMessage] = useState('')
  const {MemberData,Email} = datas
  
  const navigate  = useNavigate();
  const handleDelete = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.delete(`http://localhost:5000/send/member/${email}`);
      navigate('/member')
      console.log(response.data); // Log the response message or handle it as needed
    } catch (error) {
      setMessage(error.response.message)
      console.error('Error deleting store:', error.message);
    }
  };
  const fetchDetails=()=>{
    axios.get('http://localhost:5000/fetch/member')
        .then((res) => {
          const fetchedData = res.data;
          setDatas(fetchedData); // Set the received data in the state
        })
        .catch((err) => {
          console.log('Error fetching data:', err);
        });
    }
  const back = ()=>{
    navigate('/member')
  }
  useEffect(() => {
    fetchDetails()
  }, []);
  return (
    <div className='container mt-5' style={{backgroundColor:'#E1E6E4', width:'60%'}}>
      <h1 className = 'text-center'>Delete Member</h1>
      {message &&  <p style={{ color: 'red'  }} className='m-5' >{message}</p>}

      <div className="container mt-3">   
          
        
        <div className="row mb-3">
                <div className='col-md-3'></div>
                <div className='col-md-3'>
                  <label htmlFor='email' className="form-label">Email :</label>
                </div>
                <div className="col-md-3">
                  <select
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-select"
                    id='email'
                  >
                    <option value=''>Select Email</option>
                    {Email.map((emailOption, index) => (
                      <option key={index} value={emailOption}>
                        {emailOption}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='col-md-3 mb-3'></div>
                </div>
      <button type='button' className="btn btn-primary m-3" onClick={back}>Back</button>
      <button className="btn btn-danger m-3" onClick={handleDelete}>Delete Member</button>
      </div>
    </div>
  );
};

export default DeleteMember;
