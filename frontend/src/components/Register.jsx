import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {Alert, TextField, Button, Container, Link} from '@mui/material';

const Register = () => {
    const [formData, setFormData] = useState({ 
        employeeNumber: '',
        username: '',
        email: '',
        role: 'administrator',
        password: '',
    });
    const [errMessage, setErrorMessage] = useState()
    const navigate = useNavigate();

    const handleChanges = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    }

    const handleRegister = async (event) => {
        event.preventDefault(); 
        if(!formData.employeeNumber || 
           !formData.email ||
           !formData.username ||
           !formData.password){   
            setErrorMessage("Please fill all asked credentials");
            return;
        }     
        
        try{
            await axios.post('http://localhost:5000/register', formData);
            navigate('/');
        } catch (error) {
            console.error('Registration Error', error);
            setErrorMessage("Invalid Credentials")
        };
    };

    return (
        <Container sx={{
            display: 'flex',  
            alignItems: 'center', 
            width: '25rem',
            minHeight: '70vh',
            margin: 'auto',
            marginTop:  '2%',
            justifyContent: 'center' 
        }}>
            <form onSubmit={handleRegister} className='Form'>
                <h1>Register</h1>
                {errMessage && (<Alert sx={{fontSize:'13px', textAlign: 'center'}} severity="error">{errMessage}</Alert>)}
                <TextField label="Employee Number" sx={{margin: '5% 0', width: '100%'}} onChange={(e) => setFormData({ ...formData, employeeNumber: e.target.value })} />
                <TextField label="Username" sx={{margin: '5% 0', width: '100%'}} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
                <TextField type='email' label="Email" sx={{marginBottom: '5%', width: '100%'}}  onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                <select name="role" id="Role" onClick={handleChanges}>
                    <option value="administrator">Admin</option>
                    <option value="staff">Staff</option>
                </select>
                <TextField label="Password" sx={{marginBottom: '5%', width: '100%'}}  type="password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                
                
                <Button type="submit" variant='contained' sx={{width: '100%', bgcolor: '#6c0b19'}}>Register</Button>
                <h5>Already have an account? <Link href="/">Sign In</Link></h5>
            </form>
        </Container>
    );
};

export default Register;