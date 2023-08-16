const express = require("express");
const router = express.Router();
const User = require("../userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

// Register a new user
const jwtSecret = process.env.JWT_SECRET || "secrsdf34dxfet";
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, profilePic, phoneNumber} =
      req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({
          errorMessage: "Please enter a password of at least 6 characters.",
        });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ errorMessage: "An account with this email already exists." });
    }
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: passwordHash,
      profilePic,
      phoneNumber
    });
    const savedUser = await newUser.save();
    const user = await User.findById(savedUser._id).populate("connections","name email profilePic phoneNumber _id");
    const token = jwt.sign(
      {
        user: savedUser._id,
      },
      jwtSecret
    );
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// Login a user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    }
    let user = await User.findOne({ email }).populate("connections","name email aboutMe profilePic phoneNumber _id");
      if (!user) {
        return res
          .status(401)
          .json({ errorMessage: "Wrong email or password." });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ errorMessage: "Wrong email or password." });
      }
      user = await User.findById(user._id).populate("connections","name email aboutMe profilePic phoneNumber _id");
      const token = jwt.sign(
        {
          user: user._id,
        },
        jwtSecret
      );
      res
        .cookie("token", token, {
          httpOnly: true,
        })
        .send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// Logout a user
router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
});

router.get("/",auth, async (req, res) => {
  try {
  const user = await  User.findById(req.user).select("-password").populate("connections","name email profilePic phoneNumber _id");
  res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send({errorMessage: "Unauthorized"});
  }
});
router.get("/all", async (req, res) => {
  try {
  const users = await  User.find().select("-password -emails -connections ")
  res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send({errorMessage: "Unknown error"});
  }
});

module.exports = router;
