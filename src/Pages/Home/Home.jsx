/* eslint-disable react/prop-types */
import "./Home.css";
import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
function Home({ data }) {
  const navigate = useNavigate();
  const incident = data;
  const [token, setToken] = useState("");
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
  const rows = incident.map((el) => (
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="home">
      {token ? (
        <div>
          {/* <Navbar /> */}
          <center>
            <h1>Welcome {decodeToken(token).name}</h1>
          </center>
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
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
