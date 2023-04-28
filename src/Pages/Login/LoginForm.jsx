import "./LoginForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import lockIMG from "../../assets/undraw_safe_re_kiil.svg";
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    setEmail("");
    setPassword("");
    setShow(false);
    const data = await res.json();
    console.log(data);

    if (data.user) {
      localStorage.setItem("token", data.user);
      const user = decodeToken(data.user);
      if (user.role === "admin") {
        navigate("/home");
      } else {
        alert("You are not authorized to view this page");
        navigate("/login");
      }
    }
    if (data.status === "fail") {
      alert("Invalid credentials");
      return;
    }
  };

  const showPassword=()=>{
    setShow(!show);

  }


  return (
    <div className="login">
      <div className="right">
        <form onSubmit={handleSubmit}>
          <h1 className="title">Kavach 23</h1>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="Your email.."
            onChange={(e) => setEmail(e.target.value)}
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
            ></input>{" "}
            <i className={show ? "fa-solid fa-eye" : "fa-solid fa-eye-slash" } onClick={showPassword}></i>
          </div>
          <button type="submit" value="Submit">
            Submit
          </button>
        </form>
      </div>
      <div className="left">
        <img src={lockIMG} alt="" />
      </div>
    </div>
  );
}

export default LoginForm;
