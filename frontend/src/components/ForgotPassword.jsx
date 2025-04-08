import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, TextField, Button, Container, Link, Box } from "@mui/material";
import earistLogo from "../assets/earistLogo.jpg";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [errMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle success (e.g., show success message)
        alert("Reset link sent to your email.");
        navigate("/");
      } else {
        const data = await response.json();
        setErrorMessage(data.error || "Failed to send reset link.");
      }
    } catch (error) {
      console.error("Error sending reset link:", error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <Container
      sx={{
        width: "90%",
        height: "90%",
        backgroundColor: "#ffffff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "-18%",
        marginBottom: "25px",
        paddingBottom: "40px",
      }}
    >
      <form className="Form" onSubmit={handleSubmit}>
        <Box
          sx={{
            backgroundColor: "#A31D1D",
            borderRadius: 4,
            padding: 3,
            marginTop: "-81px",
            justifyContent: "center",
            width: "calc(80% + 25%)",
            marginLeft: "-33px",
            marginBottom: "30px",
          }}
        >
          <img
            src={earistLogo}
            alt="E.A.R.I.S.T Logo"
            style={{
              height: 100,
              borderRadius: "50%",
              backgroundColor: "white",
              paddingTop: "2px",
              paddingBottom: "2.5px",
              paddingLeft: "2.5px",
              paddingRight: "3px",
            }}
          />
        </Box>

        <h2>Forgot Password</h2>

        {errMessage && (
          <Alert sx={{ textAlign: "center" }} severity="error">
            {errMessage}
          </Alert>
        )}

        <TextField
          name="name"
          label="Name"
          sx={{ margin: "5% 0", width: "100%" }}
          onChange={handleChanges}
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          sx={{ marginBottom: "5%", width: "100%" }}
          autoComplete="email"
          onChange={handleChanges}
        />

        <Button type="submit" variant="contained" sx={{ width: "100%", bgcolor: "#A31D1D" }}>
          Send Reset Link
        </Button>

        <p style={{ marginTop: "20px", color: 'black', fontSize: "13px" }}>
          Remember your password?{" "}
          <Link href="/" underline="hover">
            Login
          </Link>
        </p>
      </form>
    </Container>
  );
};

export default ForgotPassword;
