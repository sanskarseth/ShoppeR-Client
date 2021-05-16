import http from './httpService';
import { apiUrl } from '../config.json';
const apiEndpoint = apiUrl + '/items';

function itemUrl(id) {
	return `${apiEndpoint}/${id}`;
}

export function getItems() {
	return http.get(apiEndpoint);
}

export function deleteItem(itemId) {
	return http.delete(itemUrl(itemId));
}

export function getItem(itemId) {
	return http.get(itemUrl(itemId));
}

export function saveItem(item) {
	if (item._id) {
		const body = { ...item };
		delete body._id;
		return http.put(itemUrl(item._id), body);
	}

	return http.post(apiEndpoint, item);
}
