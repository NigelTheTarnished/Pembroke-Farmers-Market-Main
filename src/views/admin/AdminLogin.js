import React, { useState } from "react";
import { Container, Row, Col, Card, CardBody, Form, Input, Button } from "reactstrap";

function AdminLogin() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    console.log("Login attempted with:", credentials);
  };

  return (
    <div className="section" style={{ marginTop: "100px" }}>
      <Container>
        <Row className="justify-content-center">
          <Col md="6">
            <Card>
              <CardBody>
                <h3>Admin Login</h3>
                <Form onSubmit={handleLogin}>
                  <div className="form-group">
                    <label>Email</label>
                    <Input
                      type="email"
                      value={credentials.email}
                      onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label>Password</label>
                    <Input
                      type="password"
                      value={credentials.password}
                      onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                      required
                    />
                  </div>
                  <Button
                    color="primary"
                    type="submit"
                    className="mt-4"
                    block
                  >
                    Login
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminLogin;