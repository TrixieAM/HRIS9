import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, TextField, Button, Container, Link } from "@mui/material";

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
        display: "flex",
        alignItems: "center",
        width: "25rem",
        minHeight: "70vh",
        margin: "auto",
        marginTop: "2%",
        justifyContent: "center",
      }}
    >
      <form className="Form" onSubmit={handleLogin} >
        <h1>Login</h1>
        {errMessage && (
          <Alert sx={{ textAlign: "center" }} severity="error">
            {errMessage}
          </Alert>
        )}

        <TextField name="email" label="Email" sx={{ margin: "5% 0", width: "100%" }} autoComplete="email" onChange={handleChanges} />
        <TextField name="password" label="Password" sx={{ marginBottom: "5%", width: "100%" }} type="password" autoComplete="current-password" onChange={handleChanges} />
        <p><b>Forgot Password?</b></p>
        <Button type="submit" variant="contained" sx={{ width: "100%", bgcolor: '#6c0b19'}}>
          Login
        </Button>
        <h5>
          Did not have an account? <Link href="Register">Sign Up</Link>
        </h5>
      </form>
    </Container>
  );
};

export default Login;
