import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
let navigate=useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:7000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })

    });
    const json = await response.json();
    // console.log(json);

    if (!json.success) {
      alert("Invalid Credentials!!!");
    }
    if (json.success) {
      localStorage.setItem("userEmail",credentials.email);
      localStorage.setItem("authToken",json.authToken);
      // console.log(localStorage.getItem("authToken"));
     navigate("/");
    }
  }
  const change = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }
  return (
    <div>
      <div className="container mt-4">

        <form onSubmit={handlesubmit}>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={change} />
            <div id="emailHelp" className="form-text text-danger">* We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={change} />
          </div>


          <button type="submit" className="m-3 btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Login;