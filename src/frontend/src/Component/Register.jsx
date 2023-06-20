import React from "react";
import { useState } from "react";  

export const Register = (props) => {
  const [_email, set_Email] = useState('');
  const [_name, set_Name] = useState('');
  const [_firstname,set_Firstname] = useState('');
  const [_password, set_Password] = useState('');
  const [connection_status, setConnection_status] = useState('');
  const [auth, setAuth] = useState('');

  const handleSubmit = async (check_data) => {
    check_data.preventDefault();
    const request = {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify ({
        email: _email,
        name: _name,
        firstname: _firstname,
        password: _password,
      })
    };
    try {
      const response = await fetch('/register', request);
      const data = await response.json();
      props.token(data.token);
      response.ok === "true" ? setConnection_status("connected") : setConnection_status(`${response.ok}`);
    } catch(err) {
      console.log(err);
    }
  }

    return (
      <div className="App">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label><p></p>
          <input onChange={(check_data) => set_Email(check_data.target.value)} type="email" placeholder="Email" /><p></p>
          <label htmlFor="lastname">Last name</label><p></p>
          <input onChange={(check_data) => set_Name(check_data.target.value)} type="text" placeholder="lastname" /><p></p>
          <label htmlFor="firstname">First name</label><p></p>
          <input onChange={(check_data) => set_Firstname(check_data.target.value)} type="text" placeholder="firstname" /><p></p>
          <label htmlFor="password">Password</label><p></p>
          <input onChange={(check_data) => set_Password(check_data.target.value)} type="password" placeholder="*******" /><p></p>
          <button type="submit">register</button>
        </form>
      </div>
    );
}
