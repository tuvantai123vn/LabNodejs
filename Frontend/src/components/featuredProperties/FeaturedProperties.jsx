import "./featuredProperties.css";
import axios from 'axios';
import React, {useState, useEffect} from 'react';

const FeaturedProperties = () => {
  const [top3, setTop3] = useState([]);
  useEffect( () => {
		async function fetchData() {
			const request = await axios.get('http://localhost:5001/api/v1/hotels/GET/rating')
			setTop3(request.data);
		}
    fetchData();
	});
  const rendertop3 = top3?.map(item => {
    return(
    <div className="fpItem" key={item._id}>
    <img
      src={item.photos[2]}
      alt=""
      className="fpImg"
    />
    <span className="fpName"><a href={`./hotels/${item._id}`} target="_blank">{item.name}</a></span>
    <span className="fpCity">{item.city}</span>
    <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
    <div className="fpRating">
      <button>{item.rating}</button>
      <span>Excellent</span>
    </div>
  </div>
    );
  })

  return (
    <div className="fp">
      {rendertop3}
    </div>
  );
};

export default FeaturedProperties;
