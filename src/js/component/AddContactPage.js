import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Form, Button } from 'react-bootstrap';

const AddContactPage = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const [newContact, setNewContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewContact({ ...newContact, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await actions.addContact(newContact);
        if (success) {
            navigate('/');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Add New Contact</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={newContact.name} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={newContact.email} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" name="phone" value={newContact.phone} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="address" value={newContact.address} onChange={handleChange} required />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Contact
                </Button>
                <Button variant="secondary" onClick={() => navigate('/')} className="ms-2">
                    Cancel
                </Button>
            </Form>
        </div>
    );
};

export default AddContactPage;