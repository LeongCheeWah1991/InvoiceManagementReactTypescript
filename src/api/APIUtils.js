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

export const uploadRequest = (path, next, body) => {
	console.log('body', body)

	const headers = {
		'Content-Type': 'application/json',
	};

	let formData = new FormData();
	formData.append('file', body.file);

	axios
		.post(host + path, formData, headers)
		.then((response) => {
			next({
				error: false,
				data: 'success',
			});
		})
		.catch((err) => {
			next({
				error: true,
			});
		});
};

