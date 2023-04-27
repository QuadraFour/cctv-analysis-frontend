import Navbar from "./components/Navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Home from "./components/Home/Home";
import LoginForm from "./components/Login/LoginForm";
import SignupForm from "./components/Signup/SignupForm";
import Spinner from "./components/Spinner/Spinner";
function App() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
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
  return (
    <>
      {loader ? <Spinner /> : null}
      <Navbar />
      <Home data={data} />
    </>
  );
}

export default App;
