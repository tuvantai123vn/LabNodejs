const User = require("../models/User");
const JWT_SECRET = "your_jwt_secret";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const email = await User.findOne({ email: req.body.email });
    if (user || email) return res.status(400).send("Username or email already exist");
    else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
      });
      await newUser.save();
      return res.json({message: "User has been created"});
    }
  } catch (err) {
    next(err);
  }
};
exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found"));
    const isPasswordCorrent = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrent)
      return res.status(400).send("Wrong password or username!");
    const token = jwt.sign({ userId: user.id, username: user.username, isAdmin: user.isAdmin }, JWT_SECRET);
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};
