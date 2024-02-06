import React, { useState } from 'react';
import { useNavigate } from 'react-router';

function Login() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    password: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setInput(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { fullname, email, password } = input;

    if (fullname.trim() !== '' && email.trim() !== '' && password.trim() !== '') {
      // If all fields are filled, navigate to the dashboard
      navigate('/Home');
      alert(`Thanks  ${input.fullname} for joining us`)
    } else {
      // If any field is empty, show an alert
      alert('Please enter all fields');
    }
  }

  return (
<div className="form-container">
    <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>
        Username
        <input
          type="text"
          name="fullname"
          placeholder="Enter a valid username"
          value={input.fullname}
          onChange={handleChange}
        />
      </label>
      <br />
      </div>
      <div className="form-group">
      <label
      
      >
        Email
        <input
          type="email"
          name="email"
          placeholder="Input your email"
          value={input.email}
          onChange={handleChange}
        />
      </label>
      <br />
      </div>
      <div className="form-group">
      <label>
        Password
        <input
          type="password"
          name="password"
          placeholder="Enter a valid password"
          value={input.password}
          onChange={handleChange}
        />
      </label>
      <br />
      </div> 
      <button type="submit">Login</button>
    </form>

    </div>
  );
}
export default Login;
