import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Container,
  Typography,
} from "@mui/material";

const PayrollTable = () => {
  const [payrolls, setPayrolls] = useState([]);

  const [payrollKeys, setPayrollKeys] = useState([]);
  const [remittance, setRemittance] = useState([]);


  useEffect(() => {
    fetchPayrolls();
    fetchRemittance();
  }, []);

  const fetchPayrolls = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/payroll");
      setPayrolls(response.data);
      if (response.data.length > 0) {
        setPayrollKeys(Object.keys(response.data[0]).filter(key => key !== "id"));
      }
    } catch (error) {
      console.error("Error fetching payroll data", error);
    }
  };

  const fetchRemittance = async () => {
    try {
      const response = await axios.get("http://localhost:5000/payroll-remittance");
      console.log("Remittance Data:", response.data);  // Log the data here
      setRemittance(response.data);
      if (response.data.length > 0) {
        setPayrollKeys(Object.keys(response.data[0]).filter(key => key !== "id"));
      }
    } catch (error) {
      console.error("Error fetching remittance data", error);
    }
  };
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/payroll/${id}`);
      fetchPayrolls();
    } catch (error) {
      console.error("Error deleting payroll record", error);
    }
  };

  return (
    <Container>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          backgroundColor: "#6D2323",
          color: "#ffffff",
          padding: "12px 16px",
          borderRadius: "8px",
          marginBottom: "16px",
        }}
      >
        Payroll Register for Regular Employees
      </Typography>

      <TableContainer component={Paper} sx={{ maxHeight: 500, overflow: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow style={{ backgroundColor: "#6D2323" }}>
              <TableCell style={{ color: "#000000", fontWeight: "bold" }}>No.</TableCell>
              {payrollKeys.map((key) => (
                <TableCell key={key} style={{ color: "#000000", fontWeight: "bold" }}>
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </TableCell>
              ))}
              <TableCell style={{ color: "#000000", fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payrolls.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                {payrollKeys.map((key) => (
                  <TableCell key={key}>{item[key]}</TableCell>
                ))}
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(item.id)}
                    sx={{
                      backgroundColor: "#000000",
                      color: "#ffffff",
                      "&:hover": {
                        backgroundColor: "#333333",
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
      </TableContainer>
    </Container>
  );
};

export default PayrollTable;
