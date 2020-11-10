import http from './httpService';
import { apiUrl } from '../config.json';
const apiEndpoint = apiUrl + '/users';

export function register(user) {
	return http.post(apiEndpoint, {
		email: user.username,
		password: user.password,
		name: user.name,
		phone: user.phone,
	});
}

export function additem(itemId) {
	return http.put(apiEndpoint + '/me/cart', {
		itemadd: itemId,
	});
}

export function getCart() {
	return http.get(apiEndpoint + '/me/cart', {});
}