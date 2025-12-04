import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./viewUser.css";

const ViewUser = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8000/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  return (
    <>
      <div className="userData">
        <h2>User Details</h2>

        {userData && (
          <div className="userDetails">
            <p>
              <strong>ID: </strong>
              {userData.id}
            </p>
            <p>
              <strong>Name: </strong>
              {userData.name}
            </p>
            <p>
              <strong>Place: </strong>
              {userData.place}
            </p>
            <p>
              <strong>Phone: </strong>
              {userData.phone}
            </p>
          </div>
        )}
        <Link to={"/"} className="back-btn">
          Back
        </Link>
      </div>
    </>
  );
};
export default ViewUser;
