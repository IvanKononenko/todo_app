
const dbUrl = "mongodb+srv://admin:needweed@cluster0.nsilq.mongodb.net/?retryWrites=true&w=majority"
const {MongoClient} = require('mongodb')
const client = new MongoClient(dbUrl);
const dbName = 'tasks'
const collectionName = 'tasks_collection'


async function dbConnect() {
    try {
        let result = await client.connect()
        let db = result.db(dbName)
        return db.collection(collectionName)

    } catch (e) {
        console.error(e)
    }
}

module.exports = dbConnect