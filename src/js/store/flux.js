const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: []
		},
		actions: {
			fetchContacts: () => {
				fetch('https://playground.4geeks.com/contact/agendas/kris/contacts')
					.then((res) => res.json())
					.then((agendas) => {
						setStore({ contacts: agendas.contacts });
					})
					.catch((err) => console.error(err));
			},
			// editContact: (contact, index) => {
			// 	const tempContacts = getStore().contacts.toSpliced(index, 1, contact);
			// 	setStore({ contacts: tempContacts })
			// 		.then(() => {
			// 			const url = `https://playground.4geeks.com/contact/agendas/kris/contacts/${contact.id}`;
			// 			const method = 'PUT';
			// 			const body = JSON.stringify({
			// 				"full_name": contact.full_name,
			// 				"email": contact.email,
			// 				"agenda_slug": "kris",
			// 				"address": contact.address,
			// 				"phone": contact.phone,
			// 			});
			// 			return getActions().fetchAPI(url, method, body);
			// 		})
			// 		.then(response => {
			// 			// Handle the response if needed
			// 			console.log("Contact updated successfully:", response);
			// 		})
			// 		.catch(error => {
			// 			console.error("Error updating contact:", error);
			// 		});
			// },

			editContact: async (id, updatedContact) => {
				const store = getStore();
				try {
				  const response = await fetch(
					`https://playground.4geeks.com/contact/agendas/kris/contacts/${id}`,
					{
					  method: "PUT",
					  headers: { "Content-Type": "application/json" },
					  body: JSON.stringify(updatedContact)
					}
				  );
				  if (!response.ok) {
					throw new Error('Failed to edit contact');
				  }
				  const data = await response.json();
				  
				  setStore({
					contacts: store.contacts.map(contact => 
					  contact.id === id ? { ...contact, ...updatedContact } : contact
					)
				  });
				  
				  return true;
				} catch (error) {
				  console.error("Error editing contact:", error);
				  return false;
				}
			  },

			deleteContact: async (id) => {
				const store = getStore();
				try {
				  const response = await fetch(
					`https://playground.4geeks.com/contact/agendas/kris/contacts/${id}`,
					{
					  method: "DELETE",
					  headers: { "Content-Type": "application/json" },
					}
				  );
				  if (!response.ok) {
					throw new Error('Failed to delete contact');
				  }
				  // Update local state immediately
				  setStore({
					contacts: store.contacts.filter((contact) => contact.id !== id),
				  });
				  // Refetch contacts to ensure synchronization
				  await actions.fetchContacts();
				  return true;
				} catch (error) {
				  console.error("Error deleting contact:", error);
				  return false;
				}
			  },

		}
	};
};

export default getState;
