import './LoginForm.css';
import { useState } from 'react';
function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          placeholder="Your username.."
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          name="password"
          placeholder="Your password.."
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default LoginForm;
