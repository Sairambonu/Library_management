import './App.css';
import DataFetch from './component/DataFetch'
import StoreConnect from './component/StoreConnect'
import Book from './component/Book'
import Register from './component/Register'
import Login from './component/Login'
import Profile from './component/Profile'
import {AuthProvider} from './component/auth'
import {RequireAuth} from './component/RequireAuth'
import LocationAdd from './component/LocationAdd'
import AddBook from './component/AddBook'
import AddStore from './component/AddStore'
import UpdateStore from './component/UpdateStore'
import DeleteStore from './component/DeleteStore'
import DeleteLocation from './component/DeleteLocation'
import UpdateLocation from './component/UpdateLocation'
import Member from './component/Member'
import AddMember from './component/AddMember'
import DeleteMember from './component/DeleteMember'
import EditLocation from './component/EditLocation'
import Transcation from './component/Transcation'
import AddTranscation from './component/AddTranscation'
import 'bootstrap/dist/css/bootstrap.min.css'



import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/location" element={<DataFetch/>}/>
            <Route path="/book" element={<Book/>}/>
            <Route path="/store" element={<StoreConnect/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/location/addlocation" element={<RequireAuth><LocationAdd/></RequireAuth>}/>
            <Route path="/location/updatelocation" element={<RequireAuth><UpdateLocation/></RequireAuth>}/>
            <Route path="/location/edit/:id" element={<RequireAuth><EditLocation/></RequireAuth>}/>
            <Route path="/store/deletelocation" element={<RequireAuth><DeleteLocation/></RequireAuth>}/>
            <Route path="/book/addbook" element={<RequireAuth><AddBook/></RequireAuth>}/>
            <Route path="/store/addstore" element={<RequireAuth><AddStore/></RequireAuth>}/>
            <Route path="/store/updatestore" element={<RequireAuth><UpdateStore/></RequireAuth>}/>
            <Route path="/store/deletestore" element={<RequireAuth><DeleteStore/></RequireAuth>}/>
            <Route path="/member" element={<Member/>}/>
            <Route path="/member/addmember" element={<RequireAuth><AddMember/></RequireAuth>}/>
            <Route path="/member/deletemember" element={<RequireAuth><DeleteMember/></RequireAuth>}/>
            <Route path="/transcation" element={<Transcation/>}/>
            <Route path="/transcation/addtranscation" element={<RequireAuth><AddTranscation/></RequireAuth>}/>
            <Route path="/profile" element={<RequireAuth><Profile/></RequireAuth>}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
