import type { Handle, HandleFetch, HandleServerError } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    
    return resolve(event);
};

export const handleFetch: HandleFetch = async ({ request, fetch }) => fetch(request);
 
export const handleError: HandleServerError = console.error