import React, {useState, useEffect} from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Member = ()=>{
	const [datas, setDatas] = useState({
		MemberData:[],
		Email:[]
	})
	const [serachQuery, setSearchQuery] = useState('')
	const {MemberData,Email} = datas
	const [filteredData, setFilteredData] = useState(MemberData)
	const navigate  = useNavigate();
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

  	const AddMember =()=>{
	    navigate('/member/addmember')
		}
	  const UpdateMember=()=>{
	    navigate('/store/updatestore')
		}
	  const DeleteMember=()=>{
	    navigate('/member/deletemember')
		}

		const deletePer=()=>{

		}
	const handleSearch = (event) => {
	    const { value } = event.target;
	    const intvalue = value
	    setSearchQuery(intvalue);

	    if (value.trim() === '') {
	      setFilteredData(MemberData);
	    } else {
	      const filteredItems = MemberData.filter((item) =>
	        item.contact_info.phone.toString().includes(value) ||
	        item.username.toLowerCase().includes(value.toLowerCase())
	      );
	      setFilteredData(filteredItems);
	    }
	  };

	const deleteMember = async (email) => {
    try {
      await axios.delete(`http://localhost:5000/send/member/${email}`);
      // Refresh the data after deletion
      fetchDetails();
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      deleteMember(id);
    }
  };

	useEffect(() => {
    fetchDetails()
  }, []);
  useEffect(() => {
    setFilteredData(MemberData);
  }, [MemberData]);
	return(
		<div>
			<Navbar/>
			<br/>
			<br/>
			<div className="m-4 mx-left">
		        <label className="m-2" style={{ color: '#000', fontWeight: 'bold' }}>Search</label><input type='text' value={serachQuery} onChange={handleSearch} 
		        placeholder="phone or username" style={{borderRadius:'10px'}}/>
		        
		      </div>
		      <div className='container'>
		        <div className="row">
		        {filteredData.map((item, index) => (
		          <div key={index} className="col-sm-12 col-md-4 mb-3">
		            <div className="card" style={{backgroundColor:'#E0F4FF'}}>
		              <div className="card-body">
		                <h5 className="card-title">
		                  Email ID: {item._id}
		                </h5>
		                <p className="card-text">
		                  Username: {item.username}<br />
		                  Role: {item.role}<br />
		                  Phone: {item.contact_info.phone}<br />
		                  Address: {item.contact_info.address}
		                </p>
		                <button type='button' className="btn btn-primary m-3" onClick={() => handleDelete(item._id)}>
                Delete
              </button>
		              </div>
		            </div>
		          </div>
		        ))}
		        </div>
		      </div>
		      <button type='button' className="btn btn-primary m-3" onClick={UpdateMember}>Update Meber</button>
		      <button type='button' className="btn btn-primary m-3" onClick={AddMember}>Add Member</button>
		      <button type='button' className="btn btn-primary m-3" onClick={DeleteMember}>Delete Member</button>
		</div>
		)
}
export default Member