import "./Signup.css";
import { useState } from "react";
function SignupForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();
    const res = fetch("https://localhost:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        email,
      }),
    });
    const data = await res.json();
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={registerUser}>
        <label htmlFor="name">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Your username.."
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Your password.."
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your email.."
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SignupForm;
