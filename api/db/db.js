const mongoose = require("mongoose");

const connectToDatabase = async () => {

  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@kwizical.xpmi3dw.mongodb.net/?retryWrites=true&w=majority&appName=kwizical`;
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
    console.log(error)
  }
};

module.exports = { connectToDatabase };

