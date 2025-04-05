import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
} from '@mui/material';

const Remittances = () => {
  const [remittances, setRemittances] = useState([]);
  const [payroll, setPayroll] = useState({
    name: '',
    withHoldingTax: '',
    personalLifeRet: '',
    gsisSalarayLoan: '',
    gsisPolicyLoan: '',
    gfal: '',
    cpl: '',
    mpl: '',
    mplLite: '',
    emergencyLoan: '',
    totalGsisDeds: '',
    pagibigFundCont: '',
    pagibig2: '',
    multiPurpLoan: '',
    totalPagibigDeds: '',
    philhealth: '',
    disallowance: '',
    landbankSalaryLoan: '',
    earistCreditCoop: '',
    feu: '',
    mtslaSalaryLoan: '',
    savingAndLoan: '',
    totalOtherDeds: '',
    totalDeds: '',
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchPayrolls();
  }, []);

  const fetchPayrolls = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/remittance');
      setRemittances(response.data);
    } catch (error) {
      console.error('Error fetching remittances data', error);
    }
  };

  const handleChange = (e) => {
    setPayroll({ ...payroll, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/remittance/${editingId}`,
          payroll
        );
      } else {
        await axios.post('http://localhost:5000/api/remittance', payroll);
      }
      setEditingId(null);
      fetchPayrolls();
      resetForm();
    } catch (error) {
      console.error('Error submitting remittance data', error);
    }
  };

  const handleEdit = (item) => {
    setPayroll(item);
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/remittance/${id}`);
      fetchPayrolls();
    } catch (error) {
      console.error('Error deleting remittance record', error);
    }
  };

  const handleCancel = () => {
    resetForm();
    setEditingId(null);
  };

  const resetForm = () => {
    setPayroll({
      name: '',
      withHoldingTax: '',
      personalLifeRet: '',
      gsisSalarayLoan: '',
      gsisPolicyLoan: '',
      gfal: '',
      cpl: '',
      mpl: '',
      mplLite: '',
      emergencyLoan: '',
      totalGsisDeds: '',
      pagibigFundCont: '',
      pagibig2: '',
      multiPurpLoan: '',
      totalPagibigDeds: '',
      philhealth: '',
      disallowance: '',
      landbankSalaryLoan: '',
      earistCreditCoop: '',
      feu: '',
      mtslaSalaryLoan: '',
      savingAndLoan: '',
      totalOtherDeds: '',
      totalDeds: '',
    });
  };

  return (
    <Container>
      <h2>Remittances Register for Regular Employees</h2>

      <Box display="flex" flexWrap="wrap" sx={{ marginBottom: 3 }}>
        {Object.keys(payroll).map((key) => (
          <TextField
            key={key}
            label={key.replace(/([A-Z])/g, ' $1').trim()}
            name={key}
            value={payroll[key]}
            onChange={handleChange}
            sx={{ marginRight: 2, marginBottom: 2, width: '23%' }}
          />
        ))}
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          sx={{ height: 55, marginRight: 2 }}
        >
          {editingId ? 'Update' : 'Add'}
        </Button>
        {editingId && (
          <Button
            onClick={handleCancel}
            variant="contained"
            color="error"
            sx={{ height: 55 }}
          >
            Cancel
          </Button>
        )}
      </Box>

      <TableContainer
        component={Paper}
        sx={{ maxHeight: 500, overflow: 'auto' }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>With Holding Tax</TableCell>
              <TableCell>Personal Life Ret</TableCell>
              <TableCell>Gsis Salaray Loan</TableCell>
              <TableCell>Gsis Policy Loan</TableCell>
              <TableCell>GFAL</TableCell>
              <TableCell>CPL</TableCell>
              <TableCell>MPL</TableCell>
              <TableCell>MPL LITE</TableCell>
              <TableCell>Emergency Loan</TableCell>
              <TableCell>Total Gsis Deds</TableCell>
              <TableCell>Pag-ibig Fund Cont</TableCell>
              <TableCell>Pagibig2</TableCell>
              <TableCell>Multi Purp Loan</TableCell>
              <TableCell>Total Pagibig Deds</TableCell>
              <TableCell>Philhealth</TableCell>
              <TableCell>Disallowance</TableCell>
              <TableCell>Landbank Salary Loan</TableCell>
              <TableCell>Earist Credit Coop</TableCell>
              <TableCell>FEU</TableCell>
              <TableCell>Mtsla Salary Loan</TableCell>
              <TableCell>Saving And Loan</TableCell>
              <TableCell>Total Other Deds</TableCell>
              <TableCell>Total Deds</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {remittances.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.withHoldingTax}</TableCell>
                <TableCell>{item.personalLifeRet}</TableCell>
                <TableCell>{item.gsisSalarayLoan}</TableCell>
                <TableCell>{item.gsisPolicyLoan}</TableCell>
                <TableCell>{item.gfal}</TableCell>
                <TableCell>{item.cpl}</TableCell>
                <TableCell>{item.mpl}</TableCell>
                <TableCell>{item.mplLite}</TableCell>
                <TableCell>{item.emergencyLoan}</TableCell>
                <TableCell>{item.totalGsisDeds}</TableCell>
                <TableCell>{item.pagibigFundCont}</TableCell>
                <TableCell>{item.pagibig2}</TableCell>
                <TableCell>{item.multiPurpLoan}</TableCell>
                <TableCell>{item.totalPagibigDeds}</TableCell>
                <TableCell>{item.philhealth}</TableCell>
                <TableCell>{item.disallowance}</TableCell>
                <TableCell>{item.landbankSalaryLoan}</TableCell>
                <TableCell>{item.earistCreditCoop}</TableCell>
                <TableCell>{item.feu}</TableCell>
                <TableCell>{item.mtslaSalaryLoan}</TableCell>
                <TableCell>{item.savingAndLoan}</TableCell>
                <TableCell>{item.totalOtherDeds}</TableCell>
                <TableCell>{item.totalDeds}</TableCell>

                <TableCell>
                  <Button
                    onClick={() => handleEdit(item)}
                    variant="contained"
                    color="primary"
                    sx={{ marginRight: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(item.id)}
                    variant="contained"
                    color="error"
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

export default Remittances;