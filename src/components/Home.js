import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Section2 from './Section2';

function Home(props) {
  const navigate = useNavigate();
  const {showAlert}=props;
  // const host="http://localhost:5000";
  const [profile, setprofile] = useState([]);
  const getallprofile=async()=>{
      //API call
      const response = await fetch("https://ill-erin-slug-wig.cyclic.app//api/profile/fetchallprofile", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json= await response.json();
      // console.log(json);
      setprofile(json);
    }
    useEffect(() => {
      if(localStorage.getItem("token")){
        getallprofile();
      }
      else{
        navigate("/login")
      }
  },[]);
  return (
    <>
    <div className="container my-2">
    <div className="d-grid gap-3 col-6 mx-auto my-2">
          <Link to="/createprofile" className="btn btn-danger">Create your profile <i className="fa-solid fa-user-plus"></i></Link>
      </div>
    <div className="row my-2">
        <h1 className='text-center'>Here you views all the profiles of all users</h1>
        {profile.map((element)=>{
          return(
              <div className="col-md-3" key={element._id}>
                  <Section2 name={element.name} degree={element.degree} languages={element.languages} exprience={element.exprience} projects={element.projects} showAlert={showAlert}/>
            </div>
          )
      })}
      </div>
     </div>
    </>
    
  )
}

export default Home