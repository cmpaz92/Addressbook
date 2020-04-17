const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../controller/userController");

const User = require("../model/User");
const Friend = require("../model/Friend");

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
        password
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
        "randomString", {
        expiresIn: 10000
      },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token
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


/**
 * @method - GET
 * @description - Get User
 * @param - /%userID
 */

router.get("/:id", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      const user = await User.findById(req.params.id);
      console.log(req.user.id);
      console.log(req.params.id);
      if (req.user.id == req.params.id) {
        res.json(user);
      } else {
        var x = {
          username: user.username,
          email: user.email
        };
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

    const docA = await Friend.findOneAndUpdate(
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
    console.log(docB);
    const updateUserA = await User.findOneAndUpdate(
        { _id: friendrequester },
        { $push: { friends: docA._id }}
    )
    const updateUserB = await User.findOneAndUpdate(
        { _id: friendrecipient },
        { $push: { friends: docB._id }}
    )
    res.send({ message: "Request sent" });
  }
 // }
  } catch (e) {
    res.send({ message: "Error in Sending Request" });
    console.log(e);
  }
});
 

module.exports = router;
