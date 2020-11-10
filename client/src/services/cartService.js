import http from './httpService';
import { apiUrl } from '../config.json';
const apiEndpoint = apiUrl + '/buys/cart';

function itemUrl(id) {
	return `${apiEndpoint}/${id}`;
}

export function additem(itemId) {
	return http.post(apiEndpoint, {
		itemadd: itemId,
	});
}

export function getCart() {
	return http.get(apiEndpoint);
}

export function deleteItem(itemId) {
	return http.delete(itemUrl(itemId));
}

export function deleteItems() {
	return http.delete(apiEndpoint);
}
