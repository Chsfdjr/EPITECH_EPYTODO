import React from "react";
import { useState } from "react";  

export const Delete = (props) => {
  const handleSubmit = async (check_data) => {
    console.log(props.token)
    check_data.preventDefault();
    const request = {
      method: "DELETE",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        "auth-token": props.token,
      },
    };
    try {
      const response = await fetch(`/users/9`, request);
      const data = await response.json();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="App">
        <form onSubmit={handleSubmit}>
        <button type="submit">Delete account</button>
      </form>
    </div>
  );
}