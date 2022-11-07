import { POSTS_ENDPOINT } from "$lib/constants";
import { error, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async () => {
    const response = await fetch(POSTS_ENDPOINT);

    switch (response.status) {
        case 404:
            return {
                posts: [],
            };

        case 200:
            return {
                posts: await response.json()
            };

        default:
            throw error(response.status, 'Error retrieving posts.');
    }
};