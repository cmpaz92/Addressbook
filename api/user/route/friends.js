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
 * @method - POST
 * @description - Friend Request
 * @param - /friend/%userID
 */
router.post("/request", auth, async (req, res) => {
  try {
    //if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    var friendrecipient = req.body.recid;
    var friendrequester = req.body.id;
    if (friendrequester == friendrecipient) {
      res.send({ message: "Can't request yourself" });
    } else {
      const docA = await Friend.findOneAndUpdate(
        { requester: friendrequester, recipient: friendrecipient },
        { $set: { status: 1 } },
        { upsert: true, new: true }
      )
      const docB = await Friend.findOneAndUpdate(
        { requester: friendrequester, recipient: friendrecipient },
        { $set: { status: 2 } },
        { upsert: true, new: true }
      )
      const updateUserA = await User.findOneAndUpdate(
        { _id: friendrequester },
        { $push: { friends: docA._id } }
      )
      const updateUserB = await User.findOneAndUpdate(
        { _id: friendrecipient },
        { $push: { friends: docB._id } }
      )
      res.send({ message: "Request sent" });
    }
  } catch (e) {
    res.send({ message: "Error in Sending Request" });
    console.log(e);
  }
});

/**
 * @method - POST
 * @description - Get Friends
 * @return List of Users who sent request
 */
router.post("/friendslist", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    var userid = req.body.id;
    if (userid) {
      const fl = await User.findById(userid);
      var arr = [];
      if (fl != null) {
        for (var frq in fl.friends) {
          const fs = await Friend.findById(fl.friends[frq]);
          console.log(fl.friends[frq]);
          if (fs.status == 3) {
            const usrq = await User.findById(fs.requester);
            const usrc = await User.findById(fs.recipient);
            if (usrq._id == userid) {
              var frq = { username: usrc.username, name: usrc.name, id: usrc._id };
            } else if (usrc._id == userid) {
              var frq = { username: usrq.username, name: usrq.name, id: usrq._id };
            }
            arr.push(frq);
          }
        }
        res.json(arr);
      } else {
        res.send("No Friends yet");
      }
    } else {
      res.send({ message: "Error in Getting Friends" });
    }

  } catch (e) {
    res.send({ message: "Error in Getting Friends" });
    console.log(e);
  }
});

/**
 * @method - POST
 * @description - Get Friend request
 * @return List of Users who sent request
 */
router.post("/friendrequests", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    var userid = req.body.id;
    if (userid) {
      const fs = await Friend.find({ recipient: userid, status: 2 }, function (err, result) { });
      var arr = [];
      for (var i = 0; i < fs.length; i++) {
        const us = await User.findById(fs[i].requester);
        var frq = { username: us.username, frid: fs[i]._id };
        arr.push(frq);
      }
      res.json(arr);
    } else {
      res.send({ message: "Error in Getting Friend requests" });
    }

  } catch (e) {
    res.send({ message: "Error in Getting Friend requests" });
    console.log(e);
  }
});

/**
 * @method - POST
 * @description - Friend Response request
 * @param - /friend/%userID
 */

router.post("/friendresponse", auth, async (req, res) => {
  try {
    var id = req.body.frid;
    var type = req.body.type; // 1 Accept 2 Reject
    const friend = await Friend.findById(id);
    const UserB = friend.recipient;
    const UserA = friend.requester;
    if (friend.status == 2 && type == 1) { //Accept request

      Friend.findOneAndUpdate(
        { requester: UserA, recipient: UserB },
        { status: 3 },
        function (err) {
          if (err)
            return res.send(err);
        }
      );
      Friend.findOneAndUpdate(
        { recipient: UserA, requester: UserB },
        { status: 3 },
        function (err) {
          if (err)
            return res.send(err);
        }
      );
      res.send({ message: "User Request Accepted" });

    } else if (friend.status == 2 && type == 2) { // Reject Request
      const docA = await Friend.findOneAndRemove(
        { requester: UserA, recipient: UserB }
      )
      const docB = await Friend.findOneAndRemove(
        { recipient: UserA, requester: UserB }
      );
      if (docA != null) {
        const updateUserA = await User.findByIdAndUpdate(
          UserA,
          { $pull: { friends: docA._id } }
        );
      }
      if (docB != null) {
        const updateUserB = await User.findByIdAndUpdate(
          UserB,
          { $pull: { friends: docB._id } }
        );
      }
      res.send({ message: "Request rejected" });
    } else {
      res.send({ message: "Invalid operation" });
    }
  } catch (e) {
    res.send({ message: "Error in Fetching users" });
    console.log(e);
  }


});

module.exports = router;
