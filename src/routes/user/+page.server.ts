import type { Actions } from "@sveltejs/kit";

export const actions: Actions = {
    logout: () => {
        return { success: true, user: null };
    }
};
