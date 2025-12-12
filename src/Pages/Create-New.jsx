import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CreateNew.css";
// import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreateNew = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [place, setPlace] = useState("");
  const [phone, setPhone] = useState("");
  const [validation, setValidation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { id, name, place, phone };
    console.log(userData);

    fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        console.log(res);
        alert("User created successfully");
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <div className="form-container">
        <h2>Create New User</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="id">ID: </label>
          <input
            type="number"
            id="id"
            name="id"
            required
            value={id}
            onChange={(e) => setId(e.target.value)}
            onMouseDown={() => setValidation(true)}
          />
          {id.length === 0 && validation && (
            <span className="inputError">please enter an ID</span>
          )}
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            onMouseDown={() => setValidation(true)}
          />
          {name.length === 0 && validation && (
            <span className="inputError">please enter your name</span>
          )}
          <label htmlFor="place">Place: </label>
          <input
            type="text"
            id="place"
            name="place"
            required
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            onMouseDown={() => setValidation(true)}
          />
          {place.length === 0 && validation && (
            <span className="inputError">please enter your location</span>
          )}
          <label htmlFor="phone">Phone: </label>
          <input
            type="tel"
            maxLength="11"
            id="phone"
            name="phone"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onMouseDown={() => setValidation(true)}
          />
          {phone.length === 0 && validation && (
            <span className="inputError">please enter your phone number</span>
          )}
          <div className="form-buttons">
            <button type="submit">Save</button>
            <Link to={"/"}>Back</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNew;
