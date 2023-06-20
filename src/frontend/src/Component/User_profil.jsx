import React from "react";
import { useState } from "react";  
import { Update } from "./Modify_user";

export const User = (props) => {
  const [_id, set_Id] = useState('');
  const [_email, set_Email] = useState('');
  const [_name, set_Name] = useState('');
  const [_firstname,set_Firstname] = useState('');
  const [_created_at, set_Created_at] = useState('');

  const handleSubmit = async () => {
    const request = {
      method: "GET",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        "auth-token": props.token,
      },
    };
    try {
      const response = await fetch('/user', request);
      const data = await response.json();
      console.log(data);
      set_Email(data.email);
      set_Id(data.id);
      set_Name(data.last_name);
      set_Firstname(data.first_name);
      set_Created_at((data.created_at).slice(0, 10));
    } catch (err) {
      console.error(err);
    }
  }
  if (props.currentview == 'false') {
    handleSubmit();
    props.view('true');
  }

  return (
    <div className="App">
        <form>
        <p>n°{_id}</p>
        <p>Email : {_email}</p>
        <p>Nom : {_name}</p>
        <p>Prénom : {_firstname}</p>
        <p>Date de création : {_created_at}</p>
        <button>Modify account</button>
        <button>Delete account</button>
      </form>
    </div>
  );
}