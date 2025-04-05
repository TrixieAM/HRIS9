import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Container,
} from "@mui/material";


const DepartmentAssignment = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    department_id: "",
    employeeID: "",
  });


  const [editingId, setEditingId] = useState(null);


  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/department-assignment");
      setData(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };


  const handleChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/department-assignment/${editingId}`, form);
      } else {
        await axios.post("http://localhost:5000/api/department-assignment", form);
      }
      resetForm();
      fetchData();
    } catch (error) {
      console.error("Error submitting data", error);
    }
  };


  const handleEdit = (item) => {
    setForm({ department_id: item.department_id, employeeID: item.employeeID });
    setEditingId(item.id);
  };


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/department-assignment/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting record", error);
    }
  };


  const resetForm = () => {
    setForm({ department_id: "", employeeID: "" });
    setEditingId(null);
  };


  return (
    <Container>
      <h2>Department Assignment</h2>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {Object.keys(form).map((key) => (
          <TextField
            key={key}
            label={key.replace(/([A-Z])/g, " $1").toUpperCase()}
            name={key}
            value={form[key]}
            onChange={handleChange}
            required
          />
        ))}
        <Button type="submit" variant="contained" color="primary">
          {editingId ? "Update" : "Add"}
        </Button>
        {editingId && (
          <Button type="button" variant="outlined" color="secondary" onClick={resetForm}>
            Cancel
          </Button>
        )}
      </Box>


      <Box sx={{ overflowX: "auto", width: "100%" }}>
        <Table sx={{ minWidth: "800px", tableLayout: "auto" }}>
          <TableHead>
            <TableRow>
              <TableCell>NO.</TableCell>
              <TableCell>Department ID</TableCell>
              <TableCell>Employee ID</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.department_id}</TableCell>
                <TableCell>{item.employeeID}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(item)}>Edit</Button>
                  <Button onClick={() => handleDelete(item.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Container>
  );
};


export default DepartmentAssignment;



