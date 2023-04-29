/* eslint-disable react/prop-types */
import "./Home.css";
import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import Spinner from "../../components/Spinner/Spinner";
function Home() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [data,setData]=useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please Login to view this page");
      navigate("/login");
    } else {
      setToken(token);
      const user = decodeToken(token);
      if (user.role !== "admin") {
        alert("You are not authorized to view this page");
        navigate("/login");
      }
    }
  }, []);
  
  useEffect(() => {
    setLoader(true);
    axios
      .get("https://cctv-analysis.onrender.com/api/v1/incidents/")
      .then((res) => {
        setData(res.data.data.data);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  function formatDate(date) {
    let formattedDate = new Date(date);
    if (date == "") return "";

    return (
      formattedDate.getDate().toString().padStart(2, 0) +
      "/" +
      (formattedDate.getMonth() + 1).toString().padStart(2, 0) +
      "/" +
      formattedDate.getFullYear() +
      "  " +
      formattedDate.getHours() +
      ":" +
      formattedDate.getMinutes() +
      ":" +
      formattedDate.getSeconds().toString().padStart(2, "0")
    );
  }
  const rows = data.map((el) => (
    <tr key={el._id}>
      <td>{el._id}</td>
      <td style={{ textTransform: "uppercase" }}>{el.type}</td>
      <td style={{ textTransform: "uppercase" }}>{el.levelOfAlert}</td>
      <td>
        <a
          href={`https://www.google.com/maps/place/${el.location.coordinates[1]},${el.location.coordinates[0]}`}
          target="_blank"
          rel="noreferrer"
        >
          {el.locality}
        </a>
      </td>
      <td>{el.location.coordinates[0]}</td>
      <td>{el.location.coordinates[1]}</td>
      <td>{formatDate(el.time)}</td>
    </tr>
  ));

  

  return (
    <div className="home">
      {loader ? (
        <Spinner />
      ) : (
        <></>
      )}
      {token ? (
        <div>
          <Navbar/>
          <center className="welcome">
            <h1>Welcome {decodeToken(token).name}</h1>
          </center>
          <center style={{marginTop:"50px"}}>
            <h1>Incident Data</h1>
          </center>
          <table>
            <thead>
              <tr>
                <th>Incident ID</th>
                <th>Incident Type</th>
                <th>Level of alert</th>
                <th>Incident Locality</th>
                <th>Longitude</th>
                <th>Latitude</th>
                <th>Incident Time</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Home;
