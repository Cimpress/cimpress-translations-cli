const axios = require('axios');

const getAccessToken = async (clientId, clientSecret) => {

    const response = await axios.post('https://cimpress.auth0.com/oauth/token',{
        client_id: clientId,
        client_secret: clientSecret,
        audience: 'https://api.cimpress.io/',
        grant_type: 'client_credentials',
    });

    return response.data.access_token;
};

module.exports = {
    getAccessToken
};
