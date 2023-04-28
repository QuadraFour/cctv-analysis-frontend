import "./Signup.css";
import React from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
function SignupForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const registerUser = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/signup", {
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
    if (data.status === "success") {
      alert("User registered successfully");
      navigate("/login");
    } else {
      alert("User registration failed");
    }
  };
  return (
    <>
      <form onSubmit={registerUser}>
        <label htmlFor="name">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Your username.."
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Your password.."
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your email.."
          onChange={(e) => setEmail(e.target.value)}
        />

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
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default SignupForm;
