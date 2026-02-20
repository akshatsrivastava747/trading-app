import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    try{
      e.preventDefault();

    await axios.post("https://trading-backend-buvs.onrender.com/signup", {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });
    // later → call backend API here

    alert("Signup successful!");
    navigate("/login");
    }catch(err){
      console.log(err.response || err);  // 👈 see real error
      alert(err.response?.data?.error || "Signup failed");
    }
    
  };

  return (
    <div className="container p-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center mb-4">Create Account</h2>

      <form onSubmit={handleSubmit}>
        {/* Username */}
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            name="username"
            className="form-control"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>

        <button className="btn btn-primary w-100">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
