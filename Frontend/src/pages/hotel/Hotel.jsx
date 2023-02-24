import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Hotel = () => {
  const location = useLocation();
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const id = location.pathname.split("/")[2];
  const [hotelDetail, setHotelDetail] = useState([]);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `http://localhost:5001/api/v1/hotels/${id}`
      );

      setHotelDetail(request.data);
    }
    fetchData();
  });

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={hotelDetail.photos[slideNumber]} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
         <div className="hotelWrapper">
      <button className="bookNow">Reserve or Book Now!</button>
      <h1 className="hotelTitle">{hotelDetail.title}</h1>
      <div className="hotelAddress">
        <FontAwesomeIcon icon={faLocationDot} />
        <span>Elton St 125 New york</span>
      </div>
      <span className="hotelDistance">
        Excellent location – {hotelDetail.distance}m from center
      </span>
      <span className="hotelPriceHighlight">
        Book a stay over ${hotelDetail.cheapestPrice} at this property and get a free
        airport taxi
      </span>
      <div className="hotelImages">
        {hotelDetail.photos?.map((photo, i) => (
          <div className="hotelImgWrapper" key={i}>
            <img
              onClick={() => handleOpen(i)}
              src={photo}
              alt=""
              className="hotelImg"
            />
          </div>
        ))}
      </div>
      <div className="hotelDetails">
        <div className="hotelDetailsTexts">
          <h1 className="hotelTitle">{hotelDetail.title}</h1>
          <p className="hotelDesc">{hotelDetail.desc}</p>
        </div>
        <div className="hotelDetailsPrice">
          <h1>Perfect for a 1-night stay!</h1>
          <span>
            Located in the real heart of {hotelDetail.city}, this property has an
            excellent location score of {hotelDetail.rating}!
          </span>
          <h2>
            <b>{hotelDetail.cheapestPrice}</b> (1 nights)
          </h2>
          <button>Reserve or Book Now!</button>
        </div>
      </div>
    </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;
