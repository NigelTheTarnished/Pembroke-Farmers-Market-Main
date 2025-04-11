import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

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
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
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
      if (await login(formData)) {
        // Successful login, navigate to vendors page
        navigate("/vendors");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
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
                {error && <p style={{ color: "red" }}>{error}</p>}
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
