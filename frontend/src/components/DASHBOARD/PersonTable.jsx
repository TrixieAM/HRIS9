import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Box, TextField, Container, Grid, Typography, Divider } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon, Cancel as CancelIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material';




const PersonTable = () => {
    const [data, setData] = useState([]);
    const [newPerson, setNewPerson] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        birthDate: '',
        civilStatus: '',
        heightCm: '',
        weightKg: '',
        bloodType: '',
        gsisNum: '',
        pagibigNum: '',
        philhealthNum: '',
        sssNum: '',
        tinNum: '',
        agencyEmployeeNum: '',
        houseBlockLotNum: '',
        streetName: '',
        subdivisionOrVillage: '',
        barangayName: '',
        cityOrMunicipality: '',
        provinceName: '',
        zipcode: '',
        telephone: '',
        mobileNum: '',
        emailAddress: '',
        spouseFirstName: '',
        spouseMiddleName: '',
        spouseLastName: '',
        spouseNameExtension: '',
        spouseOccupation: '',
        spouseEmployerBusinessName: '',
        spouseBusinessAddress: '',
        spouseTelephone: '',
        fatherFirstName: '',
        fatherMiddleName: '',
        fatherLastName: '',
        fatherNameExtension: '',
        motherMaidenFirstName: '',
        motherMaidenMiddleName: '',
        motherMaidenLastName: '',
        elementaryNameOfSchool: '',
        elementaryDegree: '',
        elementaryPeriodFrom: '',
        elementaryPeriodTo: '',
        elementaryHighestAttained: '',
        elementaryYearGraduated: '',
        elementaryScholarshipAcademicHonorsReceived: '',
        secondaryNameOfSchool: '',
        secondaryDegree: '',
        secondaryPeriodFrom: '',
        secondaryPeriodTo: '',
        secondaryHighestAttained: '',
        secondaryYearGraduated: '',
        secondaryScholarshipAcademicHonorsReceived: ''
    });
    const [editPerson, setEditPerson] = useState(null);




    useEffect(() => {
        fetchItems();
    }, []);




    const fetchItems = async () => {
        const response = await axios.get('http://localhost:5000/personalinfo/person_table');
        setData(response.data);
    };




    const addItem = async () => {
        if (Object.values(newPerson).some(value => value === '')) return; // Validate required fields
        await axios.post('http://localhost:5000/personalinfo/person_table', newPerson);
        setNewPerson({
            firstName: '',
            middleName: '',
            lastName: '',
            birthDate: '',
            civilStatus: '',
            heightCm: '',
            weightKg: '',
            bloodType: '',
            gsisNum: '',
            pagibigNum: '',
            philhealthNum: '',
            sssNum: '',
            tinNum: '',
            agencyEmployeeNum: '',
            houseBlockLotNum: '',
            streetName: '',
            subdivisionOrVillage: '',
            barangayName: '',
            cityOrMunicipality: '',
            provinceName: '',
            zipcode: '',
            telephone: '',
            mobileNum: '',
            emailAddress: '',
            spouseFirstName: '',
            spouseMiddleName: '',
            spouseLastName: '',
            spouseNameExtension: '',
            spouseOccupation: '',
            spouseEmployerBusinessName: '',
            spouseBusinessAddress: '',
            spouseTelephone: '',
            fatherFirstName: '',
            fatherMiddleName: '',
            fatherLastName: '',
            fatherNameExtension: '',
            motherMaidenFirstName: '',
            motherMaidenMiddleName: '',
            motherMaidenLastName: '',
            elementaryNameOfSchool: '',
            elementaryDegree: '',
            elementaryPeriodFrom: '',
            elementaryPeriodTo: '',
            elementaryHighestAttained: '',
            elementaryYearGraduated: '',
            elementaryScholarshipAcademicHonorsReceived: '',
            secondaryNameOfSchool: '',
            secondaryDegree: '',
            secondaryPeriodFrom: '',
            secondaryPeriodTo: '',
            secondaryHighestAttained: '',
            secondaryYearGraduated: '',
            secondaryScholarshipAcademicHonorsReceived: ''
        });
        fetchItems();
    };




    const updateItem = async () => {
        if (!editPerson || Object.values(editPerson).some(value => value === '')) return; // Validate required fields
        await axios.put(`http://localhost:5000/personalinfo/person_table/${editPerson.id}`, editPerson);
        setEditPerson(null);
        fetchItems();
    };




    const deleteItem = async (id) => {
        await axios.delete(`http://localhost:5000/personalinfo/person_table/${id}`);
        fetchItems();
    };




    const handleInputChange = (e, isEdit = false) => {
        const { name, value } = e.target;
        if (isEdit) {
            setEditPerson(prev => ({ ...prev, [name]: value }));
        } else {
            setNewPerson(prev => ({ ...prev, [name]: value }));
        }
    };







    return (
        <Container>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <h1 style={{ width: '90%' }}>Person Dashboard</h1>
        </div>
       




       {/* Personal Information Section */}
<Typography variant="h6" gutterBottom><h3>Personal Information</h3></Typography>
<Grid container spacing={2} sx={{ marginBottom: 3 }}>
    {['firstName', 'middleName', 'lastName', 'birthDate', 'civilStatus', 'weightKg', 'bloodType',
      'mobileNum', 'telephone', 'emailAddress'].map((field, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <TextField
                fullWidth
                label={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                name={field}
                value={newPerson[field]}
                onChange={(e) => handleInputChange(e)}
            />
        </Grid>
    ))}




    {/* For height in cm */}
    <Grid item xs={12} sm={6} md={4} lg={3}>
        <TextField
            fullWidth
            label="Height (cm)"
            name="heightCm"
            value={newPerson.heightCm ? newPerson.heightCm * 100 : ''}  // Convert meters to centimeters
            onChange={(e) => {
                const valueInCm = e.target.value;
                handleInputChange({
                    target: {
                        name: 'heightCm',
                        value: valueInCm / 100,  // Convert centimeters back to meters
                    },
                });
            }}
        />
    </Grid>
</Grid>








        <Divider />








        {/* Goverment ID Information Section */}
        <Typography variant="h6" gutterBottom><h3>Goverment ID Information</h3></Typography>
        <Grid container spacing={2} sx={{ marginBottom: 3 }}>
            {['gsisNum', 'pagibigNum', 'philhealthNum', 'sssNum', 'tinNum', 'agencyEmployeeNum'].map((field, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <TextField
                        fullWidth
                        label={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        name={field}
                        value={newPerson[field]}
                        onChange={(e) => handleInputChange(e)}
                    />
                </Grid>
            ))}
        </Grid>




        <Divider />




        {/* Spouse Information Section */}
        <Typography variant="h6" gutterBottom><h3>Spouse Information</h3></Typography>
        <Grid container spacing={2} sx={{ marginBottom: 3 }}>
            {['spouseFirstName', 'spouseMiddleName', 'spouseLastName', 'spouseNameExtension', 'spouseOccupation',
              'spouseEmployerBusinessName', 'spouseBusinessAddress', 'spouseTelephone'].map((field, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <TextField
                        fullWidth
                        label={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        name={field}
                        value={newPerson[field]}
                        onChange={(e) => handleInputChange(e)}
                    />
                </Grid>
            ))}
        </Grid>




        <Divider />




        {/* Address Information Section */}
        <Typography variant="h6" gutterBottom><h3>Address Information</h3></Typography>
        <Grid container spacing={2} sx={{ marginBottom: 3 }}>
            {['houseBlockLotNum', 'streetName', 'subdivisionOrVillage', 'barangayName', 'cityOrMunicipality',
              'provinceName', 'zipcode'].map((field, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <TextField
                        fullWidth
                        label={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        name={field}
                        value={newPerson[field]}
                        onChange={(e) => handleInputChange(e)}
                    />
                </Grid>
            ))}
        </Grid>




        <Divider />




        {/* Parents' Information Section */}
        <Typography variant="h6" gutterBottom><h3>Parents' Information</h3></Typography>
        <Grid container spacing={2} sx={{ marginBottom: 3 }}>
            {['fatherFirstName', 'fatherMiddleName', 'fatherLastName', 'fatherNameExtension',
              'motherMaidenFirstName', 'motherMaidenMiddleName', 'motherMaidenLastName'].map((field, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <TextField
                        fullWidth
                        label={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        name={field}
                        value={newPerson[field]}
                        onChange={(e) => handleInputChange(e)}
                    />
                </Grid>
            ))}
        </Grid>




        <Divider />




        {/* Educational Information Section */}
        <Typography variant="h6" gutterBottom><h3>Educational Information</h3></Typography>
        <Grid container spacing={2} sx={{ marginBottom: 4 }}>
            {/* Elementary Section */}
            <Grid item xs={12} sx={{ marginBottom: 2 }}>
                <Typography variant="subtitle1"><h4>Elementary Education</h4></Typography>
                <Grid container spacing={2}>
                    {['elementaryNameOfSchool', 'elementaryDegree', 'elementaryPeriodFrom', 'elementaryPeriodTo',
                      'elementaryHighestAttained', 'elementaryYearGraduated', 'elementaryScholarshipAcademicHonorsReceived'].map((field, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <TextField
                                fullWidth
                                label={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                name={field}
                                value={newPerson[field]}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Grid>




            {/* Secondary Section */}
            <Grid item xs={12}>
                <Typography variant="subtitle1"><h4>Secondary Education</h4></Typography>
                <Grid container spacing={2}>
                    {['secondaryNameOfSchool', 'secondaryDegree', 'secondaryPeriodFrom', 'secondaryPeriodTo',
                      'secondaryHighestAttained', 'secondaryYearGraduated', 'secondaryScholarshipAcademicHonorsReceived'].map((field, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <TextField
                                fullWidth
                                label={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                name={field}
                                value={newPerson[field]}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>




        <Box sx={{ marginTop: 3, marginBottom: 3 }}>
                <Button onClick={addItem}
              variant="contained"
              style={{ backgroundColor: '#6D2323', color: '#FEF9E1', width: '1200px', marginTop: '35px', marginLeft: '-10px' }}
              sx={{ width: '100%' }}>Add Person</Button>
            </Box>




































            {/* List All Persons */}
            <Box sx={{ marginBottom: 3 }}>
                {data.map((person) => (
                <   Box key={person.id} sx={{ marginBottom: 3, padding: 3, border: '1px solid #400000 ', borderRadius: 1, backgroundColor: '#f9f9f9' }}>
           
                        {/* Display Person ID to the Left of the Name */}
                        <Grid container alignItems="center">
                        <Grid item>
                                <Typography variant="h5" color="textSecondary" sx={{ marginRight: 1, marginBottom: '10px', color: '#800000' }}>
                                    {person.id}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h4" gutterBottom>
                                    | {person.firstName} {person.lastName}
                                </Typography>
                            </Grid>
                        </Grid>




                        {/* Personal Information Section */}
                        <Box sx={{ marginBottom: 3 }}>
                            <Typography variant="subtitle1"><h3>Personal Information</h3></Typography>
                            <Grid container spacing={2}>
                                {['firstName', 'middleName', 'lastName', 'birthDate', 'civilStatus', 'heightCm', 'weightKg', 'bloodType', 'mobileNum', 'telephone', 'emailAddress'].map((field) => (
                                    <Grid item xs={3} key={field}>
                                        <Typography variant="body2" color="textSecondary">{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Typography>
                                        {editPerson && editPerson.id === person.id ? (
                                            <TextField
                                                fullWidth
                                                name={field}
                                                value={editPerson[field]}
                                                onChange={(e) => handleInputChange(e, true)}
                                                variant="outlined"
                                            />
                                        ) : (
                                            <Typography variant="body1">{person[field]}</Typography>
                                        )}
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>




                        <Divider sx={{ marginY: 3 }} />




                        {/* Goverment ID Information Section */}
                        <Box sx={{ marginBottom: 3 }}>
                            <Typography variant="subtitle1"><h3>Goverment ID Information</h3></Typography>
                            <Grid container spacing={2}>
                                {['gsisNum', 'pagibigNum', 'philhealthNum', 'sssNum', 'tinNum', 'agencyEmployeeNum'].map((field) => (
                                    <Grid item xs={3} key={field}>
                                        <Typography variant="body2" color="textSecondary">{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Typography>
                                        {editPerson && editPerson.id === person.id ? (
                                            <TextField
                                                fullWidth
                                                name={field}
                                                value={editPerson[field]}
                                                onChange={(e) => handleInputChange(e, true)}
                                                variant="outlined"
                                            />
                                        ) : (
                                            <Typography variant="body1">{person[field]}</Typography>
                                        )}
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>




                        <Divider sx={{ marginY: 3 }} />




                        {/* Spouse Information Section */}
                        <Box sx={{ marginBottom: 3 }}>
                            <Typography variant="subtitle1"><h3>Spouse Information</h3></Typography>
                            <Grid container spacing={2}>
                                {['spouseFirstName', 'spouseMiddleName', 'spouseLastName', 'spouseNameExtension', 'spouseOccupation', 'spouseEmployerBusinessName', 'spouseBusinessAddress', 'spouseTelephone'].map((field) => (
                                    <Grid item xs={3} key={field}>
                                        <Typography variant="body2" color="textSecondary">{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Typography>
                                        {editPerson && editPerson.id === person.id ? (
                                            <TextField
                                                fullWidth
                                                name={field}
                                                value={editPerson[field]}
                                                onChange={(e) => handleInputChange(e, true)}
                                                variant="outlined"
                                            />
                                        ) : (
                                            <Typography variant="body1">{person[field]}</Typography>
                                        )}
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>




                        <Divider sx={{ marginY: 3 }} />




                        {/* Address Information Section */}
                        <Box sx={{ marginBottom: 3 }}>
                            <Typography variant="subtitle1"><h3>Address Information</h3></Typography>
                            <Grid container spacing={2}>
                                {['houseBlockLotNum', 'streetName', 'subdivisionOrVillage', 'barangayName', 'cityOrMunicipality', 'provinceName', 'zipcode'].map((field) => (
                                    <Grid item xs={3} key={field}>
                                        <Typography variant="body2" color="textSecondary">{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Typography>
                                        {editPerson && editPerson.id === person.id ? (
                                            <TextField
                                                fullWidth
                                                name={field}
                                                value={editPerson[field]}
                                                onChange={(e) => handleInputChange(e, true)}
                                                variant="outlined"
                                            />
                                        ) : (
                                            <Typography variant="body1">{person[field]}</Typography>
                                        )}
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>




                        <Divider sx={{ marginY: 3 }} />




                        {/* Parents Information Section */}
                        <Box sx={{ marginBottom: 3 }}>
                            <Typography variant="subtitle1"><h3>Parent's Information</h3></Typography>
                            <Grid container spacing={2}>
                                {['fatherFirstName', 'fatherMiddleName', 'fatherLastName', 'fatherNameExtension', 'motherMaidenFirstName', 'motherMaidenMiddleName', 'motherMaidenLastName'].map((field) => (
                                    <Grid item xs={3} key={field}>
                                        <Typography variant="body2" color="textSecondary">{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Typography>
                                        {editPerson && editPerson.id === person.id ? (
                                            <TextField
                                                fullWidth
                                                name={field}
                                                value={editPerson[field]}
                                                onChange={(e) => handleInputChange(e, true)}
                                                variant="outlined"
                                            />
                                        ) : (
                                            <Typography variant="body1">{person[field]}</Typography>
                                        )}
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>




                        <Divider sx={{ marginY: 3 }} />




                          {/* Educational Information Section */}
                          <Box sx={{ marginBottom: 3 }}>
                            <Typography variant="subtitle1"><h3>Educational Information</h3></Typography>
                           
                            {/* Elementary Educational Information */}
                            <Box sx={{ marginBottom: 3 }}>
                                <Typography variant="subtitle2"><h4>Elementary Education</h4></Typography>
                                <Grid container spacing={2}>
                                    {['elementaryNameOfSchool', 'elementaryDegree', 'elementaryPeriodFrom', 'elementaryPeriodTo', 'elementaryHighestAttained', 'elementaryYearGraduated', 'elementaryScholarshipAcademicHonorsReceived'].map((field) => (
                                        <Grid item xs={3} key={field}>
                                            <Typography variant="body2" color="textSecondary">{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Typography>
                                            {editPerson && editPerson.id === person.id ? (
                                                <TextField
                                                    fullWidth
                                                    name={field}
                                                    value={editPerson[field]}
                                                    onChange={(e) => handleInputChange(e, true)}
                                                    variant="outlined"
                                                />
                                            ) : (
                                                <Typography variant="body1">{person[field]}</Typography>
                                            )}
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>




                            {/* Secondary Educational Information */}
                            <Box sx={{ marginBottom: 3 }}>
                                <Typography variant="subtitle2"><h4>Secondary Education</h4></Typography>
                                <Grid container spacing={2}>
                                    {['secondaryNameOfSchool', 'secondaryDegree', 'secondaryPeriodFrom', 'secondaryPeriodTo', 'secondaryHighestAttained', 'secondaryYearGraduated', 'secondaryScholarshipAcademicHonorsReceived'].map((field) => (
                                        <Grid item xs={3} key={field}>
                                            <Typography variant="body2" color="textSecondary">{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Typography>
                                            {editPerson && editPerson.id === person.id ? (
                                                <TextField
                                                    fullWidth
                                                    name={field}
                                                    value={editPerson[field]}
                                                    onChange={(e) => handleInputChange(e, true)}
                                                    variant="outlined"
                                                />
                                            ) : (
                                                <Typography variant="body1">{person[field]}</Typography>
                                            )}
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Box>








                        {/* Action Buttons */}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            {editPerson && editPerson.id === person.id ? (
                                <>
                                    <Button onClick={updateItem} variant="contained" 
                                    color="primary" 
                                    style={{
                                        backgroundColor: '#6D2323',
                                        color: '#FEF9E1',
                                        width: '100px',
                                        height: '40px',
                                        marginBottom: '5px',
                                    }} 
                                     startIcon={<SaveIcon />}>Update</Button>
                                <Button onClick={() => setEditPerson(null)} 
                                variant="contained" 
                                color="secondary" 
                                style={{ backgroundColor: 'black',
                                    color: 'white',
                                    width: '100px',
                                    height: '40px',
                                    marginBottom: '5px',
                                    marginLeft: '10px', 
                                }} 
                                startIcon={<CancelIcon />}>
                                    Cancel
                                </Button>
                                </>
                            ) : (
                                <>
                                    <Button onClick={() => setEditPerson(person)} 
                                    variant="contained" 
                                    color="primary" 
                                    style={{ backgroundColor: '#6D2323',
                                        color: '#FEF9E1',
                                        width: '100px',
                                        height: '40px',
                                        marginBottom: '5px', 
                                    }}
                                     startIcon={<EditIcon />}>Edit</Button>
                        <Button onClick={() => deleteItem(person.id)} 
                        variant="contained" 
                        color="secondary" 
                        style={{ backgroundColor: 'black',
                        color: 'white',
                        width: '100px',
                        height: '40px',
                        marginBottom: '5px',
                        marginLeft: '10px', }} startIcon={<DeleteIcon />}>Delete</Button>
                                </>
                            )}
                        </Box>
                    </Box>
                ))}
            </Box>
        </Container>
    );
};




export default PersonTable;









