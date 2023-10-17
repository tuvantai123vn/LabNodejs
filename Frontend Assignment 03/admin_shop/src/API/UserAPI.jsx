import axiosClient from './axiosClient';

const UserAPI = {
	getAllData: () => {
		const url = '/auth/getalluser';
		return axiosClient.get(url);
	},

	getDetailData: (id) => {
		const url = `/users/${id}`;
		return axiosClient.get(url);
	},

	postSignUp: (query) => {
		const url = `/users/signup/${query}`;
		return axiosClient.post(url);
	},
	postSignUpAdmin: (query) => {
		const url = `/auth/loginadmin`;
		return axiosClient.post(url, query);
	},
};

export default UserAPI;
