const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  name: {
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
    type: Object,
    default: [
      { name: "phone", value: "", group: [1] },
      { name: "facebook", value: "", group: [1] },
      { name: "twitter", value: "", group: [1] },
    ]
  },
  groups: {
    type: Object,
    default: [{ name: "general", members: [] },
    { name: "family", members: [] },
    { name: "friends", members: [] },
    { name: "work", members: [] },
    ]
  },
  friends: [{ type: Schema.Types.ObjectId, ref: 'Friend' }]
});



// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);