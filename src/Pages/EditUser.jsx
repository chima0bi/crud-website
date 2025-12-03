import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const { userId } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const [userToEdit, setUserToEdit] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const formData = { firstName, lastName, email };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `https://students-learning-api.onrender.com/api/auth/${userId}`
        );
        setUserToEdit({
          firstName: data.firstName ?? "",
          lastName: data.lastName ?? "",
          email: data.email ?? "",
        });

        // console.log(UserToEdit.firstName);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [userId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(
        `https://students-learning-api.onrender.com/api/auth/update/${userId}`,
        formData
      );
      console.log(res.response);
      setLoading(false);
      navigate("/UserList");
    } catch (err) {
      console.error(error);
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    setFirstName(userToEdit.firstName);
    setLastName(userToEdit.lastName);
    setEmail(userToEdit.email);
  }, [userToEdit.firstName, userToEdit.lastName, userToEdit.email]);

  return (
    <div>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
          p: 2,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: 4,
            width: "100%",
            maxWidth: 400,
            borderRadius: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Update User
          </Typography>

          <Alert severity="info" sx={{ mb: 2 }}>
            {error}
          </Alert>

          <form onSubmit={handleUpdate}>
            <TextField
              label="First Name"
              name="firstName"
              fullWidth
              margin="normal"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              label="Last Name"
              name="lastName"
              fullWidth
              margin="normal"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              label="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress /> : "Update"}
            </Button>

            <Button
              variant="outlined"
              onClick={() => navigate(-1)}
              fullWidth
              sx={{ mt: 1 }}
            >
              Cancel
            </Button>
          </form>
        </Paper>
      </Box>
    </div>
  );
};

export default EditUser;
