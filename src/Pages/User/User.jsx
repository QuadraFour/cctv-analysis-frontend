import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner/Spinner";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./User.css";
import ViewCameras from "../Camera/ViewCameras";
function User() {
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState([]);
  const [loader, setLoader] = useState(false);
  const [camera, setCamera] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please Login to view this page");
      navigate("/login");
    } else {
      const user = decodeToken(token);
      if (user.role !== "user") {
        alert("You are not authorized to view this page");
        navigate("/login");
      } else {
        const email = user.email;
        setLoader(true);
        const fetchIncidents = async () => {
          const { data } = await axios.post(
            "http://localhost:8000/api/v1/users/getIncidents/",
            {
              email: email,
            }
          );
          setIncidents(data.data.incidents);
          setLoader(false);
        };
        fetchIncidents();
      }
    }
  }, []);

  const decodedToken = decodeToken(localStorage.getItem("token"));
  const user = decodedToken.name;
  const id = decodedToken.id;

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

  const renderRows = incidents.map((incidentGroup, groupIndex) =>
    incidentGroup.map((incident, index) => (
      <tr key={`incident-${groupIndex}-${index}`}>
        <td>{incident.id}</td>
        <td style={{ textTransform: "uppercase" }}>{incident.type}</td>
        <td>{incident.locality}</td>
        <td style={{ textTransform: "uppercase" }}>{incident.levelOfAlert}</td>
        <td>{formatDate(incident.time)}</td>
        <td>{incident.location.coordinates[0]}</td>
        <td>{incident.location.coordinates[1]}</td>
        <td>{incident.cameraId}</td>
      </tr>
    ))
  );

  const handleCamera = () => {
    setCamera(true);
  };

  return (
    <div>
      {loader ? (
        <Spinner />
      ) : (
        <div>
          {camera ? (
            <ViewCameras />
          ) : (
            <div>
              <Navbar />
              <div className="wrapper">
                <h1>Welcome {user}</h1>
                <button onClick={handleCamera}>View Cameras</button>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Incident ID</th>
                    <th>Type</th>
                    <th>Locality</th>
                    <th>Level of Alert</th>
                    <th>Time</th>
                    <th>Longitude</th>
                    <th>Latitude</th>
                    <th>Camera ID</th>
                  </tr>
                </thead>
                <tbody>{renderRows}</tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default User;
