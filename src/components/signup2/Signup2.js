import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { State, City } from "country-state-city";
import toast from "react-hot-toast";
import "./signup2.css";

export const Signup2 = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    city: "",
    state: "",
  });
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const { email, password } = location.state || {};

  // Check if session data exists
  useEffect(() => {
    if (!email || !password) {
      toast.error("Session expired! Please sign in again.");
      navigate("/");
    }
  }, [email, password, navigate]);

  // Fetch states for India
  useEffect(() => {
    const indiaStates = State.getStatesOfCountry("IN");
    setStates(indiaStates);
  }, []);

  // Fetch cities based on the selected state
  useEffect(() => {
    if (formData.state) {
      const selectedStateCities = City.getCitiesOfState("IN", formData.state);
      setCities(selectedStateCities);
    } else {
      setCities([]);
    }
  }, [formData.state]);

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData({ ...formData, state: selectedState, city: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = { ...formData, email, password };
    try {
      const API_URL = process.env.REACT_APP_USER_API_URL;
      const res = await axios.post(`${API_URL}/signup`, finalData);

      if (res.data.code === 200) {
        toast.success(res.data.message);
        const userDetails = res.data.data;

        localStorage.setItem("user_id", userDetails.id);
        localStorage.setItem("name", userDetails.name);
        localStorage.setItem("email", userDetails.email);
       
        localStorage.setItem("is_login", true);

        navigate("/user-dashboard");
      } else {
        toast.error(res.data.message || "Something went wrong!", { icon: "⚠️" });
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
      <h1>GatherUp - Complete Your Signup</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <select
            value={formData.gender}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <input
            type="date"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
          />
        </div>
        <div className="form-group">
          <select value={formData.state} onChange={handleStateChange}>
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        {cities.length > 0 && (
          <div className="form-group">
            <select
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <button type="submit" className="btn">
          Finish
        </button>
      </form>
    </div>
  );
};
