const Hotel = require("../models/Hotel");
const Transaction = require("../models/Transaction");
const Room = require('../models/Room');

exports.search = async (req, res, next) => {
    const startDate = req.param.date.startDate;
    const endDate = req.param.date.endDate;
    const Numberroom = req.param.room;
    const destination = req.param.destination;

  try {

    const availableRooms = await Room.find({
        _id: getroom(startDate, endDate, destination),
        roomNumbers: 
        
    })
    await function getroom (startDate, endDate, destination){ Hotel.distinct('rooms',{
        rooms: getRoomId(startDate, endDate),
        city: destination
    })}

    await function getRoomId(startDate, endDate){
        return Transaction.distinct('_id', {
        _id: {$nin: getBookedRoomId(startDate, endDate)},
        })
    }

    await function getBookedRoomId(startDate, endDate){
        return Transaction.distinct('room', {
            datestart: {$lt: new Date(endDate)}, 
            dateEnd: {$gt: new Date(startDate)},
            status: "confirmed"
        })
    }


    return res.status(200).json(availableRooms);
  } catch (err) {
    next(err);
  }
};
