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


const DepartmentTable = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    code: "",
    description: "",
  });


  const [editingId, setEditingId] = useState(null);


  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/department-table");
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
        await axios.put(`http://localhost:5000/api/department-table/${editingId}`, form);
      } else {
        await axios.post("http://localhost:5000/api/department-table", form);
      }
      resetForm();
      fetchData();
    } catch (error) {
      console.error("Error submitting data", error);
    }
  };


  const handleEdit = (item) => {
    setForm({
      code: item.code,
      description: item.description,
    });
    setEditingId(item.id);
  };


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/department-table/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting record", error);
    }
  };


  const resetForm = () => {
    setForm({ code: "", description: "" });
    setEditingId(null);
  };


  return (
    <Container>
      <h2>Department Table</h2>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <TextField
          label="CODE"
          name="code"
          value={form.code}
          onChange={handleChange}
          required
        />
        <TextField
          label="DESCRIPTION"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        />
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
              <TableCell>CODE</TableCell>
              <TableCell>DESCRIPTION</TableCell>
              <TableCell>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.code}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(item)} variant="outlined" sx={{ mr: 1 }}>
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(item.id)} variant="contained" >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Container>
  );
};


export default DepartmentTable;



