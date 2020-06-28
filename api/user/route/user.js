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

/**
 * @description - Router use Cors on production
 */
/*router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://priceless-panini-34c7e3.netlify.app");
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
      name,
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
        name,
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

/**
 * @method - POST
 * @param - /login
 * @description - User Login
 */
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
 * @method - POST
 * @param - /update
 * @description - User Update / Add Social Media networks
 */

router.post("/update", auth, async (req, res) => {
  try {
    var userid = req.body.id;
    if (userid.match(/^[0-9a-fA-F]{24}$/)) {
      var sm = req.body.sm;
      const us = await User.findByIdAndUpdate(
        userid,
        { $set: { socialmedia: sm } },
        { upsert: true },
        function (err, result) {
          if (err) {
            res.send(err);
          } else {
            res.send(result);
          }
        }
      );

      // res.json("User Updated");

    } else {
      res.send({ message: "User ID incorrect" });
    }
  } catch (e) {
    res.send({ message: "Error in Fetching users" });
    console.log(e);
  }
});

/**
 * @method - POST
 * @param - /updateprivacy
 * @description - Contact Update Privacy
 */

router.post("/updateprivacy", auth, async (req, res) => {
  try {
    var id = req.body.id;
    var uid = req.body.uid;
    var p = req.body.privacy;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const us = await User.findById(id);

      var arrpriv = [];
      arrpriv = us.private;

      if (p === true) {
        if (arrpriv.indexOf(uid) < 0) {
          us.private.push(uid);
          us.save();
        }
      } else if (p === false) {
        if (arrpriv.indexOf(uid) >= 0) {
          us.private.pull(uid);
          us.save();
        }
      }
      res.json("User Updated");

    } else {
      res.send({ message: "User ID incorrect" });
    }
  } catch (e) {
    res.send({ message: "Error in Fetching users" });
    console.log(e);
  }
});


/**
 * @method - POST
 * @description - Get User
 */
router.post("/get", auth, async (req, res) => {
  try {
    var id = req.body.id;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const user = await User.findById(id);
      res.json(user);
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
 * @description - Get User contact
 */
router.post("/getcontact", auth, async (req, res) => {
  try {
    var id = req.body.id;
    var uid = req.body.uid;
    if (id.match(/^[0-9a-fA-F]{24}$/) && uid.match(/^[0-9a-fA-F]{24}$/)) {
      const userA = await User.findById(id);//requester
      //If UserB has userA in his list
      const userB = await User.findById(uid);
      const private = userB.private;
      var arrpriv = [];
      const socialm = [];
      //If user is in private list
      arrpriv = userB.private;
      if (arrpriv.indexOf(id) >= 0) {
        for (var sm in userB.socialmedia) {
          socialm.push(userB.socialmedia[sm])
        }
      } else {
        for (var sm in userB.socialmedia) {
          if (userB.socialmedia[sm].privacy === false) {
            socialm.push(userB.socialmedia[sm])
          }
        }
      }
      var x = {
        "id": userB._id,
        "username": userB.username,
        "email": userB.email,
        "name": userB.name,
        "socialmedia": socialm,

      };
      res.json(x);

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
 * @description - Get Friend Permission
 */
router.post("/permission", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    // Check if user is in my private list
    var id = req.body.id;
    var uid = req.body.uid;
    if (id.match(/^[0-9a-fA-F]{24}$/) && id.match(/^[0-9a-fA-F]{24}$/)) {
      const userA = await User.findById(id);//requester
      const private = userA.private;

      //If user is in private list
      if (private.indexOf(uid) >= 0) {
        res.json('true');
      } else {
        res.json('false');
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
    const user = await User.find({ username: { $regex: '.*' + searchfriend + '.*' }, }, function (err, result) { });
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching users" });
  }

});

module.exports = router;
