const User = require("../model/User");
const jwt = require("jsonwebtoken");

exports.authPage = (permissions) => async (req, res, next) => {
  const token = req.headers['authorization'].split(' ')[1];
  console.log(token);

  const secret = "secret";

    // Xác thực token
    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded);
    // if (user) {
    //   // Phân quyền người dùng
    //   if (permissions.includes(user.role)) {
    //     res.status(200).send(decoded);
    //   } else {
    //     return res.status(401).json("You dont have permissions!");
    //   }
    // }
    res.status(200).send(decoded);
};
