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
      <Typography variant="h4" gutterBottom>
        Salary Grade Management
      </Typography>


      {/* Add New Salary Grade Record */}
      <Paper elevation={2} style={{ padding: "16px", marginBottom: "24px" }}>
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
              color="primary"
            >
              Add Salary Grade
            </Button>
          </Grid>
        </Grid>
      </Paper>


      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Effectivity Date</TableCell>
            <TableCell>Salary Grade Number</TableCell>
            {[...Array(8)].map((_, index) => (
              <TableCell key={index}>Step {index + 1}</TableCell>
            ))}
            <TableCell>Actions</TableCell>
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
                      color="primary"
                    >
                      Update
                    </Button>
                    <Button
                      onClick={() => setEditSalaryGradeId(null)}
                      variant="contained"
                      color="error"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => setEditSalaryGradeId(record.id)}
                      variant="contained"
                      color="primary"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => deleteSalaryGrade(record.id)}
                      variant="contained"
                      color="error"
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



