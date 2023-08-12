import React from "react";
import Addprofile from "./Addprofile";
import { useEffect,useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Section from "./Section";

function Createprofile(props) {
  const navigate = useNavigate();
  const { showAlert } = props;
  const ref=useRef(null);
  const refclose=useRef(null);
  // const host = "http://localhost:5000";
  const [profile, setprofile] = useState([]);
  const getprofile = async () => {
    //API call
    const response = await fetch(
      "https://ill-erin-slug-wig.cyclic.app//api/profile/fetchaprofile",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    // console.log(json);
    setprofile(json);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getprofile();
    } else {
      navigate("/login");
    }
  },);

  //Delete a profile
  const deletenote = async (id) => {
    //Deleting a profile
    const response = await fetch(
      `https://ill-erin-slug-wig.cyclic.app//api/profile/deleteprofile/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(),
      }
    );
    const json = response.json();
    // console.log("deleting the note with id" + id);
    const newProfile = profile.filter((profile) => {
      return profile._id !== id;
    });
    setprofile(newProfile);
  };
  //editing a note
  const editprofile = async (
    id,
    name,
    degree,
    languages,
    exprience,
    projects
  ) => {
    // Api call
    const response = await fetch(`https://ill-erin-slug-wig.cyclic.app//api/profile/updateprofile/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ name, degree, languages, exprience, projects }),
    });
    const json = response.json();
    //logic to Editing a profile
    const newprof = JSON.parse(JSON.stringify(profile));
    for (let index = 0; index < newprof.length; index++) {
      const element = newprof[index];
      if (element._id === id) {
        newprof[index].name = name;
        newprof[index].degree = degree;
        newprof[index].languages = languages;
        newprof[index].exprience = exprience;
        newprof[index].projects = projects;
        break;
      }
    }
    setprofile(newprof);
  };
  
  const [proff, setproff] = useState({id:"",ename:"",edegree:"",elanguages:"",eexprience:"",eprojects:""});
  const updateprofile = (currentproff) => {
    ref.current.click();
    setproff({id:currentproff._id,ename:currentproff.name,edegree:currentproff.degree,elanguages:currentproff.languages,eexprience:currentproff.exprience,eprojects:currentproff.projects});
  };
const handleonclick=(e)=>{
    e.preventDefault();
    editprofile(proff.id,proff.ename,proff.edegree,proff.elanguages,proff.eexprience,proff.eprojects);
    props.showAlert("Notes has been updated","success");
    // console.log("Updating a note...",proff);
    refclose.current.click();
}
const handleonchange=(e)=>{ 
  setproff({...proff,[e.target.name]:e.target.value})
}
  return (
    <>
      <div className="container my-2">
        <h1 className="text-center">Create your own profile</h1>
        <Addprofile showAlert={showAlert} />
        <button
          ref={ref}
          type="button"
          className="btn btn-primary my-2 d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Edit your profile
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Profile
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleonchange}
                      id="ename"
                      name="ename"
                      aria-describedby="emailHelp"
                      value={proff.ename}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="degree" className="form-label">
                      Degree
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="edegree"
                      onChange={handleonchange}
                      name="edegree"
                      value={proff.edegree}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="languages" className="form-label">
                      languages
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleonchange}
                      id="elanguages"
                      name="elanguages"
                      value={proff.elanguages}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exprience" className="form-label">
                      Expreience
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleonchange}
                      id="eexprience"
                      name="eexprience"
                      value={proff.eexprience}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="projects" className="form-label">
                      Projects
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleonchange}
                      id="eprojects"
                      name="eprojects"
                      value={proff.eprojects}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={refclose}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleonclick}
                >
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row my-2">
          <h2>Your Profiles</h2>
          {profile.map((element) => {
            return (
              <div className="col-md-3" key={element._id}>
                <Section
                  name={element.name}
                  degree={element.degree}
                  languages={element.languages}
                  exprience={element.exprience}
                  projects={element.projects}
                  showAlert={showAlert}
                  deletenote={deletenote}
                  id={element._id}
                  updateprofile={updateprofile}
                  profile={element}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Createprofile;
