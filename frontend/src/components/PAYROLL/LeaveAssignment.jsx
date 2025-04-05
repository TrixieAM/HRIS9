import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Container,
  Typography,
  Grid,
  Paper,
} from "@mui/material";


const LeaveAssignment = () => {
  const [leaveAssignments, setLeaveAssignments] = useState([]);
  const [form, setForm] = useState({
    employeeID: "",
    leaveID: "",
    noOfLeaves: "",
  });
  const [editingId, setEditingId] = useState(null);


  useEffect(() => {
    fetchLeaveAssignments();
  }, []);


  const fetchLeaveAssignments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/leave_assignment");
      setLeaveAssignments(res.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/leave_assignment/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post("http://localhost:5000/leave_assignment", form);
      }
      setForm({ employeeID: "", leaveID: "", noOfLeaves: "" });
      fetchLeaveAssignments();
    } catch (error) {
      console.error("Error saving data", error);
    }
  };


  const handleEdit = (assignment) => {
    setForm({
      employeeID: assignment.employeeID,
      leaveID: assignment.leaveID,
      noOfLeaves: assignment.noOfLeaves,
    });
    setEditingId(assignment.id);
  };


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/leave_assignment/${id}`);
      fetchLeaveAssignments();
    } catch (error) {
      console.error("Error deleting data", error);
    }
  };


  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Leave Assignment Management
      </Typography>


      {/* Form for Adding/Updating Leave Assignments */}
      <Paper elevation={2} style={{ padding: "16px", marginBottom: "24px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Employee ID"
              type="number"
              name="employeeID"
              value={form.employeeID}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Leave ID"
              type="number"
              name="leaveID"
              value={form.leaveID}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="No. of Leaves"
              type="number"
              name="noOfLeaves"
              value={form.noOfLeaves}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              {editingId ? "Update" : "Add"} Leave Assignment
            </Button>
          </Grid>
        </Grid>
      </Paper>


      {/* Leave Assignments Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Employee ID</TableCell>
            <TableCell>Leave ID</TableCell>
            <TableCell>No. of Leaves</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaveAssignments.map((assignment) => (
            <TableRow key={assignment.id}>
              <TableCell>{assignment.id}</TableCell>
              <TableCell>
                {editingId === assignment.id ? (
                  <TextField
                    value={form.employeeID}
                    name="employeeID"
                    onChange={handleChange}
                    size="small"
                    variant="outlined"
                  />
                ) : (
                  assignment.employeeID
                )}
              </TableCell>
              <TableCell>
                {editingId === assignment.id ? (
                  <TextField
                    value={form.leaveID}
                    name="leaveID"
                    onChange={handleChange}
                    size="small"
                    variant="outlined"
                  />
                ) : (
                  assignment.leaveID
                )}
              </TableCell>
              <TableCell>
                {editingId === assignment.id ? (
                  <TextField
                    value={form.noOfLeaves}
                    name="noOfLeaves"
                    onChange={handleChange}
                    size="small"
                    variant="outlined"
                  />
                ) : (
                  assignment.noOfLeaves
                )}
              </TableCell>
              <TableCell>
                {editingId === assignment.id ? (
                  <>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                      Save
                    </Button>
                    <Button
                      onClick={() => {
                        setEditingId(null);
                        setForm({ employeeID: "", leaveID: "", noOfLeaves: "" });
                      }}
                      variant="contained"
                      color="error"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => handleEdit(assignment)} variant="contained" color="primary">
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(assignment.id)} variant="contained" color="error">
                      Delete
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};


export default LeaveAssignment;



