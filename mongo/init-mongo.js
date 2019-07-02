const {
  MongoClient,
  ObjectId
} = require('mongodb');

// class just for some later tests
class DbGlocalInstance {
  constructor(dbInstance) {
    this.dbInstance = dbInstance;
  }

  getDbInstance() {
    return this.dbInstance;
  }

  setDbInstance(dbInstance) {
    this.dbInstance = dbInstance;
  }
};

const dbName = 'rust-canvas',
  MONGO_URL = `mongodb://localhost:27017/${dbName}`;

const initMongoDB = () => Promise.resolve(MongoClient
  .connect(MONGO_URL, {
    useNewUrlParser: true
  })
  .then(database => {
    console.log("Database started !");
    return new DbGlocalInstance(database.db(dbName));
  })
  .catch(error => console.dir(error))
);

exports.initMongoDB = initMongoDB;
