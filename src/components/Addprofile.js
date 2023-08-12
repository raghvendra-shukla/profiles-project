import { useState } from "react";
import React from 'react';


function Addprofile(props) {
    const [profiles, setProfiles] = useState(null);
    const [profile, setProfile] = useState({name:"",degree:"",languages:"",exprience:"",projects:""});
    const addprofile= async(name,degree,languages,exprience,projects)=>{
        //API call
        const response = await fetch("https://ill-erin-slug-wig.cyclic.app//api/profile/addprofile", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({name,degree,languages,exprience,projects})
        });
        const prof= await response.json();
        // console.log(prof);
        setProfiles(profiles.concat(prof));
      }
    const handleonchange=(e)=>{ 
        setProfile({...profile,[e.target.name]:e.target.value})
    }
    const handleonclick=(e)=>{
        e.preventDefault();
        addprofile(profile.name,profile.degree,profile.exprience,profile.languages,profile.projects)
        setProfile({name:"",degree:"",languages:"",exprience:"",projects:""})
        props.showAlert("Profile has been added successfully","success");
    }
  return (
    <div>
        <h1>Add a Profile</h1>
        <form>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" onChange={handleonchange} id="name" name="name" aria-describedby="emailHelp" minLength={2} required value={profile.name}/>
            </div>
            <div className="mb-3">
                <label htmlFor="degree" className="form-label">Degree</label>
                <input type="text" className="form-control" id="description" onChange={handleonchange} name="degree" minLength={5} required value={profile.degree}/>
            </div>
            <div className="mb-3">
                <label htmlFor="languages" className="form-label">Languages</label>
                <input type="text" className="form-control" onChange={handleonchange} id="languages" name="languages" minLength={5} required value={profile.languages}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exprience" className="form-label">Exprience</label>
                <input type="text" className="form-control" onChange={handleonchange} id="exprience" name="exprience" minLength={5} required value={profile.exprience}/>
            </div>
            <div className="mb-3">
                <label htmlFor="projects" className="form-label">Projects</label>
                <input type="text" className="form-control" onChange={handleonchange} id="projects" name="projects" minLength={5} required value={profile.projects}/>
            </div>
            <button disabled={profiles!=null || profile.name.length<3|| profile.degree.length<3|| profile.languages.length<3|| profile.exprience.length<3|| profile.projects.length<3}type="submit" className="btn btn-primary" onClick={handleonclick}>Add Profile <i className="fa-solid fa-user-plus"></i></button>
        </form>
    </div>
  )
}

export default Addprofile