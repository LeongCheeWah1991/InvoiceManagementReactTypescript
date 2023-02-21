import axios from 'axios';

const host = 'http://localhost:8080/';

export const getRequest = (path, next, param) => {

	const requestOptions = {
		params: param,
	};

	axios
		.get(host + path, requestOptions)
		.then((response) => {
			console.log('get response', response);
			next({
				error: false,
				data: response.data,
			});
		})
		.catch((err) => {
			console.log('Error for GET Request - ' + path);
			next({
				error: true,
			});
		});
};