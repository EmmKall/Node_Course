const axios = require('axios');

const httpClientPlugin = {
    get: async(url) => {
        /* const resp = await fetch(url);
        return data = await resp.json(); */
        const {data} = await axios.get(url);
        return data;
    },
    post: (url, body) => {
    },
    put: (url, body) => {
    },
    delete: (url) => {
    },
}

module.exports = {
    httpClientPlugin,
};

