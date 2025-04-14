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
  Paper,
  Typography,
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
      {/* Header */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          backgroundColor: "#6D2323",
          color: "#FEF9E1",
          padding: "12px 16px",
          borderRadius: "8px",
          mb: 4,
        }}
      >
        Department Assignment
      </Typography>

      {/* Form Box for Department Assignment (white background) */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          backgroundColor: "#ffffff", // White background
          borderRadius: "8px",
        }}
      >
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {Object.keys(form).map((key) => (
            <TextField
              key={key}
              label={key.replace(/([A-Z])/g, " $1").toUpperCase()}
              name={key}
              value={form[key]}
              onChange={handleChange}
              required
              sx={{ width: "180px" }}
            />
          ))}
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#6D2323", // Maroon for Add/Update
              "&:hover": {
                backgroundColor: "#9C2A2A", // Darker maroon for hover
              },
            }}
          >
            {editingId ? "Update" : "Add"}
          </Button>
          {editingId && (
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              onClick={resetForm}
              sx={{
                borderColor: "#000000", // Black border for Cancel
                color: "#000000", // Black text for Cancel
                "&:hover": {
                  backgroundColor: "#f0f0f0", // Light grey hover
                  borderColor: "#000000", // Keep black border on hover
                },
              }}
            >
              Cancel
            </Button>
          )}
        </Box>
      </Paper>

      {/* Data Table */}
      <Box sx={{ overflowX: "auto", width: "100%", backgroundColor: "white"}}>
        <Table sx={{ minWidth: "800px", tableLayout: "auto" }}>
          <TableHead>
            <TableRow style={{ backgroundColor: "#6D2323" }}>
              <TableCell style={{ color: "#FEF9E1", fontWeight: "bold" }}>NO.</TableCell>
              <TableCell style={{ color: "#FEF9E1", fontWeight: "bold" }}>Department ID</TableCell>
              <TableCell style={{ color: "#FEF9E1", fontWeight: "bold" }}>Employee ID</TableCell>
              <TableCell style={{ color: "#FEF9E1", fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.department_id}</TableCell>
                <TableCell>{item.employeeID}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleEdit(item)}
                    sx={{
                      backgroundColor: "#6D2323", // Maroon for Edit
                      marginRight: "10px",
                      color: "#FEF9E1", // Cream text color
                      "&:hover": {
                        backgroundColor: "#9C2A2A", // Darker maroon on hover
                      },
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(item.id)}
                    sx={{
                      backgroundColor: "#000000", // Black background for Delete
                      color: "#ffffff", // White text
                      "&:hover": {
                        backgroundColor: "#333333", // Darker black on hover
                      },
                    }}
                  >
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

export default DepartmentAssignment;
