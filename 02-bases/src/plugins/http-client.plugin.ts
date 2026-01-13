//const { axios } = from 'axios';
import axios from 'axios';

const httpClientPlugin = {
    get: async(url: string) => {
        /* const resp = await fetch(url);
        return data = await resp.json(); */
        const {data} = await axios.get(url);
        return data;
    },
    post: (url: string, body: any) => {
    },
    put: (url: string, body: any) => {
    },
    delete: (url: string) => {
    },
}

export {
    httpClientPlugin,
};

