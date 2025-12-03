import React, { useEffect, useState } from "react";

import { Box, Paper, Typography, Button, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UserInfo = () => {
  const { userId } = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  let [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/${userId}`);
        setUser(res.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  if (loading) return <CircularProgress />

  if (!user) return <Typography>User Not Found! </Typography>
  if (error) return <Typography>{error}</Typography>

  return (
    <div>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5ff",
          p: 2,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: 4,
            width: "100%",
            maxWidth: 400,
            textAlign: "center",
            borderRadius: 3,
          }}
        >
          <Typography variant="h5" gutterBottom fontWeight="bold">
            User Details
          </Typography>

          <Typography sx={{ mb: 1 }}>
            <b>ID:</b> {user.id}
          </Typography>
          <Typography sx={{ mb: 1 }}>
            <b>Name:</b> {user.firstName} {user.lastName}
          </Typography>
          <Typography sx={{ mb: 1 }}>
            <b>Email:</b> {user.email}
          </Typography>
          <Typography sx={{ mb: 2 }}>
            <b>Phone:</b> {user.phoneNumber}
          </Typography>

          <Button variant="contained" fullWidth onClick={() => navigate(-1)}>
            Back
          </Button>
        </Paper>
      </Box>
    </div>
  );
};

export default UserInfo;
