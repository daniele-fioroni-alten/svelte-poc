import type User from "$lib/models/user.model";
import getLocalStorageValue from "$lib/utils/get-local-storage-value";
import setLocalStorageValue from "$lib/utils/set-local-storage-value";
import { writable } from "svelte/store";

let user: User | null = JSON.parse(getLocalStorageValue('user') || 'null');

const user$ = writable<User | null>(user);

user$.subscribe(x => {
    user = x;

    setLocalStorageValue('user', JSON.stringify(x));
});

export const userExists = () => !!user;

export default user$;