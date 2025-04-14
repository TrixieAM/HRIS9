import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, TextField, Button, Container, Link, Box } from "@mui/material";
import earistLogo from "../assets/earistLogo.jpg";


const Login = () => {
  const [formData, setFormData] = useState({
    // employeeNumber: '',
    email: "",
    password: "",
  });
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const navigate = useNavigate();
  const [errMessage, setErrorMessage] = useState();

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      setErrorMessage("Please fill all asked credentials");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      console.log("Login response status:", response.status);
      if (response.ok) {
        const data = await response.json();
        console.log("Login response data:", data);

        if (data.token) {
          localStorage.setItem("token", data.token);
          const decoded = JSON.parse(atob(data.token.split(".")[1]));
          console.log("Decoded JWT:", decoded);

          // setIsLoggedIn(true); // Set the user as logged in
          if (decoded.role === "superadmin") {
            navigate("/home");
          } else if (decoded.role === "administrator") {
            navigate("/home");
          } else if (decoded.role === "staff") {
            navigate("/pdsfile");
          } else {
            setErrorMessage("Unauthorized role");
          }
        } else {
          setError("No token received from the server.");
          console.error("No token received");
        }
      } else {
        const data = await response.json();
        setError(data.error || "Invalid credentials");
        console.error("Login failed:", data.error);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Invalid Credentials");
    }
  };

  // useEffect(() => {
  //     if (isLoggedIn) {
  //         // Handle the navigation if needed after successful login
  //     }
  // }, [isLoggedIn]);

  return (
    <Container
      sx={{
        width: "90%", // Make the container take full viewport width
        height: "90%", // Make the container take full viewport height
        backgroundColor: '#ffffff', // Optional: A light grey background for the outer area
        display: 'flex',
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
        marginLeft:'-18%',
        marginBottom:'25px',
        paddingBottom:'40px',
      }}
    >
      <form className="Form" onSubmit={handleLogin} >
      <Box
  sx={{
    backgroundColor: "#A31D1D",
    borderRadius: 4,
    padding: 3,
    marginTop:'-81px',
    justifyContent: "center",
    width: 'calc(80% + 25%)', // assuming Paper padding is 32px on each side
    marginLeft: '-33px',
    marginBottom: '30px',
  }}
>   
  <img
    src={earistLogo}
    alt="E.A.R.I.S.T Logo"
    style={{ height: 100, borderRadius: "50%", backgroundColor: "white", paddingTop: "2px", paddingBottom:'2.50px', paddingLeft:'2.50px', paddingRight:'3px' }}
  />
</Box>
        <h2>Login to your Account</h2>
        {errMessage && (
          <Alert sx={{ textAlign: "center" }} severity="error">
            {errMessage}
          </Alert>
        )}

        <TextField name="email" label="Email" sx={{ margin: "5% 0", width: "100%" }} autoComplete="email" onChange={handleChanges} />
        <TextField name="password" label="Password" sx={{ marginBottom: "5%", width: "100%" }} type="password" autoComplete="current-password" onChange={handleChanges} />
        <p>
          <Link
            onClick={() => navigate("/forgot-password")} underline="hover"
            sx={{ cursor: "pointer", color: "black", fontSize: "12px", textDecoration: "none"}}
          >
            Forgot your Password?
          </Link>
        </p>
        <Button type="submit" variant="contained" sx={{ width: "100%", bgcolor: '#A31D1D'}}>
          Login
        </Button>
        
      </form>
    </Container>
  );
};

export default Login;
