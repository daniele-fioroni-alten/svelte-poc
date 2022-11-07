import { userExists } from "$lib/stores/user";
import { redirect, type Load } from "@sveltejs/kit";

export const load: Load = () => {
    if( userExists() ){
        throw redirect(302, '/user');
    }
}