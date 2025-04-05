import React, { useState, useEffect } from "react";
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

const ItemTable = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    item_description: "",
    employeeID: "",
    item_code: "",
    salary_grade: "",
  });
  const [editItemId, setEditItemId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await axios.get("http://localhost:5000/api/item-table");
    const formattedData = response.data.map(item => ({
      ...item,
      created_at: new Date(item.created_at).toLocaleString(), // Fix invalid date
    }));
    setItems(formattedData);
  };

  const addItem = async () => {
    await axios.post("http://localhost:5000/api/item-table", newItem);
    setNewItem({ item_description: "", employeeID: "", item_code: "", salary_grade: "" });
    fetchItems();
  };

  const updateItem = async (id) => {
    const recordToUpdate = items.find((record) => record.id === id);
    await axios.put(`http://localhost:5000/api/item-table/${id}`, recordToUpdate);
    setEditItemId(null);
    fetchItems();
  };

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5000/api/item-table/${id}`);
    fetchItems();
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Item Table Management
      </Typography>

      {/* Add New Item */}
      <Paper elevation={2} style={{ padding: "16px", marginBottom: "24px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Item Description"
              value={newItem.item_description}
              onChange={(e) => setNewItem({ ...newItem, item_description: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Employee ID"
              value={newItem.employeeID}
              onChange={(e) => setNewItem({ ...newItem, employeeID: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Item Code"
              value={newItem.item_code}
              onChange={(e) => setNewItem({ ...newItem, item_code: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Salary Grade"
              value={newItem.salary_grade}
              onChange={(e) => setNewItem({ ...newItem, salary_grade: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={addItem} variant="contained" color="primary">
              Add Item
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Item Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Item Description</TableCell>
            <TableCell>Employee ID</TableCell>
            <TableCell>Item Code</TableCell>
            <TableCell>Salary Grade</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.id}</TableCell>
              <TableCell>
                {editItemId === record.id ? (
                  <TextField
                    value={record.item_description}
                    onChange={(e) => {
                      const updatedRecord = { ...record, item_description: e.target.value };
                      setItems((prevData) =>
                        prevData.map((rec) => (rec.id === record.id ? updatedRecord : rec))
                      );
                    }}
                    size="small"
                    variant="outlined"
                  />
                ) : (
                  record.item_description
                )}
              </TableCell>
              <TableCell>
                {editItemId === record.id ? (
                  <TextField
                    value={record.employeeID}
                    onChange={(e) => {
                      const updatedRecord = { ...record, employeeID: e.target.value };
                      setItems((prevData) =>
                        prevData.map((rec) => (rec.id === record.id ? updatedRecord : rec))
                      );
                    }}
                    size="small"
                    variant="outlined"
                  />
                ) : (
                  record.employeeID
                )}
              </TableCell>
              <TableCell>
                {editItemId === record.id ? (
                  <TextField
                    value={record.item_code}
                    onChange={(e) => {
                      const updatedRecord = { ...record, item_code: e.target.value };
                      setItems((prevData) =>
                        prevData.map((rec) => (rec.id === record.id ? updatedRecord : rec))
                      );
                    }}
                    size="small"
                    variant="outlined"
                  />
                ) : (
                  record.item_code
                )}
              </TableCell>
              <TableCell>
                {editItemId === record.id ? (
                  <TextField
                    value={record.salary_grade}
                    onChange={(e) => {
                      const updatedRecord = { ...record, salary_grade: e.target.value };
                      setItems((prevData) =>
                        prevData.map((rec) => (rec.id === record.id ? updatedRecord : rec))
                      );
                    }}
                    size="small"
                    variant="outlined"
                  />
                ) : (
                  record.salary_grade
                )}
              </TableCell>
              <TableCell>
                {editItemId === record.id ? (
                  <>
                    <Button onClick={() => updateItem(record.id)} variant="contained" color="primary">
                      Update
                    </Button>
                    <Button onClick={() => setEditItemId(null)} variant="contained" color="error">
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => setEditItemId(record.id)} variant="contained" color="primary">
                      Edit
                    </Button>
                    <Button onClick={() => deleteItem(record.id)} variant="contained" color="error">
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

export default ItemTable;
