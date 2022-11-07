import { browser } from "$app/environment";

const getLocalStorageValue = (key: string) => {
    if (browser) {
        return window.localStorage.getItem(key) || '';
    }

    return '';
}

export default getLocalStorageValue;