const Hotel = require("../models/Hotel");
const Transaction = require("../models/Transaction");
const Room = require("../models/Room");

async function getBookedRoomId(startDate, endDate) {
  return Transaction.distinct("hotel", {
    datestart: { $lt: new Date(endDate) },
    dateEnd: { $gt: new Date(startDate) },
    status: "confirmed",
  });
}
async function getBooked(hotelrong) {
  const count = 0;
  console.log(count);
    for(let i =0; i < hotelrong.length; i++){
      const hotelr = await hotelrong.findById({rooms: [i]});
      count += hotelrong.rooms.length;
      return count;
    }
}
exports.search = async (req, res, next) => {
  const startDate = req.body.dateStart;
  const endDate = req.body.dateEnd;
  const desidRooms = req.body.room || 0;
  const destination = req.body.destination;

  const hotelrong = await Hotel.find({
    _id: { $nin: getBookedRoomId(startDate, endDate)},
})
  const availableRoomIds = await Hotel.find({
    city: destination,
    rooms: {$elemMatch:  {$gte: desidRooms},
    _id:  {$nin: getBookedRoomId(startDate, endDate)}}
  });;
  

  return res.status(200).send({"xx": availableRoomIds});
};