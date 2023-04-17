const express = require("express");
const routes = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { auth, isAdmin } = require("../../middleware/auth");

const User = require('../../models/User');

// const WhiteList = require('../../models/WhiteList');

const JWT_SECRET = process.env.JWT_SECRET;

// @route   GET /api/v1/user/login
// @desc    login user
// @access  Public
routes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "All fields required" });
  try {
    // search for existing user
    const user = await User.findOne({email});
    if (!user) return res.status(400).json({ message: "User dose not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {});
    if (!token) throw Error("Couldnt sign the token");



    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
      })
      .json({
        user: {
          _id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          isAdmin: user.isAdmin
        },
      });
  } catch (error) {
    console.error(err)
    res.status(400).json({ error: error.message });
  }
});

// @route   GET /api/v1/user/register
// @desc    register user
// @access  public
routes.post("/register", async (req, res) => {
  const { firstName, lastName, email, password1, password2 } = req.body;
  if (!firstName || !lastName || !email || !password1 || !password2)
    return res.status(400).json({ message: "All fields required" });

  if(password1 !== password2) return res.status(400).json({message: "passwords don't match"})

  try {
    // search for existing user
    const user = await User.findOne({email});
    if (user) return res.status(400).json({ message: "Email already used" });

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error("Something went wrong with bcrypt");

    const hash = await bcrypt.hash(password1, salt);
    if (!hash) throw Error("Something went wrong hashing the password");

    const newUser = new User({
      firstName, lastName, email, password: hash
    })

    const savedUser = await newUser.save();
    if (!savedUser) throw Error("Something went wrong saving the user");

    const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, {});
    if (!token) throw Error("Couldnt sign the token");

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
      })
      .json({
        user: {
          _id: savedUser._id,
          email: savedUser.email,
          firstName: savedUser.firstName,
          lastName: savedUser.lastName,
          isAdmin: savedUser.isAdmin

        },
      });
  } catch (err) {
    console.error(err)
    res.status(400).json({ error: err.message });
  }
});

// @route   GET /api/v1/user/logout
// @desc    logout user
// @access  public
routes.get("/logout", auth, (req, res) => {
  res.clearCookie('token');
  res.status(200).send("logout user");
});

// @route   GET /api/v1/user
// @desc    user info
// @access  privat
routes.get("/", auth, async (req, res) => {
  const { user } = req.body;
  try {
    res.status(200).json({
      user: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdmin: user.isAdmin
      },
    });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error finding User info" });
  }
});

// // @route   POST /api/v1/user/serach
// // @desc    search for users
// // @access  privat
// routes.post("/search", auth, async (req, res) => {
//   const { search } = req.body;
//   try {
//     const users = await getUser(search);
//     if (users.length !== 0) return res.status(200).json({ users });
//     res.status(200).json({ users: [{ name: "no resualt" }] });
//   } catch (error) {
//     res.status(500).json({ message: "Error finding Users" });
//     console.log(error);
//   }
// });

// // @route   POST /api/v1/user/:search_id
// // @desc    search for user by id
// // @access  privat
// routes.get("/:search_id", auth, async (req, res) => {
//   const { search_id } = req.params;
//   try {
//     const user = await getUserById(search_id);
//     console.log(user);
//     if (!user) return res.status(404).json({ message: "user dont exist" });
//     res.status(200).json({
//       id: user.id,
//       email: user.email,
//       first_name: user.first_name,
//       last_name: user.last_name,
//     });
//   } catch (error) {
//     console.log("Cant search users");
//     res.status(500).json({ message: "Error finding Users" });
//   }
// });

module.exports = routes;
