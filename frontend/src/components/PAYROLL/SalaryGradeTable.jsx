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

const SalaryGradeTable = () => {
  const [salaryGrades, setSalaryGrades] = useState([]);
  const [newSalaryGrade, setNewSalaryGrade] = useState({
    effectivityDate: "",
    sg_number: "",
    step1: "",
    step2: "",
    step3: "",
    step4: "",
    step5: "",
    step6: "",
    step7: "",
    step8: "",
  });
  const [editSalaryGradeId, setEditSalaryGradeId] = useState(null);

  useEffect(() => {
    fetchSalaryGrades();
  }, []);

  const fetchSalaryGrades = async () => {
    const response = await axios.get("http://localhost:5000/salary-grade");
    setSalaryGrades(response.data);
  };

  const addSalaryGrade = async () => {
    if (Object.values(newSalaryGrade).includes("")) {
      console.log("All fields are required");
      return;
    } else {
      await axios.post("http://localhost:5000/salary-grade", newSalaryGrade);
      setNewSalaryGrade({
        effectivityDate: "",
        sg_number: "",
        step1: "",
        step2: "",
        step3: "",
        step4: "",
        step5: "",
        step6: "",
        step7: "",
        step8: "",
      });
      fetchSalaryGrades();
    }
  };

  const updateSalaryGrade = async (id) => {
    const recordToUpdate = salaryGrades.find((record) => record.id === id);
    await axios.put(
      `http://localhost:5000/salary-grade/${id}`,
      recordToUpdate
    );
    setEditSalaryGradeId(null);
    fetchSalaryGrades();
  };

  const deleteSalaryGrade = async (id) => {
    await axios.delete(`http://localhost:5000/salary-grade/${id}`);
    fetchSalaryGrades();
  };

  return (
    <Container>
      {/* Header */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          backgroundColor: "#6D2323", // Maroon color
          color: "#FEF9E1", // Cream color
          padding: "12px 16px",
          borderRadius: "8px",
          marginBottom: "16px",
        }}
      >
        Salary Grade Management
      </Typography>

      {/* Add New Salary Grade Record */}
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          backgroundColor: "#ffffff", // White background
          borderRadius: "8px",
          marginBottom: "24px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Effectivity Date"
              value={newSalaryGrade.effectivityDate}
              onChange={(e) =>
                setNewSalaryGrade({
                  ...newSalaryGrade,
                  effectivityDate: e.target.value,
                })
              }
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Salary Grade Number"
              value={newSalaryGrade.sg_number}
              onChange={(e) =>
                setNewSalaryGrade({
                  ...newSalaryGrade,
                  sg_number: e.target.value,
                })
              }
              fullWidth
            />
          </Grid>
          {[...Array(8)].map((_, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <TextField
                label={`Step ${index + 1}`}
                value={newSalaryGrade[`step${index + 1}`]}
                onChange={(e) =>
                  setNewSalaryGrade({
                    ...newSalaryGrade,
                    [`step${index + 1}`]: e.target.value,
                  })
                }
                fullWidth
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button
              onClick={addSalaryGrade}
              variant="contained"
              sx={{
                backgroundColor: "#6D2323", // Maroon for Add button
                '&:hover': { backgroundColor: "#9C2A2A" }, // Darker maroon hover
                height: "55px",
              }}
            >
              Add Salary Grade
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Salary Grade Table */}
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: "#6D2323" }}>
            <TableCell style={{ color: "#FEF9E1", fontWeight: "bold" }}>
              ID
            </TableCell>
            <TableCell style={{ color: "#FEF9E1", fontWeight: "bold" }}>
              Effectivity Date
            </TableCell>
            <TableCell style={{ color: "#FEF9E1", fontWeight: "bold" }}>
              Salary Grade Number
            </TableCell>
            {[...Array(8)].map((_, index) => (
              <TableCell
                key={index}
                style={{ color: "#FEF9E1", fontWeight: "bold" }}
              >
                Step {index + 1}
              </TableCell>
            ))}
            <TableCell style={{ color: "#FEF9E1", fontWeight: "bold" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {salaryGrades.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.id}</TableCell>
              <TableCell>
                {editSalaryGradeId === record.id ? (
                  <TextField
                    value={record.effectivityDate}
                    onChange={(e) => {
                      const updatedRecord = {
                        ...record,
                        effectivityDate: e.target.value,
                      };
                      setSalaryGrades((prevData) =>
                        prevData.map((rec) =>
                          rec.id === record.id ? updatedRecord : rec
                        )
                      );
                    }}
                    size="small"
                    variant="outlined"
                  />
                ) : (
                  record.effectivityDate
                )}
              </TableCell>
              <TableCell>
                {editSalaryGradeId === record.id ? (
                  <TextField
                    value={record.sg_number}
                    onChange={(e) => {
                      const updatedRecord = {
                        ...record,
                        sg_number: e.target.value,
                      };
                      setSalaryGrades((prevData) =>
                        prevData.map((rec) =>
                          rec.id === record.id ? updatedRecord : rec
                        )
                      );
                    }}
                    size="small"
                    variant="outlined"
                  />
                ) : (
                  record.sg_number
                )}
              </TableCell>
              {[...Array(8)].map((_, index) => (
                <TableCell key={index}>
                  {editSalaryGradeId === record.id ? (
                    <TextField
                      value={record[`step${index + 1}`]}
                      onChange={(e) => {
                        const updatedRecord = {
                          ...record,
                          [`step${index + 1}`]: e.target.value,
                        };
                        setSalaryGrades((prevData) =>
                          prevData.map((rec) =>
                            rec.id === record.id ? updatedRecord : rec
                          )
                        );
                      }}
                      size="small"
                      variant="outlined"
                    />
                  ) : (
                    record[`step${index + 1}`]
                  )}
                </TableCell>
              ))}
              <TableCell>
                {editSalaryGradeId === record.id ? (
                  <>
                    <Button
                      onClick={() => updateSalaryGrade(record.id)}
                      variant="contained"
                      sx={{
                        backgroundColor: "#6D2323",
                        color: "#FEF9E1",
                        "&:hover": { backgroundColor: "#9C2A2A" },
                        marginRight: "8px",
                      }}
                    >
                      Update
                    </Button>
                    <Button
                      onClick={() => setEditSalaryGradeId(null)}
                      variant="contained"
                      color="error"
                      sx={{
                        backgroundColor: "#000000",
                        color: "#ffffff",
                        "&:hover": { backgroundColor: "#333333" },
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => setEditSalaryGradeId(record.id)}
                      variant="contained"
                      sx={{
                        backgroundColor: "#6D2323",
                        color: "#FEF9E1",
                        "&:hover": { backgroundColor: "#9C2A2A" },
                        marginRight: "8px",
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => deleteSalaryGrade(record.id)}
                      variant="contained"
                      color="error"
                      sx={{
                        backgroundColor: "#000000",
                        color: "#ffffff",
                        "&:hover": { backgroundColor: "#333333" },
                      }}
                    >
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

export default SalaryGradeTable;
