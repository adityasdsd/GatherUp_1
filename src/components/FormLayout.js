import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Signin } from './signin/Signin.js';
import { Signup } from './signup/Signup.js';
import { Signup2 } from './signup2/Signup2.js';
import { UserDashboard } from './userDashboard/userDashboard.js'


export const FormLayout = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Signin />} />
      <Route path="/Signup2" element={<Signup2 />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
    </Routes>
  );
};
