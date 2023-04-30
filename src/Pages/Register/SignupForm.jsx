import "./Signup.css";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import signupIMG from "../../assets/sign_up.svg";
function SignupForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const registerUser = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/api/v1/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        password,
        email,
        role,
      }),
    });
   
    const data = await res.json();
    setName("");
    setPassword("");
    setEmail("");
    setRole("");
    setShow(false);
    if (data.status === "success") {
      alert("User registered successfully");
      navigate("/login");
    } else {
      alert("User registration failed");
    }
  };

  const showPassword = () => {
    setShow(!show);
  };

  return (
    <div className="signup">
      <div className="left">
        <form onSubmit={registerUser}>
          <h1 className="title">Kavach 23</h1>
          <label htmlFor="name">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Your username.."
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <div className="password-field">
            <input
              type={show ? "text" : "password"}
              id="password"
              value={password}
              name="password"
              placeholder="Your password.."
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <i
              className={show ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
              onClick={showPassword}
            ></i>
          </div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your email.."
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="role">
            <div className="inside">
              <label htmlFor="role">User</label>
              <input
                type="radio"
                name="role"
                value="user"
                checked={role === "user"}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              />
            </div>
            <div className="inside">
              <label htmlFor="role">Admin</label>
              <input
                type="radio"
                name="role"
                value="admin"
                checked={role === "admin"}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              />
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="left">
        <img src={signupIMG} alt="signup" />
      </div>
    </div>
  );
}

export default SignupForm;
