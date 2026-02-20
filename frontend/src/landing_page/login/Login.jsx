import React,{useEffect} from "react";
import { useState } from "react";
import axios from "axios";

function Login() {

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.location.reload();
    };
  }, []);
  
  const [formData, setFormData] = useState({
    username: "",
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
    try {
      e.preventDefault();

      const res = await axios.post("http://localhost:3002/login", {
        username: formData.username,
        password: formData.password,
      });

      const token = res.data.token;

      if (!token) {
        alert("No token received");
        return;
      }

      // store token
      localStorage.setItem("token", token);

      alert("Login successful!");
      window.location.replace(`http://localhost:3000?token=${token}`);
    } catch (err) {
      console.log(err.response || err);  // 👈 see real error
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="container p-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center mb-4">Login</h2>

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

        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}

export default Login;
