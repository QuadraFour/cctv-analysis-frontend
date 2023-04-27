import Navbar from "./components/Navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./components/Home/Home";
import LoginForm from "./Pages/Login/LoginForm";
import SignupForm from "./Pages/Register/SignupForm";
import {
  BrowserRouter as Router,
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
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
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login"  element={<LoginForm/>} />
          <Route path="/register"  element={<SignupForm/>} />
          <Route path="/home"  element={<Home data={data} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
