import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
  Button,
  Input,
} from "reactstrap";

function AdminPortal() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/vendors');
      const data = await response.json();
      setVendors(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch vendors');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this vendor?')) {
      try {
        await fetch(`http://localhost:5000/api/vendors/${id}`, {
          method: 'DELETE',
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        });
        setVendors(vendors.filter(vendor => vendor._id !== id));
      } catch (err) {
        setError('Failed to delete vendor');
      }
    }
  };
const [newVendor, setNewVendor] = useState({
  name: '',
  type: '',
  status: 'Pending'
});

const [modal, setModal] = useState(false); // If using a modal for adding vendors

  const handleAdd = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/vendors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(newVendor)
      });
      const data = await response.json();
      setVendors([...vendors, data]);
      setModal(false);
      setNewVendor({ name: '', type: '', status: 'Pending' });
    } catch (err) {
      setError('Failed to add vendor');
    }
  };

  return (
    <div className="section" style={{ marginTop: "100px" }}>
      <Container>
        <Row>
          <Col>
            <h2>Admin Portal</h2>
            <Card className="card-plain">
              <CardHeader>
                <Row>
                  <Col md="6">
                    <h3>Vendor Management</h3>
                  </Col>
                  <Col md="6" className="text-right">
                    <Input
                      placeholder="Search vendors..."
                      type="text"
                      style={{ maxWidth: "200px", float: "right" }}
                    />
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Vendor Name</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendors.map((vendor) => (
                      <tr key={vendor._id}>
                        <td>{vendor._id}</td>
                        <td>{vendor.name}</td>
                        <td>{vendor.type}</td>
                        <td>
                          <span
                            className={`badge ${
                              vendor.status === "Active"
                                ? "bg-success"
                                : "bg-warning"
                            }`}
                          >
                            {vendor.status}
                          </span>
                        </td>
                        <td>
                          <Button
                            color="info"
                            size="sm"
                            className="mr-2"
                          >
                            Edit
                          </Button>
                          <Button
                            color="danger"
                            size="sm"
                            onClick={() => handleDelete(vendor._id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminPortal;