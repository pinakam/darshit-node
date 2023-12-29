import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Container, Form, Button} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  useEffect(()=>{
    localStorage.setItem("email",email)
    localStorage.setItem("password",password)
  },[email,password])
  const handleLogin = () => {
    if (!email || !password) {
      alert("Email or Password is missing");
    } else {
      navigate("/home");
    }

    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">Login Form</h2>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Form.Group>

        <Button variant="primary" type="button" onClick={handleLogin}>
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default LoginForm;
