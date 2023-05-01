import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";

function DeleteCamera({ onClose }) {
  const navigate = useNavigate();
  const [id, setid] = useState("");

  const handleAddCamera = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to view this page.");
      navigate("/login");
    }

    const camera_id = id;

    try {
      const { data } = await axios.delete(
        `http://localhost:8000/api/v1/camera/remove/${camera_id}`
      );
      console.log(data);
      if (data.status === "success") {
        alert("Camera Deleted successfully!");
        onClose();
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      } else {
        console.log(error);
      }
    }
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
          <label htmlFor="id">Enter ID of Camera</label>
          <input
            type="text"
            id="id"
            name="id"
            onChange={(e) => setid(e.target.value)}
          />
          <button type="submit">Remove!</button>
        </div>
      </form>
    </div>
  );
}

export default DeleteCamera;
