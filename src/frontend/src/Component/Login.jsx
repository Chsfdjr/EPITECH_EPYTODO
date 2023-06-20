import React from "react";
import { useState } from "react";  

export const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        email,
        password,
      })
    };
    console.log(email, password);
    try {
      const response = await fetch('/login', request);
      const data = await response.json();
      setAuth(data.token);
      props.token(auth);
      console.log(auth);
      response.ok === "true" ? setConnection_status('login') : setConnection_status(`${response.ok}`);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label><p></p>
        <input onChange={(check_data) => setEmail(check_data.target.value)} type="email" placeholder="Email" /><p></p>
        <label htmlFor="password">Password</label><p></p>
        <input onChange={(check_data) => setPassword(check_data.target.value)} type="password" placeholder="*******" /><p></p>
        <button type="submit">login</button>
        <button>test</button>
      </form>
    </div>
  );
}
