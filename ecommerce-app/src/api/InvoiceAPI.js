import {
	getRequest,
	uploadRequest} from './APIUtils';

export const getInvoices = (next, param) => {
	getRequest('invoice/', next, param);
};

export const uploadInvoices = (next, param) => {
	uploadRequest('invoice/upload', next, param);
};