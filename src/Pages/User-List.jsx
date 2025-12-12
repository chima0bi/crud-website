import React, { useEffect } from "react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState()
  const api = `${import.meta.env.VITE_BASE_URL}`;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get(api);
        console.log("Response", res);
        setUsers(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchUsers();
  }, [api]);

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user? ")) {
      // if (!confirm) return;
      try {
        const res = await axios.delete(
          `${import.meta.env.VITE_BASE_URL}/delete/${id}`
        );
        window.location.reload();
      } catch (error) {
        console.error(error);
        alert("Failed to delete User");
      }
    }
  };

  if (loading)
    return (
      <CircularProgress
        style={{ alignSelf: "center", justifySelf: "center" }}
      />
    );

  return (
    <div>
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          All Registered Users
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>S/N</b>
                </TableCell>
                <TableCell>
                  <b>Name</b>
                </TableCell>
                <TableCell>
                  <b>Email</b>
                </TableCell>
                <TableCell align="center">
                  <b>Actions</b>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <TableRow key={user._id}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>
                      {user.firstName} {user.lastName}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell align="center">
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="center"
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => navigate(`/userInfo/${user._id}`)}
                        >
                          View
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={() => navigate(`/editUser/${user._id}`)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => deleteUser(user._id)}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default UserList;
