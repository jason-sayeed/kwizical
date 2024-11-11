const mongoose = require("mongoose");

const connectToDatabase = async () => {
  // Line 6 (below) defines the connection URI for connecting to the MongoDB Atlas cluster (cloud-hosted MongoDB service) using Mongoose and replaces line 8 when needed.
  // const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@kwizical.xpmi3dw.mongodb.net/?retryWrites=true&w=majority&appName=kwizical`;

  // const uri = "mongodb://localhost:27017/kwizical";
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@server-testing.sqpii.mongodb.net/kwizical-game?retryWrites=true&w=majority&appName=server-testing`;

  const clientOptions = {
    serverApi: { version: "1", strict: true, deprecationErrors: true },
  };

  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectToDatabase };
