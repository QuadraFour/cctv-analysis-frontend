import "./LoginForm.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import lockIMG from "../../assets/undraw_safe_re_kiil.svg";
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = decodeToken(token);
      navigate("/user/" + user.name);
    }
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();
    if (data.user) {
      setEmail("");
      setPassword("");
      setShow(false);
      localStorage.setItem("token", data.user);
      const user = decodeToken(data.user);

      if (user.role === "admin") {
        const name=user.name;
        navigate("/admin/"+name);
      } else if (user.role === "user") {
        const name=user.name;
        navigate("/user/"+name);
      } else {
        alert("You are not authorized to view this page");
        navigate("/login");
      }
    }
    if (data.status === "fail") {
      alert("Invalid credentials");
      setPassword("");
      return;
    }
  };

  const showPassword = () => {
    setShow(!show);
  };

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
            ></input>
            <i
              className={show ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
              onClick={showPassword}
            ></i>
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
