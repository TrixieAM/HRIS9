import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, Container, Typography } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon, Cancel as CancelIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const College = () => {
  const [data, setData] = useState([]);
  const [newCollege, setNewCollege] = useState({
    collegeNameOfSchool: '',
    collegeDegree: '',
    collegePeriodFrom: '',
    collegePeriodTo: '',
    collegeHighestAttained: '',
    collegeYearGraduated: '',
    collegeScholarshipAcademicHonorsReceived: '',
    person_id: ''
  });
  const [editCollege, setEditCollege] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const response = await axios.get('http://localhost:5000/college/college-table');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching colleges:', error);
    }
  };

  const addCollege = async () => {
    if (!newCollege.collegeNameOfSchool) return;
    await axios.post('http://localhost:5000/college/college-table', newCollege);
    setNewCollege({
      collegeNameOfSchool: '',
      collegeDegree: '',
      collegePeriodFrom: '',
      collegePeriodTo: '',
      collegeHighestAttained: '',
      collegeYearGraduated: '',
      collegeScholarshipAcademicHonorsReceived: '',
      person_id: ''
    });
    fetchColleges();
  };

  const updateCollege = async () => {
    if (!editCollege || !editCollege.collegeNameOfSchool) return;
    await axios.put(`http://localhost:5000/college/college-table/${editCollege.id}`, editCollege);
    setEditCollege(null);
    fetchColleges();
  };

  const deleteCollege = async (id) => {
    await axios.delete(`http://localhost:5000/college/college-table/${id}`);
    fetchColleges();
  };



  return (
    <Container style={{ marginTop: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h1 style={{ width: '90%' }}>College Dashboard</h1>
       
      </div>

      {/* Add New College Entry */}
      <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', marginBottom: '0px' }}>
        <Typography variant="h6">Add New College Entry</Typography>
        <TextField
          label="College Name"
          value={newCollege.collegeNameOfSchool}
          onChange={(e) => setNewCollege({ ...newCollege, collegeNameOfSchool: e.target.value })}
          style={{ marginRight: '10px', marginBottom: '10px', width: '324.25px' }}
        />
        <TextField
          label="Degree"
          value={newCollege.collegeDegree}
          onChange={(e) => setNewCollege({ ...newCollege, collegeDegree: e.target.value })}
          style={{ marginRight: '10px', marginBottom: '10px', width: '324.25px' }}
        />
        <TextField
          label="Period From"
          value={newCollege.collegePeriodFrom}
          onChange={(e) => setNewCollege({ ...newCollege, collegePeriodFrom: e.target.value })}
          style={{ marginRight: '10px', marginBottom: '10px', width: '324.25px' }}
        />
        <TextField
          label="Period To"
          value={newCollege.collegePeriodTo}
          onChange={(e) => setNewCollege({ ...newCollege, collegePeriodTo: e.target.value })}
          style={{ marginRight: '10px', marginBottom: '10px', width: '324.25px' }}
        />
        <TextField
          label="Highest Attained"
          value={newCollege.collegeHighestAttained}
          onChange={(e) => setNewCollege({ ...newCollege, collegeHighestAttained: e.target.value })}
          style={{ marginRight: '10px', marginBottom: '10px', width: '324.25px' }}
        />
        <TextField
          label="Year Graduated"
          value={newCollege.collegeYearGraduated}
          onChange={(e) => setNewCollege({ ...newCollege, collegeYearGraduated: e.target.value })}
          style={{ marginRight: '10px', marginBottom: '10px', width: '324.25px' }}
        />
        <TextField
          label="Honors Received"
          value={newCollege.collegeScholarshipAcademicHonorsReceived}
          onChange={(e) => setNewCollege({ ...newCollege, collegeScholarshipAcademicHonorsReceived: e.target.value })}
          style={{ marginRight: '10px', marginBottom: '10px', width: '324.25px' }}
        />
        <TextField
          label="Person ID"
          value={newCollege.person_id}
          onChange={(e) => setNewCollege({ ...newCollege, person_id: e.target.value })}
          style={{ marginRight: '10px', marginBottom: '10px', width: '324.25px' }}
        />
        <Button onClick={addCollege} variant="contained" color="primary" 
          style={{ backgroundColor: '#6D2323', color: '#FEF9E1', width: '1020px', marginTop: '35px', marginLeft: '-10px' }}
          startIcon={<AddIcon />}
        >
          Add
        </Button>
      </div>

      {/* Colleges Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>College Name</TableCell>
            <TableCell>Degree</TableCell>
            <TableCell>Period From</TableCell>
            <TableCell>Period To</TableCell>
            <TableCell>Highest Attained</TableCell>
            <TableCell>Year Graduated</TableCell>
            <TableCell>Honors Received</TableCell>
            <TableCell>Person ID</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((college) => (
            <TableRow key={college.id}>
              <TableCell>{college.id}</TableCell>
              <TableCell>
                {editCollege && editCollege.id === college.id ? (
                  <TextField
                    value={editCollege.collegeNameOfSchool}
                    onChange={(e) => setEditCollege({ ...editCollege, collegeNameOfSchool: e.target.value })}
                  />
                ) : (
                  college.collegeNameOfSchool
                )}
              </TableCell>
              <TableCell>
                {editCollege && editCollege.id === college.id ? (
                  <TextField
                    value={editCollege.collegeDegree}
                    onChange={(e) => setEditCollege({ ...editCollege, collegeDegree: e.target.value })}
                  />
                ) : (
                  college.collegeDegree
                )}
              </TableCell>
              <TableCell>
                {editCollege && editCollege.id === college.id ? (
                  <TextField
                    value={editCollege.collegePeriodFrom}
                    onChange={(e) => setEditCollege({ ...editCollege, collegePeriodFrom: e.target.value })}
                  />
                ) : (
                  college.collegePeriodFrom
                )}
              </TableCell>
              <TableCell>
                {editCollege && editCollege.id === college.id ? (
                  <TextField
                    value={editCollege.collegePeriodTo}
                    onChange={(e) => setEditCollege({ ...editCollege, collegePeriodTo: e.target.value })}
                  />
                ) : (
                  college.collegePeriodTo
                )}
              </TableCell>
              <TableCell>
                {editCollege && editCollege.id === college.id ? (
                  <TextField
                    value={editCollege.collegeHighestAttained}
                    onChange={(e) => setEditCollege({ ...editCollege, collegeHighestAttained: e.target.value })}
                  />
                ) : (
                  college.collegeHighestAttained
                )}
              </TableCell>
              <TableCell>
                {editCollege && editCollege.id === college.id ? (
                  <TextField
                    value={editCollege.collegeYearGraduated}
                    onChange={(e) => setEditCollege({ ...editCollege, collegeYearGraduated: e.target.value })}
                  />
                ) : (
                  college.collegeYearGraduated
                )}
              </TableCell>
              <TableCell>
                {editCollege && editCollege.id === college.id ? (
                  <TextField
                    value={editCollege.collegeScholarshipAcademicHonorsReceived}
                    onChange={(e) => setEditCollege({ ...editCollege, collegeScholarshipAcademicHonorsReceived: e.target.value })}
                  />
                ) : (
                  college.collegeScholarshipAcademicHonorsReceived
                )}
              </TableCell>
              <TableCell>
                {editCollege && editCollege.id === college.id ? (
                  <TextField
                    value={editCollege.person_id}
                    onChange={(e) => setEditCollege({ ...editCollege, person_id: e.target.value })}
                  />
                ) : (
                  college.person_id
                )}
              </TableCell>
              <TableCell>
                {editCollege && editCollege.id === college.id ? (
                  <>
                    <Button
                      onClick={updateCollege}
                      variant="contained"
                      color="primary"
                      startIcon={<SaveIcon />}
                      style={{ backgroundColor: '#6D2323',
                        color: '#FEF9E1',
                        width: '100px',
                        height: '40px',
                        marginBottom: '5px', }}
                    >
                      Update
                    </Button>
                    <Button
                      onClick={() => setEditCollege(null)}
                      variant="outlined"
                      style={{ backgroundColor: 'black',
                        color: 'white',
                        width: '100px',
                        height: '40px',
                        marginBottom: '5px',
                        marginLeft: '0px', }}
                      startIcon={<CancelIcon />}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => setEditCollege(college)}
                      variant="outlined"
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
                      onClick={() => deleteCollege(college.id)}
                      variant="outlined"
                      style={{
                        backgroundColor: 'black',
                        color: 'white',
                        width: '100px',
                        height: '40px',
                        marginBottom: '5px',
                        display: 'flex'
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
    </Container>
  );
};

export default College;
