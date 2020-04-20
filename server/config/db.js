/*module.exports = {
    database: "mongodb://localhost:27017/authapp",
    secret: "password"
  };
*/
const mongoose = require("mongoose");
const MONGOURI = "mongodb://localhost:27017/authapp";

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;