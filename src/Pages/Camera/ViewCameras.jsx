import React from "react";
import Spinner from "../../components/Spinner/Spinner";
import User from "../User/User";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";
import AddCameraForm from "../../components/AddCamera/AddCameraForm";
import DeleteCamera from "../../components/DeleteCamera/DeleteCamera";
import "./camera.css";

function ViewCameras() {
  const [loader, setLoader] = useState(false);
  const [cameras, setCameras] = useState([]);
  const [back, setBack] = useState(false);
  const [add, setAdd] = useState(false);
  const [deleteCamera, setDeleteCamera] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function fetchCameras(id) {
      setLoader(true);
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/v1/camera/user?=${id}`,
          {
            params: {
              id: id,
            },
          }
        );
        setCameras(data.data.cameras);
        setLoader(false);
      } catch (err) {
        console.log(err);
        setLoader(false);
      }
    }
    if (!token) {
      alert("Please Login to view this page");
      navigate("/login");
    } else {
      const user = decodeToken(token);
      const id = user.id;
      fetchCameras(id);
    }
  }, []);
  const name = decodeToken(localStorage.getItem("token")).name;
  const handleBack = () => {
    setBack(true);
  };

  const addCamera = () => {
    setAdd(true);
  };

  const handleFormClose = () => {
    setAdd(false);
    setDeleteCamera(false);
  };

  const handleDeleteCamera = () => {
    setDeleteCamera(true);
  };
  
  return (
    <div>
      {loader ? (
        <Spinner />
      ) : (
        <div>
          {back ? (
            <User />
          ) : (
            <div className="camera">
              {add ? <AddCameraForm onClose={handleFormClose}/> : <></>}
              {deleteCamera ? <DeleteCamera onClose={handleFormClose}/> : <></>}
              <Navbar />
              <div className="wrapper">
                <h1>Welcome {name}</h1>
                <button onClick={addCamera} className="action">Add Camera</button>
                <button onClick={handleDeleteCamera} className="action">Remove Camera</button>
                <button onClick={handleBack}>Back</button>
              </div>
              <div className="cameras">
                {cameras.map((camera, idx) => (
                  <ul key={idx}>
                    <li>
                      <h3>Camera {idx + 1}</h3>
                      <h4>Camera ID: {camera.id}</h4>
                    </li>
                  </ul>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ViewCameras;
