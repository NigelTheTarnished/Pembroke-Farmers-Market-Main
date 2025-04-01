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

  const handleSubmit = async e => {
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
      console.error("Error submitting vendor:", error.message);
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
    <div style={{ padding: '2rem' }}>
      <h2>Vendor Management</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input name="type" placeholder="Type" value={formData.type} onChange={handleChange} required />
        <input name="status" placeholder="Status" value={formData.status} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
        <button type="submit">{editingId ? 'Update' : 'Add'} Vendor</button>
      </form>

      <ul>
        {vendors.map(v => (
          <li key={v._id}>
            {v.name} | {v.type} | {v.status} | {v.email} | {v.phone}
            <button onClick={() => handleEdit(v)}>Edit</button>
            <button onClick={() => handleDelete(v._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VendorManagement;
