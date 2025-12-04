import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Table.css";
// import { useNavigate } from "react-router-dom";

const Table = () => {
  const [users, setUsers] = useState("");
  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err.message));
  }, []);
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
              users.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
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
                    <Link className="delete">Delete</Link>
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
