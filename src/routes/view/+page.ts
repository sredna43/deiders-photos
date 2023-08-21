import { API_URL } from '$lib';

export async function load({ fetch }) {
	try {
		const resp = await fetch(`${API_URL}/images`);
		const json = await resp.json();
		return {
			images: json
		};
	} catch (error) {
		return {
			images: []
		};
	}
}
