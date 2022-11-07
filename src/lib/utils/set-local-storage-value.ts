import { browser } from "$app/environment";

const setLocalStorageValue = (key: string, value: string) => {
    if (browser) {
        window.localStorage.setItem(key, value);
    }
}

export default setLocalStorageValue;