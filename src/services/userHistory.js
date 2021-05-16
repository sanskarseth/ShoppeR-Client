import http from './httpService';
import { apiUrl } from '../config.json';
const apiEndpoint = apiUrl + '/buys/history';

export function getHistory() {
	return http.get(apiEndpoint);
}
