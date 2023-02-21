import {
	getRequest} from './APIUtils';

export const getInvoices = (next, param) => {
	getRequest('invoice/', next, param);
};
