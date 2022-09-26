import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Navbar() {
    let location = useLocation();
    const navigate = useNavigate();
    const handlelogout=()=>{
      localStorage.removeItem("token");
      navigate("./login")
    }
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Profile</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className= {`nav-link ${location.pathname==="/"? "active":""}`} aria-current="page" to="/">Home</Link>
        </li>
      </ul>
      {!localStorage.getItem("token")?<form className='d-flex'>
      <Link className="btn btn-primary mx-2" to="/login" role="button">Login <i className="fa-solid fa-right-to-bracket"></i></Link>
      <Link className="btn btn-primary mx-2" to="/signup" role="button">SignUP <i className="fa-sharp fa-solid fa-user-plus"></i></Link>
      </form>:<Link className="btn btn-primary mx-2" to="/" onClick={handlelogout}>Logout <i className="fa-solid fa-right-from-bracket"></i></Link>}
    </div>
  </div>
</nav>
</>
  )
}

export default Navbar