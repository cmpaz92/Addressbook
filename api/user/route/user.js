const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../controller/userController");

const mongoose = require("mongoose");
const User = require("../model/User");
const Friend = require("../model/Friend");
mongoose.set('useFindAndModify', false);


/*router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://priceless-panini-34c7e3.netlify.app"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

 router.post(
  "/signup",
  [
  check("username", "Please Enter a Valid Username")
  .not()
  .isEmpty(),
  check("email", "Please enter a valid email").isEmail(),
  check("password", "Please enter a valid password").isLength({
    min: 6
  })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const {
      username,
      email,
      password
    } = req.body;

    try {
      let user = await User.findOne({
        email
      });
      if (user) {
        return res.status(400).json({
          msg: "User Already Exists"
        });
      }

      user = new User({
        username,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        "secret",
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token, user
          });
        }
        );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }
  );

 router.post(
  "/login",
  [
  check("email", "Please enter a valid email").isEmail(),
  check("password", "Please enter a valid password").isLength({
    min: 6
  })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        email
      });
      if (!user)
        return res.status(400).json({
          message: "Incorrect Credentials"
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Credentials"
        });

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        "secret",
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token, user
          });
        }
        );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
  }
  );





 router.post("/update/:id", auth, async (req, res) => {
  try {
   if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    var userid = req.params.id;

    var fb = req.body.fb;
    var ig = req.body.fig;
       console.log(req.body);
    //const user = await User.findOneAndUpdate({ _id: userid },{ $unset: { socialmedia: "" } },{ $push: { socialmedia: sm }});
        const user = await User.findOneAndUpdate(
      { _id: userid },{ "$set":  { "socialmedia.facebook": fb , "socialmedia.instagram": ig }}
      )
    res.json(user);

  } else {
    res.send({ message: "User ID incorrect" });
  }
} catch (e) {
  res.send({ message: "Error in Fetching users" });
  console.log(e);
}


});


/**
 * @method - GET
 * @description - Get User
 * @param - /%userID
 */
 router.get("/:id", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      //const userid = await Friend.findById(req.params.id);
      const user= await User.findById(req.params.id);

/*let friends = User.aggregate([
  { "$lookup": {
    "from": Friend.collection.name,
    "let": { "friends": "$friends" },
    "pipeline": [
      { "$match": { 
        "recipient": mongoose.Types.ObjectId(req.user.id),
        "$expr": { "$in": [ "$_id", "$$friends" ] }
      }},
      { "$project": { "status": 1 } }
    ],
    "as": "friends"
  }},
  { "$addFields": {
    "friendsStatus": {
      "$ifNull": [ { "$min": "$friends.status" }, 0 ]
    }
  }}
]).exec((err, locations) => {
    if (err) throw err;
    console.log(locations);
});
console.log(friends);*/


if (req.user.id == req.params.id) {
  res.json(user);
} else {
  console.log(user);
  var x = {
    "id": user.id,
    "username": user.username,
    "email": user.email,
    "social": user.socialmedia
  };
  console.log(user.socialMedia);
  console.log(x);
  res.json(x);
}
} else {
  res.send({ message: "User ID incorrect" });
}
} catch (e) {
  res.send({ message: "Error in Fetching user" });
  console.log(e);
}
});


/**
 * @method - POST
 * @description - Search
 * @param - /search
 */

 router.post("/search", auth, async (req, res) => {
  try {
    var searchfriend = req.body.username;
    const user = await User.find({ username: { $regex: '.*' + searchfriend + '.*' } }, function (err, result) { });
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching users" });
  }

});

/**
 * @method - POST
 * @description - Friend Request
 * @param - /friend/%userID
 */
 router.post("/friend/:userID", auth, async (req, res) => {
  try {
    //if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      var friendrecipient = req.params.userID;
      var friendrequester = req.body.id;
      if(friendrequester == friendrecipient){
       res.send({ message: "Can't request yourself" });
     }else{

   /* const docA = await Friend.findOneAndUpdate(
        { requester: friendrequester, recipient: friendrecipient },
        { $set: { status: 1 }},
        { upsert: true, new: true }
    )
    console.log(docA);
    const docB = await Friend.findOneAndUpdate(
        { requester: friendrequester, recipient: friendrecipient },
        { $set: { status: 2 }},
        { upsert: true, new: true }
    )
    console.log(docB);*/
    const updateUserA = await User.findOneAndUpdate(
      { _id: friendrequester },
      { $push: { friends: friendrecipient }}
      )
    const updateUserB = await User.findOneAndUpdate(
      { _id: friendrecipient },
      { $push: { friends: friendrequester }}
      )
    res.send({ message: "Request sent" });
  }
 // }
} catch (e) {
  res.send({ message: "Error in Sending Request" });
  console.log(e);
}
});

 router.post("/friend/:userID/:accept", auth, async (req, res) => {
/*
    if(accept == "accept"){
Friend.findOneAndUpdate(
        { requester: UserA, recipient: UserB },
        { $set: { status: 3 }}
    )
    Friend.findOneAndUpdate(
        { recipient: UserA requester: UserB },
        { $set: { status: 3 }}
    )
  }else if(accept == "deny"){
     const docA = await Friend.findOneAndRemove(
        { requester: UserA, recipient: UserB }
    )
    const docB = await Friend.findOneAndRemove(
        { recipient: UserA, requester: UserB }
    )
    const updateUserA = await User.findOneAndUpdate(
        { _id: UserA },
        { $pull: { friends: docA._id }}
    )
    const updateUserB = await User.findOneAndUpdate(
        { _id: UserB },
        { $pull: { friends: docB._id }}
    )

  }*/
});

 User.aggregate([
  { "$lookup": {
    "from": Friend.collection.name,
    "let": { "friends": "$friends" },
    "pipeline": [
    { "$match": {
      "recipient": mongoose.Types.ObjectId("5afaab572c4ec049aeb0bcba"),
      "$expr": { "$in": [ "$_id", "$$friends" ] }
    }},
    { "$project": { "status": 1 } }
    ],
    "as": "friends"
  }},
  { "$addFields": {
    "friendsStatus": {
      "$ifNull": [ { "$min": "$friends.status" }, 0 ]
    }
  }}
  ]);
 

 module.exports = router;
