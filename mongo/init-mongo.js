const {
  MongoClient,
  ObjectId
} = require('mongodb');

const dbName = 'rust-canvas',
  MONGO_URL = `mongodb://localhost:27017/${dbName}`;

const initMongoDB = () => Promise.resolve(MongoClient
  .connect(MONGO_URL, {
    useNewUrlParser: true
  })
  .then(database => {
    console.log("Database started !");

    return database.db(dbName)
  })
  .catch(error => console.dir(err))
);

exports.initMongoDB = initMongoDB;
