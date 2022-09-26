import React from 'react'

function Section2(props) {
    const {name,degree,languages,exprience,projects}=props;
    return (
      <>
      <div className="card my-2" style={{width: "18rem"}}>
    <img src="https://www.kindpng.com/picc/m/52-525985_transparent-unknown-person-png-unknown-icon-png-download.png" className="card-img-top" alt="..."/>
    <div className="card-body">
      <h5 className="card-title">Profile Section</h5>
    </div>
    <ul className="list-group list-group-flush">
      <li className="list-group-item">Name : {name}</li>
      <li className="list-group-item">Degree : {degree}</li>
      <li className="list-group-item">Languages :{languages}</li>
      <li className="list-group-item">Exprience :{exprience}</li>
      <li className="list-group-item">Projects :{projects}</li>
    </ul>
    </div>
      </>
    )
}

export default Section2