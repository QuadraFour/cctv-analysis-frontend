import Navbar from "./components/Navbar/Navbar"
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./components/Home/Home"
import LoginForm from "./components/Login/LoginForm";
import SignupForm from "./components/Signup/SignupForm";
function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("https://cctv-analysis.onrender.com/api/v1/incidents/")
      .then((res) => {
        setData(res.data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Navbar/>
      <Home data={data}/>
    </div>
  )
}

export default App
