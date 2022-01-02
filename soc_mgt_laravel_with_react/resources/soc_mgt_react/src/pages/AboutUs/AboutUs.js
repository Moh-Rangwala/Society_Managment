import React, { Fragment, useEffect } from "react";
import About from "../../assets/community.jpg";
import "./aboutus.css";

const AboutUs = () => {
  useEffect(() => {
  }, []);
  return (
    <Fragment>
      <div className="about-us-main-container">
        <div className="about-us-container-1">
          <div className="about-us-container-1-left">
            <div>
              <h1>LUNAMAR HOUSING SOCIETY</h1>
            </div>
            <div>
              <p>
                Driving on the principles of providing an unmatched commitment
                to quality and innovation, lunamar has come up with
                state-of-the-art luxury gated community
              </p>
            </div>
          </div>
          <div className="about-us-container-1-right">
            <img
              className="about-us-container-1-right-image"
              src={About}
              alt="An image of Community"
            />
          </div>
        </div>
        <div className="about-us-container-2">
          <div>
            <h2>About Lunamar Housing</h2>
          </div>
          <div>
            <p>
              Our aim is to offer you comfort in every meter square you breathe.
              With a commitment to offer you luxury Our vision is blended well
              with our philosophy of leading a ‘Luxurious Life’. Thus we have
              conceptualized a lifestyle that gives you comfort yet keeping you
              closer to nature. In other words, ‘a home that conveys a blissful
              spell and a place that conspires positivity and productivity
              future home Don’t wait. Choose Lunamar as the space for today and
              secure your slice of heaven. This application management process
              in Apartment. and will reduce manual work and easy to organize
              schedules and time details easily. This system has very friendly
              user interface and provides a quick response with very accurate
              information regarding the activities done in flats. It automates
              each and every activity of the manual system.
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AboutUs;
