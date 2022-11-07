import { invalid, type Actions } from "@sveltejs/kit";
import type ServerUser from "$lib/server/models/user.model";
import users$ from "$lib/server/stores/users";

let users: ServerUser[] = [];

users$.subscribe(x => users = x);

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();

        const username = formData.get('username') as string;

        const password = formData.getAll('password[]') as string[];

        if (password[0].length < 4) {
            return invalid(400, { message: 'Password is too weak.' });
        }
    
        if (password[0] !== password[1]) {
            return invalid(400, { message: 'Passwords mismatch.' });
        }
    
        if (username.length < 4) {
            return invalid(400, { message: 'Username is invalid.' });
        }
    
        const user = users.find(x => x.username === username);
    
        if (user) {
            return invalid(400, { message: 'Username is already in use.' });
        }
    
        users$.set([...users, {
            username,
    
            password: password[0]
        }]);
        
        return { success: true, user: { username } };
    }
};

export const ssr = false;