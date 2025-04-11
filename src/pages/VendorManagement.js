import React, { useEffect, useState } from 'react';
import axios from 'axios';


const baseURL = "http://localhost:5000/api/vendors";

const VendorManagement = () => {
  const [vendors, setVendors] = useState([]);
  const [formData, setFormData] = useState({
    name: '', type: '', status: '', email: '', phone: ''
  });
  const [editingId, setEditingId] = useState(null);

  const fetchVendors = async () => {
    try {
      const res = await axios.get(baseURL);
      setVendors(res.data);
    } catch (error) {
      console.error("Error fetching vendors:", error.message);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

/*const handleSubmit = async e => {
  e.preventDefault();
  try {
    if (editingId) {
      await axios.put(`${baseURL}/${editingId}`, formData);
    } else {
      await axios.post(baseURL, formData);
    }
 
    setFormData({ name: '', type: '', status: '', email: '', phone: '' });
    setEditingId(null);
    fetchVendors();
  } catch (error) {
    console.error("Error submitting vendor:", error.response?.data || error.message);
  }
};*/
const handleSubmit = async e => {
  e.preventDefault();
  try {
    const payload = {
      ...formData,
      status: Number(formData.status) // 👈 Convert to number
    };

    if (editingId) {
      await axios.put(`${baseURL}/${editingId}`, payload);
    } else {
      await axios.post(`${baseURL}/register`, payload);
    }

    setFormData({ name: '', type: '', status: '', email: '', phone: '' });
    setEditingId(null);
    fetchVendors();
  } catch (error) {
    console.error("Error submitting vendor:", error.response?.data || error.message);
  }
};

  


  const handleEdit = vendor => {
    setFormData({
      name: vendor.name || '',
      type: vendor.type || '',
      status: vendor.status || '',
      email: vendor.email || '',
      phone: vendor.phone || ''
    });
    setEditingId(vendor._id);
  };

  const handleDelete = async id => {
    console.log("Trying to delete vendor with ID:", id);
    try {
      await axios.delete(`${baseURL}/${id}`);
      console.log("Delete successful");
      fetchVendors();
    } catch (error) {
      console.error("Delete failed:", error.response?.data || error.message);
    }
  };

  return (
    <div style={{ padding: '2rem', color: 'black' }}>
      <h2>Vendor Management</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input name="type" placeholder="Type" value={formData.type} onChange={handleChange} required />
        <select name="status" value={formData.status} onChange={handleChange} required>
          <option value="">Select Status</option>
          <option value="0">Suspended</option>
          <option value="1">Active</option>
          <option value="2">Pending</option>
          <option value="3">Inactive</option>
        </select>
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
        <button type="submit">{editingId ? 'Update' : 'Add'} Vendor</button>
      </form>

      <table border="1" cellPadding="8" cellSpacing="0" style={{ marginTop: '2rem', width: '100%', color: 'black' }}>
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
          {vendors.map(v => (
            <tr key={v._id}>
              <td>{v.name || '-'}</td>
              <td>{v.type || '-'}</td>
              <td>
                {{
                  0: 'Suspended',
                  1: 'Active',
                  2: 'Pending',
                  3: 'Inactive'
                }[v.status] || '-'}
              </td>
              <td>{v.email || '-'}</td>
              <td>{v.phone || '-'}</td>
              <td>
                <button onClick={() => handleEdit(v)}>Edit</button>{' '}
                <button onClick={() => handleDelete(v._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default VendorManagement;
