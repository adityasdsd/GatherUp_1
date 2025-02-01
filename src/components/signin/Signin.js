import React, { useState } from "react";
import axios from "axios"; // Import axios
import "./signin.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Signin = () => {
  const navigate = useNavigate(); // Initialize navigate for navigation

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loading state

  const API_URL = process.env.REACT_APP_USER_API_URL; // API base URL

  const validateForm = () => {
    const errors = {};
    if (!formData.email) errors.email = "Email is required.";
    if (!formData.password) errors.password = "Password is required.";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Reset previous errors
    setLoading(true); // Start loading

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false); // Stop loading
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/signin`, formData);
      
      if (res.data.status) {
        toast.success(res.data.message)
        localStorage.setItem("token", res.data.data.token); // Store token in localStorage
        localStorage.setItem("user_name", res.data.data.user_name); // Store user name
        navigate("/user-dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signin failed. Please try again."); // Show API error in alert
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="container">
      <h1>GatherUp - Sign In</h1>
      <form onSubmit={handleSubmit}>
        {errors.apiError && <p className="error">{errors.apiError}</p>} {/* Show API error */}
        
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
        
        <p className="switch-link">Don't have an account? <a href="/signup">Sign Up</a></p>
      </form>
    </div>
  );
};
