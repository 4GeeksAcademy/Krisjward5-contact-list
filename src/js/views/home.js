import React, {useContext, useEffect, useState} from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";

export const Home = () => {

	const { store, actions } = useContext(Context);

	useEffect (() => {
		actions.fetchContacts()
	}, []);
	
	return (
	<div className="text-center mt-5">
		<h1>Home Page!</h1>

		{store.contacts.map((contact) => (
			<div>
				<p>Name: {contact.name}</p>
				<p>Email: {contact.email}</p>
				<p>Phone: {contact.phone}</p>
				<p>Address: {contact.address}</p>
			</div>
		))};	
	</div>
);}
