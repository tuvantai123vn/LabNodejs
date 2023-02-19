import "./featured.css";
import HN from "../../assets/images/Ha_Noi.jpg";
import HCM from "../../assets/images/HCM.jpg";
import DN from "../../assets/images/Da_Nang.jpg";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Featured = () => {
  const [slHN, setSlHN] = useState("");
  const [slHCM, setSlHCM] = useState("");
  const [slDN, setSlDN] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        "http://localhost:5001/api/v1/hotels/GET/KV"
      );
      setSlHN(request.data.slHN);
      setSlHCM(request.data.slHCM);
      setSlDN(request.data.slDN);
    }
    fetchData();
  });
  return (
    <div className="featured">
      <div className="featuredItem">
        <img src={HN} alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Hà Nội</h1>
          <h2>{slHN} properties</h2>
        </div>
      </div>

      <div className="featuredItem">
        <img src={HCM} alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Hồ Chí Minh</h1>
          <h2>{slHCM} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img src={DN} alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Đà Nẵng</h1>
          <h2>{slDN} properties</h2>
        </div>
      </div>
    </div>
  );
};

export default Featured;
