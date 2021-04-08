const mongodb = require('mongodb');

const {
    MONGO_URL,
    MONGO_DB_USER,
    MONGO_DB_PASSWORD,
} = require('../../config.json');

module.exports = async function connectToCovid19DB() {
    try {
        const client = await mongodb.MongoClient.connect(MONGO_URL, {
            auth: {
                user: MONGO_DB_USER,
                password: MONGO_DB_PASSWORD,
            },
            useUnifiedTopology: true,
        });

        return client.db('covid-19').collection('data');
    } catch (error) {
        console.log(error);
    }
};
