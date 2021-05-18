const mongodb = require('mongodb');

module.exports = async function connectToCovid19DB() {
    try {
        const client = await mongodb.MongoClient.connect(
            process.env.MONGO_URL,
            {
                auth: {
                    user: process.env.MONGO_DB_USER,
                    password: process.env.MONGO_DB_PASSWORD,
                },
                useUnifiedTopology: true,
            }
        );

        return client.db('covid-19').collection('data');
    } catch (error) {
        console.log(error);
    }
};
