import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from "react-hot-toast";
import "./signup.css";

export const Signup = () => {
  const navigate = useNavigate(); // Initialize navigate for navigation
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  // Validate form data
  const validateForm = () => {
    const errors = {};
    if (!formData.email) errors.email = "Email is required.";
    if (!formData.password || formData.password.length < 8)
      errors.password = "Password must be at least 8 characters long.";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const finalData = { email: formData.email };

    try {
      const API_URL = process.env.REACT_APP_USER_API_URL;
      const res = await axios.post(`${API_URL}/verify-user`, finalData);
      
      console.log("Response from backend:", res.data);

      if (res.data.code !== 200) {
        toast.error(res.data.message || "Something went wrong!", { icon: "⚠️" });
      } else {
        toast.success("User verified successfully!", { icon: "✅" });
        navigate("/signup2", { state: { email: formData.email, password: formData.password } });
      }
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "There was an error during signup!",
        { icon: "⚠️" }
      );
    }
  };

  return (
    <div className="container">
      <h1>GatherUp - Sign Up</h1>
      <form onSubmit={handleSubmit}>
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
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button type="submit" className="btn">Sign Up</button>
        <p className="switch-link">Already have an account? <a href="/">Sign In</a></p>
      </form>
    </div>
  );
};
