import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// reactstrap components
import {
  Button,
  Card,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        // Get the redirect URL from localStorage or default to /vendors
        const redirectUrl = localStorage.getItem("redirectUrl") || "/vendors";
        localStorage.removeItem("redirectUrl"); // Clear the saved URL
        navigate(redirectUrl);
      }
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
    }
  };

  return (
    <div
      className="page-header"
      style={{
        backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")",
      }}
    >
      <div className="filter" />
      <Container>
        <Row>
          <Col className="ml-auto mr-auto" lg="4">
            <Card className="card-register ml-auto mr-auto">
              <h3 className="title mx-auto">Welcome</h3>
              <Form onSubmit={handleSubmit}>
                <label>Email</label>
                <Input
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label>Password</label>
                <Input
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <Button block className="btn-round" color="danger" type="submit">
                  Login
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LoginPage;
