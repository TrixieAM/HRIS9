import React, { useEffect, useState } from 'react';
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
  Grid,
  Paper,
  Typography
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';

const OtherInformation = () => {
  const [data, setData] = useState([]);
  const [newInformation, setNewInformation] = useState({
    specialSkills: '',
    nonAcademicDistinctions: '',
    membershipInAssociation: '',
    person_id: ''
  });
  const [editInformation, setEditInformation] = useState(null);

  useEffect(() => {
    fetchInformation();
  }, []);

  const fetchInformation = async () => {
    try {
      const response = await axios.get('http://localhost:5000/OtherInfo/other-information');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching Other Information:', error);
    }
  };

  const addInformation = async () => {
    try {
      await axios.post('http://localhost:5000/OtherInfo/other-information', newInformation);
      setNewInformation({
        specialSkills: '',
        nonAcademicDistinctions: '',
        membershipInAssociation: '',
        person_id: ''
      });
      fetchInformation();
    } catch (error) {
      console.error('Error adding Other Information:', error);
    }
  };

  const updateInformation = async () => {
    if (!editInformation) return;
    try {
      await axios.put(`http://localhost:5000/OtherInfo/other-information/${editInformation.id}`, editInformation);
      setEditInformation(null);
      fetchInformation();
    } catch (error) {
      console.error('Error updating Other Information:', error);
    }
  };

  const deleteInformation = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/OtherInfo/other-information/${id}`);
      fetchInformation();
    } catch (error) {
      console.error('Error deleting Other Information:', error);
    }
  };

  return (
    <Container>
      {/* Styled Header */}
      <Paper
        elevation={3}
        style={{
          backgroundColor: '#6D2323',
          color: '#FEF9E1',
          padding: '10px 20px',
          marginTop: '20px',
          marginBottom: '20px',
          borderRadius: '8px'
        }}
      >
        <Typography variant="h5" align="left" style={{ fontWeight: 'bold' }}>
          Other Information Dashboard
        </Typography>
      </Paper>

      {/* Form */}
      <Paper elevation={3} style={{ backgroundColor: '#ffffff', padding: '16px', marginBottom: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Add Other Information
        </Typography>

        <Grid container spacing={2}>
          {Object.keys(newInformation).map((key) => (
            <Grid item xs={12} sm={6} md={4} key={key}>
              <TextField
                label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                value={newInformation[key]}
                onChange={(e) => setNewInformation({ ...newInformation, [key]: e.target.value })}
                type={key.includes('Date') ? 'date' : 'text'}
                InputLabelProps={key.includes('Date') ? { shrink: true } : {}}
                fullWidth
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button
              onClick={addInformation}
              variant="contained"
              style={{ backgroundColor: '#6D2323', color: '#FEF9E1' }}
              startIcon={<EditIcon />}
              fullWidth
            >
              Add Other Information
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Table */}
      <Paper elevation={3} style={{ padding: '16px', backgroundColor: '#ffffff' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Special Skills</TableCell>
              <TableCell>Non-Academic Distinctions</TableCell>
              <TableCell>Membership in Association</TableCell>
              <TableCell>Person ID</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((information) => (
              <TableRow key={information.id}>
                <TableCell>{information.id}</TableCell>
                {Object.keys(information).slice(1, -1).map((key) => (
                  <TableCell key={key}>
                    {editInformation && editInformation.id === information.id ? (
                      <TextField
                        value={editInformation[key]}
                        onChange={(e) => setEditInformation({ ...editInformation, [key]: e.target.value })}
                        type={key.includes('Date') ? 'date' : 'text'}
                        InputLabelProps={key.includes('Date') ? { shrink: true } : {}}
                        fullWidth
                      />
                    ) : (
                      information[key]
                    )}
                  </TableCell>
                ))}
                <TableCell>
                  {editInformation && editInformation.id === information.id ? (
                    <>
                      <Button
                        onClick={updateInformation}
                        variant="contained"
                        style={{
                          backgroundColor: '#6D2323',
                          color: '#FEF9E1',
                          width: '100px',
                          height: '40px',
                          marginBottom: '5px',
                        }}
                        startIcon={<SaveIcon />}
                      >
                        Update
                      </Button>
                      <Button
                        onClick={() => setEditInformation(null)}
                        variant="contained"
                        style={{
                          backgroundColor: 'black',
                          color: 'white',
                          width: '100px',
                          height: '40px',
                          marginBottom: '5px',
                          marginLeft: '5px',
                        }}
                        startIcon={<CancelIcon />}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={() => setEditInformation(information)}
                        variant="contained"
                        style={{
                          backgroundColor: '#6D2323',
                          color: '#FEF9E1',
                          width: '100px',
                          height: '40px',
                          marginBottom: '5px',
                        }}
                        startIcon={<EditIcon />}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => deleteInformation(information.id)}
                        variant="contained"
                        style={{
                          backgroundColor: 'black',
                          color: 'white',
                          width: '100px',
                          height: '40px',
                          marginBottom: '5px',
                          marginLeft: '5px',
                        }}
                        startIcon={<DeleteIcon />}
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
      </Paper>
    </Container>
  );
};

export default OtherInformation;
