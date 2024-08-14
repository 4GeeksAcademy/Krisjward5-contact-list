import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { FaRegTrashCan, FaPhoneVolume } from "react-icons/fa6";
import { MdEmail, MdDriveFileRenameOutline } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { Button } from 'react-bootstrap';
import EditContactModal from "../component/EditContactModal";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [showModal, setShowModal] = useState(false);
	const [currentContact, setCurrentContact] = useState(null);

	useEffect(() => {
		actions.fetchContacts()
	}, []);

	const handleDeleteContact = async (contactId) => {
		if (window.confirm("Are you sure you want to delete this contact?")) {
			try {
				const success = await actions.deleteContact(contactId);
				if (success) {
					console.log("Contact deleted successfully");
				} else {
					console.error("Failed to delete contact");
				}
			} catch (error) {
				console.error("Error deleting contact:", error);
			}
		}
	};

	const handleEditContact = async (contactId, updatedContact) => {
		try {
			const success = await actions.editContact(contactId, updatedContact);
			if (success) {
				console.log("Contact edited successfully");
			} else {
				console.error("Failed to edit contact");
			}
		} catch (error) {
			console.error("Error editing contact:", error);
		}
	};

	const handleShowModal = (contact) => {
		setCurrentContact(contact);
		setShowModal(true);
	};

	const handleCloseModal = () => setShowModal(false);

	return (
		<div className="notebook">
			<h1>Contact List</h1>
			<div className="text-end mb-3">
				<Link to="/add-contact">
					<Button variant="primary">Add New Contact</Button>
				</Link>
				</div>
				<div className="contact-list">
					{store.contacts ? (
						store.contacts.map((contact) => (
							<div className="contact-item card" key={contact.id}>
								<p><MdDriveFileRenameOutline /> {contact.name}</p>
								<p><MdEmail /> {contact.email}</p>
								<p><FaPhoneVolume /> {contact.phone}</p>
								<p><FaMapMarkerAlt /> {contact.address}</p>
								<div className="contact-actions">
									<FaRegTrashCan
										onClick={() => handleDeleteContact(contact.id)}
									/>
									<CiEdit
										onClick={() => handleShowModal(contact)}
									/>
								</div>
							</div>
						))
					) : (
						<p>Loading contacts...</p>
					)}
				</div>
				{currentContact && (
					<EditContactModal
						show={showModal}
						handleClose={handleCloseModal}
						contact={currentContact}
						handleSave={handleEditContact}
					/>
				)}
			</div>
			);
}