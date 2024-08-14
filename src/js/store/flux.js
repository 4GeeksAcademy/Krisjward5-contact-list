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

			addContact: async (newContact) => {
				try {
					const response = await fetch(
						'https://playground.4geeks.com/contact/agendas/kris/contacts',
						{
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify(newContact)
						}
					);
					if (!response.ok) {
						throw new Error('Failed to add contact');
					}
					const data = await response.json();
					const store = getStore();
					setStore({
						contacts: [...store.contacts, data]
					});
					return true;
				} catch (error) {
					console.error("Error adding contact:", error);
					return false;
				}
			},

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
					  contact.id === id ? { ...contact, ...data } : contact
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
