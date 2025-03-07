const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    //   "mongodb+srv://dhwani:dhwani123@cluster0.p422i.mongodb.net/Cluster0"
      "mongodb+srv://dhwani:dhwani123@cluster0.p422i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
    .then((client) => {
      console.log("Connected!!!");
      _db = client.db('shop');
      callback(client);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
