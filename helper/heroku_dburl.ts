const axios = require('axios');

const getCreds = async () => {
    const response = await axios.get(`https://api.heroku.com/addons/${process.env.HEROKU_POSTGRES_INSTANCE}/config`, {
        headers: {
            Authorization: `Bearer ${process.env.HEROKU_API_KEY}`,
            Accept: "application/vnd.heroku+json; version=3"
        }
    });
    const connectionString = await response.data[0].value;
    return connectionString;
}

export default await getCreds();