import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const EditJsonUser = () => {
  const userId = useParams().userId;
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState("");

  const navigate = useNavigate();

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:8000/users/${userId}`, {
        id,
        name,
        place,
        phone,
      });
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:8000/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Returned User", data);
        setUser(data);
        setId(data.id);
        setName(data.name);
        setPlace(data.place);
        setPhone(data.phone);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [userId]);

  return (
    <div className="form-container">
      <h2>Edit User Details</h2>
      <form onSubmit={updateUser}>
        <label htmlFor="id" name="id">
          ID:
        </label>
        <input
          type="number"
          id="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <label htmlFor="name" name="name">
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="place" name="place">
          Place:
        </label>
        <input
          type="text"
          id="place"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
        <label htmlFor="phone" name="phone">
          Phone:
        </label>
        <input
          type="tel"
          maxLength="11"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <div className="form-buttons">
          <button type="submit">Update</button>
          <Link to={"/"}>Cancel</Link>
        </div>
      </form>
    </div>
  );
};
export default EditJsonUser;
