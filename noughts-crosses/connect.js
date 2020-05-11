const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        

const url = "mongodb+srv://admin:admin@noughts-crosses-zq9ru.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(url);

async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

run().catch(console.dir);