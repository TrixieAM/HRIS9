import React, { useState } from "react";
import axios from 'axios';
import {
  Box,
  TextField,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const AllAttendanceRecord = () => {
  const [personID, setPersonID] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [records, setRecords] = useState([]);
  const [submittedID, setSubmittedID] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/attendance/api/attendance",
        { personID, startDate, endDate }
      );
      setRecords(response.data);
      setSubmittedID(personID); // Store the submitted PersonID to display
    } catch (error) {
      console.error("Error fetching attendance records:", error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Attendance Record Search
      </Typography>

      <TextField
        label="Person ID"
        variant="outlined"
        value={personID}
        onChange={(e) => setPersonID(e.target.value)}
        required
        sx={{ width: "180px", marginLeft: "10px" }}
      />
      <TextField
        label="Start Date"
        type="date"
        sx={{ width: "180px", marginLeft: "10px" }}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
      />
      <TextField
        label="End Date"
        type="date"
        sx={{ width: "180px", marginLeft: "10px" }}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        required
      />
      <Button
        sx={{ width: "200px", height: "55px", marginLeft: "10px" }}
        variant="contained"
        type="submit"
        color="primary"
        onClick={handleSubmit}
      >
        Search
      </Button>

      {submittedID && (
        <Typography variant="h6" sx={{ mt: 4 }}>
          Records for Person ID: {submittedID}
        </Typography>
      )}

      {records.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 4 }} style={{marginBottom: '5%'}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>PersonID</strong>
                </TableCell>
                <TableCell>
                  <strong>Date</strong>
                </TableCell>
                <TableCell>
                  <strong>Time</strong>
                </TableCell>
                <TableCell>
                  <strong>AttendanceState</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((record, index) => (
                <TableRow key={index}>
                  <TableCell>{record.PersonID}</TableCell>
                  <TableCell>{record.Date}</TableCell>
                  <TableCell>{record.Time}</TableCell>
                  <TableCell>{record.AttendanceState}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}


      
    </Box>
  );
};

export default AllAttendanceRecord;
