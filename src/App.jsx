import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./Pages/Home/Home";
import LoginForm from "./Pages/Login/LoginForm";
import SignupForm from "./Pages/Register/SignupForm";
import {
  BrowserRouter as Router,
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login"  element={<LoginForm/>} />
          <Route path="/register"  element={<SignupForm/>} />
          <Route path="/home"  element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
