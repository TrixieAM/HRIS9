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
  TableContainer,
  Paper,
  Container,
  Typography,
} from "@mui/material";

const PayrollTable = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [payroll, setPayroll] = useState(
    Object.fromEntries(
      [
        "name", "position", "rateNbc188", "nbc594", "increment", "grossSalary",
        "abs", "d", "h", "m", "netSalary", "withholdingTax","personalLifeRetIns", "gsisSalarayLoan", "gsisPolicyLoan", "gfal", "cpl", "mpl", "mplLite","emergencyLoan", "totalGsisDeds",
        "totalPagibigDeds", "philhealth", "disallowance", "landbankSalaryLoan", "earistCreditCoop", "feu", "totalOtherDeds", "totalDeductions",
        "pay1st", "pay2nd", "rtIns", "ec", "pagibigFundCont", "pagibig2", "multiPurpLoan"
      ].map((key) => [key, ""])
    )
  );

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchPayrolls();
  }, []);

  const fetchPayrolls = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/payroll");
      setPayrolls(response.data);
    } catch (error) {
      console.error("Error fetching payroll data", error);
    }
  };

  const handleChange = (e) => {
    setPayroll({ ...payroll, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/payroll/${editingId}`, payroll);
      } else {
        await axios.post("http://localhost:5000/api/payroll", payroll);
      }
      setEditingId(null);
      fetchPayrolls();
      resetForm();
    } catch (error) {
      console.error("Error submitting payroll data", error);
    }
  };

  const handleEdit = (item) => {
    setPayroll(item);
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/payroll/${id}`);
      fetchPayrolls();
    } catch (error) {
      console.error("Error deleting payroll record", error);
    }
  };

  const handleCancel = () => {
    resetForm();
    setEditingId(null);
  };

  const resetForm = () => {
    setPayroll(
      Object.fromEntries(Object.keys(payroll).map((key) => [key, ""]))
    );
  };

  return (
    <Container>
      {/* Header */}
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

      {/* Form Box */}
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          marginBottom: "24px",
        }}
      >
        <Box display="flex" flexWrap="wrap" sx={{ marginBottom: 3, gap: 2 }}>
          {Object.keys(payroll).map((key) => (
            <TextField
              key={key}
              label={key.replace(/([A-Z])/g, " $1").trim()}
              name={key}
              value={payroll[key]}
              onChange={handleChange}
              sx={{ width: "23%", color: "#000000" }}
            />
          ))}
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              backgroundColor: "#6D2323",
              "&:hover": {
                backgroundColor: "#9C2A2A",
              },
              height: "55px",
            }}
          >
            {editingId ? "Update" : "Add"}
          </Button>
          {editingId && (
            <Button
              onClick={handleCancel}
              variant="contained"
              color="error"
              sx={{ height: "55px" }}
            >
              Cancel
            </Button>
          )}
        </Box>
      </Paper>

      {/* Table */}
      <TableContainer component={Paper} sx={{ maxHeight: 500, overflow: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow style={{ backgroundColor: "#6D2323" }}>
              <TableCell style={{ color: "#000000", fontWeight: "bold" }}>No.</TableCell>
              {Object.keys(payroll).map((key) => (
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
                {Object.keys(payroll).map((key) => (
                  <TableCell key={key}>{item[key]}</TableCell>
                ))}
                <TableCell>
                  <Button
                    onClick={() => handleEdit(item)}
                    variant="contained"
                    sx={{
                      backgroundColor: "#6D2323",
                      color: "#FEF9E1",
                      "&:hover": {
                        backgroundColor: "#9C2A2A",
                      },
                      marginRight: "8px",
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(item.id)}
                    variant="contained"
                    color="error"
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
