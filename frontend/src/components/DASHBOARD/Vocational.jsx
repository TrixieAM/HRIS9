import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Table, TableBody, TableCell, TableHead, TableRow, Container } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';

const Vocational = () => {
  const [vocationalData, setVocationalData] = useState([]);
  const [newVocational, setNewVocational] = useState({
    vocationalNameOfSchool: '',
    vocationalDegree: '',
    vocationalPeriodFrom: '',
    vocationalPeriodTo: '',
    vocationalHighestAttained: '',
    vocationalYearGraduated: '',
    person_id: ''
  });
  const [editingVocationalId, setEditingVocationalId] = useState(null);
  const [editVocationalData, setEditVocationalData] = useState({});

  useEffect(() => {
    fetchVocationalData();
  }, []);

  const fetchVocationalData = async () => {
    try {
      const result = await axios.get('http://localhost:5000/vocational/vocational-table');
      setVocationalData(result.data);
    } catch (error) {
      console.error('Error fetching vocational data:', error);
    }
  };

  const updateVocational = async () => {
    try {
      await axios.put(`http://localhost:5000/vocational/vocational-table/${editingVocationalId}`, editVocationalData);
      setEditingVocationalId(null);
      fetchVocationalData();
    } catch (error) {
      console.error('Failed to update vocational data:', error);
    }
  };

  const deleteVocational = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/vocational/vocational-table/${id}`);
      fetchVocationalData();
    } catch (error) {
      console.error('Error deleting vocational data:', error);
    }
  };

  return (
    <Container style={{ marginTop: '20px', backgroundColor: 'FEFE9E1' }}>
      <h1>Vocational Information Dashboard</h1>

      {/* Add New Vocational Form Box */}
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          marginBottom: '20px'
        }}
      >
        <h3>Add New Vocational Information</h3>
        <TextField
          label="School"
          value={newVocational.vocationalNameOfSchool}
          onChange={(e) => setNewVocational({ ...newVocational, vocationalNameOfSchool: e.target.value })}
          style={{ marginRight: '10px', marginBottom: '10px', width: '324.25px' }}
        />
        <TextField
          label="Degree"
          value={newVocational.vocationalDegree}
          onChange={(e) => setNewVocational({ ...newVocational, vocationalDegree: e.target.value })}
          style={{ marginRight: '10px', marginBottom: '10px', width: '324.25px' }}
        />
        <TextField
          label="From Year"
          value={newVocational.vocationalPeriodFrom}
          onChange={(e) => setNewVocational({ ...newVocational, vocationalPeriodFrom: e.target.value })}
          style={{ marginRight: '10px', marginBottom: '10px', width: '324.25px' }}
        />
        <TextField
          label="To Year"
          value={newVocational.vocationalPeriodTo}
          onChange={(e) => setNewVocational({ ...newVocational, vocationalPeriodTo: e.target.value })}
          style={{ marginRight: '10px', marginBottom: '10px', width: '324.25px' }}
        />
        <TextField
          label="Highest Attained"
          value={newVocational.vocationalHighestAttained}
          onChange={(e) => setNewVocational({ ...newVocational, vocationalHighestAttained: e.target.value })}
          style={{ marginRight: '10px', marginBottom: '10px', width: '324.25px' }}
        />
        <TextField
          label="Year Graduated"
          value={newVocational.vocationalYearGraduated}
          onChange={(e) => setNewVocational({ ...newVocational, vocationalYearGraduated: e.target.value })}
          style={{ marginRight: '10px', marginBottom: '10px', width: '324.25px' }}
        />
        <TextField
          label="Person ID"
          value={newVocational.person_id}
          onChange={(e) => setNewVocational({ ...newVocational, person_id: e.target.value })}
          style={{ marginRight: '10px', marginBottom: '10px', width: '324.25px' }}
        />
        <Button
          onClick={async () => {
            await axios.post('http://localhost:5000/vocational/vocational-table', newVocational);
            fetchVocationalData();
            setNewVocational({
              vocationalNameOfSchool: '',
              vocationalDegree: '',
              vocationalPeriodFrom: '',
              vocationalPeriodTo: '',
              vocationalHighestAttained: '',
              vocationalYearGraduated: '',
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

      {/* Vocational Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>School</TableCell>
            <TableCell>Degree</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Highest Attained</TableCell>
            <TableCell>Year Graduated</TableCell>
            <TableCell>Person ID</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vocationalData.map((vocational) => (
            <TableRow key={vocational.id}>
              <TableCell>{vocational.id}</TableCell>
              {editingVocationalId === vocational.id ? (
                <>
                  <TableCell>
                    <TextField
                      value={editVocationalData.vocationalNameOfSchool}
                      onChange={(e) => setEditVocationalData({ ...editVocationalData, vocationalNameOfSchool: e.target.value })}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={editVocationalData.vocationalDegree}
                      onChange={(e) => setEditVocationalData({ ...editVocationalData, vocationalDegree: e.target.value })}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      value={editVocationalData.vocationalPeriodFrom}
                      onChange={(e) => setEditVocationalData({ ...editVocationalData, vocationalPeriodFrom: e.target.value })}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      value={editVocationalData.vocationalPeriodTo}
                      onChange={(e) => setEditVocationalData({ ...editVocationalData, vocationalPeriodTo: e.target.value })}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={editVocationalData.vocationalHighestAttained}
                      onChange={(e) => setEditVocationalData({ ...editVocationalData, vocationalHighestAttained: e.target.value })}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      value={editVocationalData.vocationalYearGraduated}
                      onChange={(e) => setEditVocationalData({ ...editVocationalData, vocationalYearGraduated: e.target.value })}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      value={editVocationalData.person_id}
                      onChange={(e) => setEditVocationalData({ ...editVocationalData, person_id: e.target.value })}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={updateVocational}
                      variant="contained"
                      style={{ backgroundColor: '#6D2323',
                        color: '#FEF9E1',
                        width: '100px',
                        height: '40px',
                        marginBottom: '5px', }}
                      startIcon={<SaveIcon />}
                    >
                      Update
                    </Button>
                    <Button
                      onClick={() => setEditingVocationalId(null)}
                      variant="contained"
                      style={{ backgroundColor: 'black',
                        color: 'white',
                        width: '100px',
                        height: '40px',
                        marginBottom: '5px',
                        marginLeft: '10px', }}
                      startIcon={<CancelIcon />}
                    >
                      Cancel
                    </Button>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell>{vocational.vocationalNameOfSchool}</TableCell>
                  <TableCell>{vocational.vocationalDegree}</TableCell>
                  <TableCell>{vocational.vocationalPeriodFrom}</TableCell>
                  <TableCell>{vocational.vocationalPeriodTo}</TableCell>
                  <TableCell>{vocational.vocationalHighestAttained}</TableCell>
                  <TableCell>{vocational.vocationalYearGraduated}</TableCell>
                  <TableCell>{vocational.person_id}</TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Button
                        onClick={() => {
                          setEditVocationalData(vocational);
                          setEditingVocationalId(vocational.id);
                        }}
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
                        onClick={() => deleteVocational(vocational.id)}
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
                    </div>
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

export default Vocational;