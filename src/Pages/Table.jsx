import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Table.css";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

const Table = () => {
  const [users, setUsers] = useState("");
  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        console.log("frg", data);
      })
      .catch((err) => console.error(err.message));
  }, []);
  const RemoveUser = async (id) => {
    if (window.confirm("Really going to delete this user?")) {
      try {
        const res = await axios.delete(`http://localhost:8000/users/${id}`);
        window.location.reload();
      } catch (error) {
        console.error(error.message);
        window.alert("Error deleting user");
      }
    }
    return;
  };
  return (
    <div>
      <div className="table-container">
        <h2>Student Records</h2>
        <Link to={"/createNew"} className="add-btn">
          Add New Student
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>S/N</th>
              <th>NAME</th>
              <th>PLACE</th>
              <th>PHONE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.place}</td>
                  <td>{item.phone}</td>
                  <td>
                    <Link to={`/viewUser/${item.id}`} className="view">
                      View
                    </Link>
                    <Link to={`/editJsonUser/${item.id}`} className="edit">
                      Edit
                    </Link>
                    <button
                      onClick={() => {
                        RemoveUser(item.id);
                      }}
                      className="delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
