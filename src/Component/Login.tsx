import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Container, Form, Button} from "react-bootstrap";
import user from "../user.json";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [Error, setError] = useState(false);
  const manager = user.user.find((user) => user.manager?.role === "manager");
  const admin = user.user.find((user) => user.admin?.role === "admin");
  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must start with an uppercase letter and include lowercase letters, a digit, and a special character."
      );
    } else {
      setErrorMessage("");
    }
  };

  useEffect(() => {
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    setErrorMessage("");
  }, [email, password]);

  const handleLogin = () => {
    if (admin?.admin?.email === email && admin?.admin?.password === password) {
      localStorage.setItem("role", admin?.admin.role);
      navigate("/home");
    } else if (
      manager?.manager?.email === email &&
      manager?.manager?.password === password
    ) {
      localStorage.setItem("role", manager?.manager.role);
      navigate("/home");
    } else {
      setError(true);
      setErrorMessage("Incorrect email or password. Please try again.");
    }
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

        {errorMessage && Error && (
          <div style={{color: "red"}}>{errorMessage}</div>
        )}
      </Form>
    </Container>
  );
};

export default LoginForm;
