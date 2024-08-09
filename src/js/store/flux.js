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
			}
		}
	};
};

export default getState;
