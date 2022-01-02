import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./gallery.css";
import Housing from "../../assets/housing1.jpg";
import axios from "axios";
import { BASE_URL, GET_RESIDENT_PHOTO_UPLOADS } from "../../api/api";

const Gallery = ({}) => {
  const [imageResidentData, setImageResidentData] = useState(null);
  useEffect(() => {
    axios({
      baseURL: BASE_URL,
      method: "get",
      url: GET_RESIDENT_PHOTO_UPLOADS,
      headers: {
        "content-type": "application/json",
      },
    })
      .then((result) => {
        // console.log(result)
        console.log(result.data);
        setImageResidentData((result.data.data).slice(0,10));
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <Fragment>
      <div className="service-page-main-container">
        <div className="service-page-header-container">
          <h1>Resident Gallery</h1>
          <h2>Have a look at what our residents have shared...</h2>
        </div>
        <div className="service-page-list-container">
          {imageResidentData ? (
            imageResidentData.map((item, ind) => {
              return (
                <div className="service-list-item-container">
                  <img
                    className="service-list-item-image"
                    src={item.image_path}
                    alt="Avatar"
                  />
                  <div className="service-list-item-text-container">
                    <h4>
                      <b>Caption: {item.caption}</b>
                    </h4>
                    <p>
                      {item.resident_name} ({item.resident_email})
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="service-list-item-container">
              <img
                className="service-list-item-image"
                src={Housing}
                alt="Avatar"
              />
              <div className="service-list-item-text-container">
                <h4>
                  <b>Caption: #caption</b>
                </h4>
                <p>resident_name resident_email</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Gallery;
