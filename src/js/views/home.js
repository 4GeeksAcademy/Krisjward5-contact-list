import React, { useContext, useEffect, useState } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { FaRegTrashCan, FaPhoneVolume, } from "react-icons/fa6";
import { MdEmail, MdDriveFileRenameOutline } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";




export const Home = () => {

	const { store, actions } = useContext(Context);

	const id = { useParams }

	useEffect(() => {
		actions.fetchContacts()
	}, []);


	const handleDeleteContact = async (contactId) => {
		if (window.confirm("Are you sure you want to delete this contact?")) {
			try {
				const success = await actions.deleteContact(contactId);
				if (success) {
					console.log("Contact deleted successfully");
					// The state is already updated in the deleteContact function
				} else {
					console.error("Failed to delete contact");
				}
			} catch (error) {
				console.error("Error deleting contact:", error);
			}
		}
	};


	return (
		<div className="text-center mt-5">
			<h1>Home Page!</h1>

			{store.contacts.map((contact) => (
				<div className="card">
					<p> <MdDriveFileRenameOutline /> {contact.name}</p>
					<p> <MdEmail /> {contact.email}</p>
					<p> <FaPhoneVolume />
						{contact.phone}</p>
					<p> <FaMapMarkerAlt /> {contact.address}</p>
					<div>
						<FaRegTrashCan
							onClick={() => handleDeleteContact(contact.id)}
						/>
					</div>
				</div>
			))}
		</div>
	);
}
