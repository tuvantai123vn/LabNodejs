const Hotel = require("../models/Hotel");
const Transaction = require("../models/Transaction");
const Room = require("../models/Room");

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
    const b = await HotelSearch()
    async function HotelSearch(a) {
      a = await getRoomsId(startDate, endDate, destination, adult);
      for(let i = 0; i < a.length; i++ ){
        console.log("DL", a[1]);
      }
    }
    return res.status(200).send({ xx: a });
  } catch (err) {
    next(err);
  }
};
