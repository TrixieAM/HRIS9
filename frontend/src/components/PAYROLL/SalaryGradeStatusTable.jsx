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
  Select,
  MenuItem,
} from "@mui/material";

const SalaryGradeStatusTable = () => {
  const [records, setRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({
    effectivityDate: "",
    step_number: "",
    status: "1", // Default to Active
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    const response = await axios.get("http://localhost:5000/api/salary-grade-status");
    setRecords(response.data);
  };

  const addRecord = async () => {
    if (!newRecord.effectivityDate || !newRecord.step_number) {
      alert("All fields are required");
      return;
    }

    await axios.post("http://localhost:5000/api/salary-grade-status", newRecord);
    setNewRecord({ effectivityDate: "", step_number: "", status: "1" });
    fetchRecords();
  };

  const updateRecord = async (id) => {
    const recordToUpdate = records.find((record) => record.id === id);
    await axios.put(`http://localhost:5000/api/salary-grade-status/${id}`, recordToUpdate);
    setEditId(null);
    fetchRecords();
  };

  const deleteRecord = async (id) => {
    await axios.delete(`http://localhost:5000/api/salary-grade-status/${id}`);
    fetchRecords();
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Salary Grade Status Management
      </Typography>

      <Paper elevation={2} style={{ padding: "16px", marginBottom: "24px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Effectivity Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={newRecord.effectivityDate}
              onChange={(e) => setNewRecord({ ...newRecord, effectivityDate: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Step Number"
              value={newRecord.step_number}
              onChange={(e) => setNewRecord({ ...newRecord, step_number: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Select
              value={newRecord.status}
              onChange={(e) => setNewRecord({ ...newRecord, status: e.target.value })}
              fullWidth
            >
              <MenuItem value="1">Active</MenuItem>
              <MenuItem value="0">Inactive</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={addRecord} variant="contained" color="primary">
              Add Record
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Effectivity Date</TableCell>
            <TableCell>Step Number</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.id}</TableCell>
              <TableCell>
                {editId === record.id ? (
                  <TextField
                    type="date"
                    value={record.effectivityDate}
                    onChange={(e) => {
                      const updated = { ...record, effectivityDate: e.target.value };
                      setRecords((prev) => prev.map((r) => (r.id === record.id ? updated : r)));
                    }}
                  />
                ) : (
                  record.effectivityDate
                )}
              </TableCell>
              <TableCell>
                {editId === record.id ? (
                  <TextField
                    value={record.step_number}
                    onChange={(e) => {
                      const updated = { ...record, step_number: e.target.value };
                      setRecords((prev) => prev.map((r) => (r.id === record.id ? updated : r)));
                    }}
                  />
                ) : (
                  record.step_number
                )}
              </TableCell>
              <TableCell>
                {editId === record.id ? (
                  <Select
                    value={record.status}
                    onChange={(e) => {
                      const updated = { ...record, status: e.target.value };
                      setRecords((prev) => prev.map((r) => (r.id === record.id ? updated : r)));
                    }}
                  >
                    <MenuItem value="1">Active</MenuItem>
                    <MenuItem value="0">Inactive</MenuItem>
                  </Select>
                ) : (
                  record.status === "1" ? "Active" : "Inactive"
                )}
              </TableCell>
              <TableCell>
                {editId === record.id ? (
                  <>
                    <Button onClick={() => updateRecord(record.id)} variant="contained">
                      Save
                    </Button>
                    <Button onClick={() => setEditId(null)} variant="outlined" color="error" style={{ marginLeft: "8px" }}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => setEditId(record.id)}>Edit</Button>
                    <Button onClick={() => deleteRecord(record.id)} color="error">
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

export default SalaryGradeStatusTable;
