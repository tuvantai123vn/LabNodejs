import axiosClient from './axiosClient';

const MessengerAPI = {
	getMessage: () => {
		const url = `/auth/mess/get/all`;
		return axiosClient.get(url);
	},

	getMessageId: (query) => {
		const url = `/auth/mess/${query}`;
		return axiosClient.get(url);
	},
};

export default MessengerAPI;
