import http from './httpService';
import { apiUrl } from '../config.json';
const apiEndpoint = apiUrl + '/payment';

export function pay_order(amount, orderId) {
	return http.post(apiEndpoint + '/orders', {
		amount: amount,
		orderId: orderId,
	});
}

export function pay_success(data) {
	return http.post(apiEndpoint + '/success', data);
}
