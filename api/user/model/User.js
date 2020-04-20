const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  socialmedia: {
    facebook: {
    type: String,
  },
    instagram: {
    type: String,
  },
    twitter: {
    type: String,
  },
    youtube: {
    type: String,
  },
    phone: {
    type: String,
  }
},
  friends: [{ type: Schema.Types.ObjectId, ref: 'Friend'}]
});



// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);