import React, { useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap';

const EditContactModal = ({show, handleClose, contact, handleSave}) => {

    const [updatedContact, setUpdatedContact] = useState({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        address: contact.address,
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUpdatedContact ({...updatedContact, [name]: value})
    };

    const handleSubmit = () => {
        handleSave (contact.id, updatedContact);
        handleClose ();
    }

    return (
        <Modal show={show} onHide={handleClose}> 
        <Modal.Header closeButton>
            <Modal.Title>
                Edit Contact: 
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group>
                    <Form.Label>
                        Name:
                    </Form.Label>
                    <Form.Control 
                    type="text"
                    name="name"
                    value={updatedContact.name}
                    onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Email:
                    </Form.Label>
                    <Form.Control 
                    type="email"
                    name="email"
                    value={updatedContact.email}
                    onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Phone:
                    </Form.Label>
                    <Form.Control 
                    type="text"
                    name="phone"
                    value={updatedContact.phone}
                    onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Address:
                    </Form.Label>
                    <Form.Control 
                    type="text"
                    name="address"
                    value={updatedContact.address}
                    onChange={handleChange}
                    />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
        </Modal.Footer>
        </Modal>
    )
}

export default EditContactModal; 