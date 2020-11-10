import http from './httpService';
import { apiUrl } from '../config.json';

export function getCategories() {
	return http.get(apiUrl + '/categories');
}
