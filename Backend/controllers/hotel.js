const Hotel = require("../models/Hotel");

exports.createHotel = async (req, res, next) => {
  newHotel = new Hotel(req.body);
  try {
    savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};
exports.editHotel = async (req, res, next) => {
  try {
    updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};
exports.deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted");
  } catch (err) {
    next(err);
  }
};
exports.getById = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};
exports.getAll = async (req, res, next) => {
  try {
    const hotel = await Hotel.find();
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

exports.KV = async (req, res, next) => {
  try {
    const slHN = await Hotel.countDocuments({ city: 'Ha Noi' });
    const slHCM = await Hotel.countDocuments({ city: 'Ho Chi Minh' });
    const slDN = await Hotel.countDocuments({ city: 'Da Nang' });
    return res.status(200).json({slHN, slHCM, slDN});
  } catch (err) {
    next(err);
  }
}
exports.slhotel = async (req, res, next) => {
  try {
    const slHotel = await Hotel.countDocuments({ type: 'hotel' });
    const slApartments = await Hotel.countDocuments({ type: 'apartments' });
    const slResorts = await Hotel.countDocuments({ type: 'resorts' });
    const slVillas = await Hotel.countDocuments({ type: 'villas' });
    const slCabins = await Hotel.countDocuments({ type: 'cabins' });
    return res.status(200).json({slHotel, slApartments, slResorts, slVillas, slCabins});
  } catch (err) {
    next(err);
  }
}
exports.ratingHotel = async (req, res, next) => {
  try {
    const hotels = await Hotel.find().sort({ rating: -1 }).limit(3);
    return res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
}
