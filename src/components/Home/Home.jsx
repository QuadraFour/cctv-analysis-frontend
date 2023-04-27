/* eslint-disable react/prop-types */
import "./Home.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {decodeToken} from "react-jwt";
function Home({ data }) {
  const navigate = useNavigate();
  const incident = data;
  // useEffect(() => {
  //   const token=localStorage.getItem('token');
  //   if(token){
  //     const user=decodeToken(token);
  //     if(!user){
  //       navigate('/login');
  //     }
  //     else{
  //       if(user.role!=='admin'){
  //         alert("You are not authorized to view this page");
  //         navigate('/login');
  //       }
  //     }
  //   }

  // }, []);



  function formatDate(date) {
    let formattedDate = new Date(date);
    if (date == "") return "";
  
    return (
      formattedDate.getDate().toString().padStart(2, 0) +
      "/" +
      (formattedDate.getMonth() + 1).toString().padStart(2, 0) +
      "/" +
      formattedDate.getFullYear()+'  '+formattedDate.getHours()+":"+formattedDate.getMinutes() +":" + formattedDate.getSeconds().toString().padStart(2, '0')
    );
  }
  const rows = incident.map((el) => (
    <tr key={el._id}>
      <td>{el._id}</td>
      <td style={{textTransform:"uppercase"}}>{el.type}</td>
      <td style={{textTransform:"uppercase"}}>{el.levelOfAlert}</td>
      <td>{el.locality}</td>
      <td>{formatDate(el.time)}</td>
    </tr>
  ));

  return (
    <div>
      <center>
        <h1 style={{ marginTop: "100px" }}>Incident Data</h1>
      </center>
      <table>
        <thead>
          <tr>
            <th>Incident ID</th>
            <th>Incident Type</th>
            <th>Level of alert</th>
            <th>Incident Locality</th>
            <th>Incident Time</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

export default Home;
