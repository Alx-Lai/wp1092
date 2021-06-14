const mongoose = require("mongoose");

// i use mongodb://localhost:27017/cardmongo for MONGO_URL

function connectMongo() {
  mongoose.connect(
    "mongodb+srv://user-test:WinChiu1206@webprogramingcourse.f8c11.mongodb.net/chatroomPractice?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("Mongo database connected!");
  });
}

const mongo = {
  connect: connectMongo,
};

module.exports = mongo;
