import React from "react";
import { useState } from "react";  

export const Update = (props) => {
  const [_email, set_Email] = useState('');
  const [_name, set_Name] = useState('');
  const [_firstname,set_Firstname] = useState('');
  const [_password, set_Password] = useState('');

  const handleSubmit = async (check_data) => {
    check_data.preventDefault();
    const request = {
      method: "PUT",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        "auth-token": props.token,
      },
      body: JSON.stringify ({
        email: _email,
        name: _name,
        firstname: _firstname,
        password: _password,
      })
    };
    try {
      const response = await fetch('/users/8', request);
      const data = await response.json();
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label><p></p>
        <input onChange={(check_data) => set_Email(check_data.target.value)} type="email" placeholder="Email" /><p></p>
        <label htmlFor="password">Password</label><p></p>
        <input onChange={(check_data) => set_Password(check_data.target.value)} type="password" placeholder="*******" /><p></p>
        <label htmlFor="lastname">Last name</label><p></p>
        <input onChange={(check_data) => set_Name(check_data.target.value)} type="text" placeholder="lastname" /><p></p>
        <label htmlFor="firstname">First name</label><p></p>
        <input onChange={(check_data) => set_Firstname(check_data.target.value)} type="text" placeholder="firstname" /><p></p>
        <button type="submit">Modify account</button>
        <button type="submit">Cancel</button>
      </form>
    </div>
  );
}
