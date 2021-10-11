const axios = require('axios').create({
    baseURL:`https://api.heroku.com`,
    headers: {
        Authorization: `Bearer ${process.env.HEROKU_API_KEY}`,
        Accept: "application/vnd.heroku+json; version=3"
    }
});

const getCreds = async():Promise<any> => {
    const response = await axios.get(`addons/${process.env.HEROKU_POSTGRES_INSTANCE}/config`);
    const connectionString = await response.data[0].value;
    return connectionString;
}

export default await getCreds(); 