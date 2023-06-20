import './App.css';
import { Login } from "./Component/Login";
import { User } from "./Component/User_profil";
import { Register } from "./Component/Register";
import { HomePage } from "./Component/HomePage";
import React, { useState } from 'react';
import { Component } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link
} from 'react-router-dom';


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <HomePage />
    ),
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  }
]);

const App = () => {
  const [states, setStates] = useState('u');
  const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNjg0NTAyODIxLCJleHAiOjE2ODQ1MDY0MjF9.Sf_f_UMc0O7pVw9cl4lpE_FzL_ZBxZnsslZAnUWxPeI');
  const [id, setId] = useState('');

  const new_state = (name, auth) => {
    setStates(name);
    setToken(auth);
    console.log(name,auth);
  }

  return (
    <RouterProvider router={router} />
  );
}

export default App;
