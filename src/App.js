import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,Routes,Route,
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from './components/Home';
import Alert from './components/Alert';
import { useState } from 'react';
import Createprofile from './components/Createprofile';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert=(message,type)=>{
    setAlert({
      msg: message,
      type: type
    })
    // setTimeout(() => {
    //   showAlert(null)
    // }, 1500);
  }
  return (
    <>
    <Router>
      <Navbar/>
      <Alert alert={alert}/>
      <Routes>
      <Route path="/createprofile" element={<Createprofile showAlert={showAlert}/>}></Route>
      <Route path="/" element={<Home showAlert={showAlert}/>}></Route>
      <Route path="/login" element={<Login showAlert={showAlert}/>}></Route>
      <Route path="/signup" element={<Signup showAlert={showAlert}/>}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
