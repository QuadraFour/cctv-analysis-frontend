import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import "./AddCamera.css";

function AddCameraForm({ onClose }) {
  const navigate = useNavigate();
  const [cameraName, setCameraName] = useState("");
  const [location, setLocation] = useState(null);

  const handleAddCamera = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to view this page.");
      navigate("/login");
    }

    const user = decodeToken(token);
    const owner = user.id;

    if (
      !location ||
      !location.coordinates ||
      location.coordinates.length !== 2
    ) {
      alert("Please enter a valid location.");
      return;
    }

    const { data } = await axios.post(
      "http://localhost:8000/api/v1/camera/add",
      {
        owner,
        location,
      }
    );
    if(data.status === "success") {
      alert("Camera added successfully!");
      onClose();
    }
  };

  const handleLocationChange = (e) => {
    const [longitude, latitude] = e.target.value.split(",").map(parseFloat);
    setLocation({
      type: "Point",
      coordinates: [longitude, latitude],
    });
  };

  return (
    <div className="add">
      <form onSubmit={handleAddCamera} className="add__camera">
        <div className="form__icon">
          <i
            className="fa-lg fa-sharp fa-solid fa-circle-xmark"
            onClick={onClose}
          ></i>
        </div>
        <div className="form__content">
          <label htmlFor="cameraName">Camera Name</label>
          <input
            type="text"
            name="cameraName"
            id="cameraName"
            onChange={(e) => setCameraName(e.target.value)}
          />
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            id="location"
            onChange={handleLocationChange}
          />
          <button type="submit">Add!</button>
        </div>
      </form>
    </div>
  );
}

export default AddCameraForm;
