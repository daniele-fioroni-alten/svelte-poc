import { invalid, type Actions } from "@sveltejs/kit";
import type ServerUser from "$lib/server/models/user.model";
import users$ from "$lib/server/stores/users";

let users: ServerUser[] = [];

users$.subscribe(x => users = x);

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        
        const username = formData.get('username') as string;
        
        const password = formData.get('password') as string;

        const user = users.find(x => x.username === username && x.password === password);

        if (!user) {
            return invalid(400, { message: 'Invalid username or password.' });
        }
        
        return { success: true, user: { username } }
    },
};

export const ssr = false;