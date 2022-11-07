import type User from "$lib/server/models/user.model";
import { writable } from "svelte/store";

export default writable<User[]>([{ username: 'dan', password: 'password' }]);
