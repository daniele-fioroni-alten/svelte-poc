import { POSTS_ENDPOINT } from "$lib/constants";
import { error, type ServerLoad, type ServerLoadEvent } from "@sveltejs/kit";

export const load: ServerLoad = async (event: ServerLoadEvent) => {
    const response = await fetch(POSTS_ENDPOINT + '/' + event.params.id);

    switch (response.status) {
        case 404:
            throw error(response.status, 'No such post.');

        case 200:
            return {
                post: await response.json()
            };

        default:
            throw error(response.status, 'Error retrieving posts.');
    }
};