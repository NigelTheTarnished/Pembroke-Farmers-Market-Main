import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

// reactstrap components
import {
  Table,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

function VendorManagement() {
  const [vendors, setVendors] = useState([]);
  const [editingVendor, setEditingVendor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    status: 'Active',
    email: '',
    phone: '',
  });
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  // Check authentication on component mount
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    // Fetch vendors
    const fetchVendors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/vendors', {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        });
        setVendors(response.data);
      } catch (error) {
        console.error('Error fetching vendors:', error);
        if (error.response?.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchVendors();
  }, [navigate]);

  const toggle = () => {
    setModal(!modal);
    if (!modal) {
      setFormData({
        name: '',
        type: '',
        status: 'Active',
        email: '',
        phone: '',
      });
      setEditingVendor(null);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingVendor) {
        await axios.put(
          `http://localhost:5000/api/vendors/${editingVendor._id}`,
          formData,
          {
            headers: {
              'x-auth-token': localStorage.getItem('token')
            }
          }
        );
      } else {
        await axios.post(
          'http://localhost:5000/api/vendors',
          formData,
          {
            headers: {
              'x-auth-token': localStorage.getItem('token')
            }
          }
        );
      }
      const response = await axios.get(
        'http://localhost:5000/api/vendors',
        {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        }
      );
      setVendors(response.data);
      toggle();
    } catch (error) {
      console.error('Error saving vendor:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleEdit = (vendor) => {
    setEditingVendor(vendor);
    setFormData({
      name: vendor.name,
      type: vendor.type,
      status: vendor.status,
      email: vendor.email,
      phone: vendor.phone,
    });
    toggle();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this vendor?')) {
      try {
        await axios.delete(
          `http://localhost:5000/api/vendors/${id}`,
          {
            headers: {
              'x-auth-token': localStorage.getItem('token')
            }
          }
        );
        const response = await axios.get(
          'http://localhost:5000/api/vendors',
          {
            headers: {
              'x-auth-token': localStorage.getItem('token')
            }
          }
        );
        setVendors(response.data);
      } catch (error) {
        console.error('Error deleting vendor:', error);
        if (error.response?.status === 401) {
          navigate('/login');
        }
      }
    }
  };

  return (
    <Container>
      <h1>Vendor Management</h1>
      <Button color="primary" onClick={toggle} className="mb-3">
        Add Vendor
      </Button>

      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Status</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor._id}>
              <td>{vendor.name}</td>
              <td>{vendor.type}</td>
              <td>{vendor.status}</td>
              <td>{vendor.email}</td>
              <td>{vendor.phone}</td>
              <td>
                <Button
                  color="info"
                  size="sm"
                  onClick={() => handleEdit(vendor)}
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

      <Modal isOpen={modal} toggle={toggle}>
        <Form onSubmit={handleSubmit}>
          <ModalHeader toggle={toggle}>
            {editingVendor ? 'Edit Vendor' : 'Add Vendor'}
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="type">Type</Label>
              <Input
                type="text"
                name="type"
                id="type"
                value={formData.type}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="status">Status</Label>
              <Input
                type="select"
                name="status"
                id="status"
                value={formData.status}
                onChange={handleInputChange}
                required
              >
                <option>Active</option>
                <option>Inactive</option>
                <option>Pending</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="phone">Phone</Label>
              <Input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">
              {editingVendor ? 'Update' : 'Add'}
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </Container>
  );
}

export default VendorManagement;
