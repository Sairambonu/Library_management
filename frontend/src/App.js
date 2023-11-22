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
            <Route path="/addlocation" element={<LocationAdd/>}/>
            <Route path="/book/addbook" element={<AddBook/>}/>
            <Route path="/store/addstore" element={<AddStore/>}/>
            <Route path="/store/updatestore" element={<UpdateStore/>}/>
            <Route path="/store/deletestore" element={<DeleteStore/>}/>
            <Route path="/profile" element={<RequireAuth><Profile/></RequireAuth>}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
