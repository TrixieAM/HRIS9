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
        Department Table
      </Typography>

      {/* Form Box for Department Table (white background) */}
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
          <TextField
            label="CODE"
            name="code"
            value={form.code}
            onChange={handleChange}
            required
            sx={{ width: "180px" }}
          />
          <TextField
            label="DESCRIPTION"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            sx={{ width: "180px" }}
          />
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
      <Box sx={{ overflowX: "auto", width: "100%" }}>
        <Table sx={{ minWidth: "800px", tableLayout: "auto" }}>
          <TableHead>
            <TableRow style={{ backgroundColor: "#6D2323" }}>
              <TableCell style={{ color: "#FEF9E1", fontWeight: "bold" }}>NO.</TableCell>
              <TableCell style={{ color: "#FEF9E1", fontWeight: "bold" }}>CODE</TableCell>
              <TableCell style={{ color: "#FEF9E1", fontWeight: "bold" }}>DESCRIPTION</TableCell>
              <TableCell style={{ color: "#FEF9E1", fontWeight: "bold" }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.code}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleEdit(item)}
                    sx={{
                      backgroundColor: "#6D2323", // Maroon for Edit
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

export default DepartmentTable;
