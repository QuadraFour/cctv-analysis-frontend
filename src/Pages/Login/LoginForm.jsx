import './LoginForm.css';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {decodeToken} from "react-jwt";
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res= await fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      }),
    });
    const data = await res.json();
    if(data.user){
      localStorage.setItem('token',data.user);
      const user=decodeToken(data.user);
      if(user.role==='admin'){
        navigate('/home');
      }
      else{
        alert("You are not authorized to view this page");
        navigate('/login');
      }
    }
    else{
      alert("Login Failed");
    }
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          placeholder="Your username.."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          name="password"
          placeholder="Your password.."
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default LoginForm;
