import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Table, TableBody, TableCell, TableHead, TableRow, Container } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';

const WorkExperience = () => {
  const [workExperiences, setWorkExperiences] = useState([]);
  const [newWorkExperience, setNewWorkExperience] = useState({
    workDateFrom: '',
    workDateTo: '',
    workPositionTitle: '',
    workCompany: '',
    workMonthlySalary: '',
    SalaryJobOrPayGrade: '',
    StatusOfAppointment: '',
    isGovtService: '',
    person_id: ''
  });
  const [editingWorkExperienceId, setEditingWorkExperienceId] = useState(null);
  const [editWorkExperienceData, setEditWorkExperienceData] = useState({});

  useEffect(() => {
    fetchWorkExperiences();
  }, []);

  const fetchWorkExperiences = async () => {
    try {
      const result = await axios.get('http://localhost:5000/WorkExperienceRoute/work-experience-table');
      setWorkExperiences(result.data);
    } catch (error) {
      console.error('Error fetching work experiences:', error);
    }
  };

  const updateWorkExperience = async () => {
    try {
      await axios.put(`http://localhost:5000/WorkExperienceRoute/work-experience-table/${editingWorkExperienceId}`, editWorkExperienceData);
      setEditingWorkExperienceId(null);
      fetchWorkExperiences();
    } catch (error) {
      console.error('Failed to update work experience:', error);
    }
  };

  const deleteWorkExperience = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/WorkExperienceRoute/work-experience-table/${id}`);
      fetchWorkExperiences();
    } catch (error) {
      console.error('Error deleting work experience:', error);
    }
  };

  return (
    <Container style={{ marginTop: '20px' }}>
      <h1>Work Experience Dashboard</h1>

      {/* Add New Work Experience Form */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px'
      }}>
        <h3>Add New Work Experience</h3>
        <TextField
          label="From (YYYY/MM/DD)"
          type="textfield"
          value={newWorkExperience.workDateFrom}
          onChange={(e) => setNewWorkExperience({ ...newWorkExperience, workDateFrom: e.target.value })}
          style={{ marginRight: '10px', marginBottom: '10px', width: '324.25px' }}
        />
        <TextField
          label="To (YYYY/MM/DD)"
          type="textfield"
          value={newWorkExperience.workDateTo}
          onChange={(e) => setNewWorkExperience({ ...newWorkExperience, workDateTo: e.target.value })}
          style={{ marginRight: '10px', marginBottom: '10px', width: '324.25px' }}
        />
        <TextField
          label="Position Title"
          value={newWorkExperience.workPositionTitle}
          onChange={(e) => setNewWorkExperience({ ...newWorkExperience, workPositionTitle: e.target.value })}
          style={{ marginRight: '10px', marginBottom: '10px', width: '324.25px' }}
        />
        <TextField
          label="Company"
          value={newWorkExperience.workCompany}
          onChange={(e) => setNewWorkExperience({ ...newWorkExperience, workCompany: e.target.value })}
          style={{ marginRight: '10px', marginBottom: '10px', width: '324.25px' }}
        />
        <TextField
          label="Monthly Salary"
          value={newWorkExperience.workMonthlySalary}
          onChange={(e) => setNewWorkExperience({ ...newWorkExperience, workMonthlySalary: e.target.value })}
          style={{ marginRight: '10px', marginBottom: '10px', width: '324.25px' }}
        />
        <TextField
          label="Salary Job/Pay Grade"
          value={newWorkExperience.SalaryJobOrPayGrade}
          onChange={(e) => setNewWorkExperience({ ...newWorkExperience, SalaryJobOrPayGrade: e.target.value })}
          style={{ marginRight: '10px', marginBottom: '10px', width: '324.25px' }}
        />
        <TextField
          label="Status of Appointment"
          value={newWorkExperience.StatusOfAppointment}
          onChange={(e) => setNewWorkExperience({ ...newWorkExperience, StatusOfAppointment: e.target.value })}
          style={{ marginRight: '10px', marginBottom: '10px', width: '324.25px' }}
        />
        <TextField
          label="Person ID"
          value={newWorkExperience.person_id}
          onChange={(e) => setNewWorkExperience({ ...newWorkExperience, person_id: e.target.value })}
          style={{ marginRight: '10px', marginBottom: '10px', width: '324.25px' }}
        />
       
        <Button
          onClick={async () => {
            await axios.post('http://localhost:5000/WorkExperienceRoute/work-experience-table', newWorkExperience);
            fetchWorkExperiences();
            setNewWorkExperience({
              workDateFrom: '',
              workDateTo: '',
              workPositionTitle: '',
              workCompany: '',
              workMonthlySalary: '',
              SalaryJobOrPayGrade: '',
              StatusOfAppointment: '',
              isGovtService: '',
              person_id: ''
            });
          }}
          variant="contained"
          style={{ backgroundColor: '#6D2323', color: '#FEF9E1', width: '1020px', marginTop: '35px', marginLeft: '-10px' }}
          startIcon={<AddIcon />}
        >
          Add
        </Button>
      </div>

      {/* Work Experience Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Date From</TableCell>
            <TableCell>Date To</TableCell>
            <TableCell>Position Title</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Monthly Salary</TableCell>
            <TableCell>Salary Job/Pay Grade</TableCell>
            <TableCell>Status of Appointment</TableCell>
            <TableCell>Person ID</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workExperiences.map((workExperience) => (
            <TableRow key={workExperience.id}>
              <TableCell>{workExperience.id}</TableCell>
              {editingWorkExperienceId === workExperience.id ? (
                <>
                                  <TableCell>
                    <TextField
                      type="date"
                      value={editWorkExperienceData.workDateFrom}
                      onChange={(e) => setEditWorkExperienceData({ ...editWorkExperienceData, workDateFrom: e.target.value })}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="date"
                      value={editWorkExperienceData.workDateTo}
                      onChange={(e) => setEditWorkExperienceData({ ...editWorkExperienceData, workDateTo: e.target.value })}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={editWorkExperienceData.workPositionTitle}
                      onChange={(e) => setEditWorkExperienceData({ ...editWorkExperienceData, workPositionTitle: e.target.value })}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={editWorkExperienceData.workCompany}
                      onChange={(e) => setEditWorkExperienceData({ ...editWorkExperienceData, workCompany: e.target.value })}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={editWorkExperienceData.workMonthlySalary}
                      onChange={(e) => setEditWorkExperienceData({ ...editWorkExperienceData, workMonthlySalary: e.target.value })}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={editWorkExperienceData.SalaryJobOrPayGrade}
                      onChange={(e) => setEditWorkExperienceData({ ...editWorkExperienceData, SalaryJobOrPayGrade: e.target.value })}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={editWorkExperienceData.StatusOfAppointment}
                      onChange={(e) => setEditWorkExperienceData({ ...editWorkExperienceData, StatusOfAppointment: e.target.value })}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={editWorkExperienceData.person_id}
                      onChange={(e) => setEditWorkExperienceData({ ...editWorkExperienceData, person_id: e.target.value })}
                    />
                  </TableCell>

                  <TableCell>
                    <Button
                      onClick={updateWorkExperience}
                      variant="contained"
                      style={{
                        backgroundColor: '#6D2323',
                        color: '#FEF9E1',
                        width: '100px',
                        height: '40px',
                        marginBottom: '5px',}}
                      startIcon={<SaveIcon />}
                    >
                      Update
                    </Button>
                    <Button
                      onClick={() => setEditingWorkExperienceId(null)}
                      variant="contained"
                      style={{
                        backgroundColor: 'black',
                        color: 'white',
                        width: '100px',
                        height: '40px',
                        marginBottom: '5px',
                      }}
                      startIcon={<CancelIcon />}
                    >
                      Cancel
                    </Button>
                  </TableCell>
                </>
              ) : (
                <>
                   <TableCell>{workExperience.workDateFrom}</TableCell>
                  <TableCell>{workExperience.workDateTo}</TableCell>
                  <TableCell>{workExperience.workPositionTitle}</TableCell>
                  <TableCell>{workExperience.workCompany}</TableCell>
                  <TableCell>{workExperience.workMonthlySalary}</TableCell>
                  <TableCell>{workExperience.SalaryJobOrPayGrade}</TableCell>
                  <TableCell>{workExperience.StatusOfAppointment}</TableCell>
                  <TableCell>{workExperience.person_id}</TableCell>

                  <TableCell>
                    <Button
                      onClick={() => {
                        setEditWorkExperienceData(workExperience);
                        setEditingWorkExperienceId(workExperience.id);
                      }}
                      variant="contained"
                      style={{
                        backgroundColor: '#6D2323',
                        color: '#FEF9E1',
                        width: '100px',
                        height: '40px',
                        marginBottom: '5px',}}
                      startIcon={<EditIcon />}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => deleteWorkExperience(workExperience.id)}
                      variant="contained"
                      style={{
                        backgroundColor: 'black',
                        color: 'white',
                        width: '100px',
                        height: '40px',
                        marginBottom: '5px',
                      }}
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default WorkExperience;
