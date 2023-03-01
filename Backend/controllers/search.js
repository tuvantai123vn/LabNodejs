const Hotel = require("../models/Hotel");
const Transaction = require("../models/Transaction");
const Room = require("../models/Room");
const ObjectId = require('mongoose').Types.ObjectId;

exports.search = async (req, res, next) => {
  const startDate = req.body.dateStart;
  const endDate = req.body.dateEnd;
  const desidRooms = req.body.room || 0;
  const destination = req.body.destination;
  const adult = req.body.adult;
  try {
    async function getBookedHotelId(startDate, endDate) {
      return Transaction.distinct("hotel", {
        datestart: { $lt: new Date(endDate) },
        dateEnd: { $gt: new Date(startDate) },
        status: "confirmed",
      });
    }
    async function getBookedRoomId(startDate, endDate, destination) {
      return Hotel.distinct("rooms", {
        _id: { $nin: await getBookedHotelId(startDate, endDate) },
        city: destination,
      });
    }
    async function getRoomsId(startDate, endDate, destination, adult) {
      return Room.distinct("_id", {
        _id: await getBookedRoomId(startDate, endDate, destination),
        maxPeople: { $gte: adult },
      });
    }
    const a = await getRoomsId(startDate, endDate, destination, adult);

    const maxPeople = 2;

    Hotel.find({ rooms: { $elemMatch: { maxPeople: { $gt: maxPeople } } } }, function(err, hotels) {
      if (err) return handleError(err);
      console.log(hotels);
    });

    var b = await Hotel.find(
      {}
      )
    return res.status(200).send({ xx: b });
  } catch (err) {
    next(err);
  }
};
