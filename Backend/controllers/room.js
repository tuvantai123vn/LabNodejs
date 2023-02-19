const Room = require("../models/Room");

exports.getRoom = async (req, res, next) => {
  try {
    const room = await Room.find();
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};
