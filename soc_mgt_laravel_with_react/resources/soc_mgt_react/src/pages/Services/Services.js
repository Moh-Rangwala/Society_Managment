import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./services.css";
import Image1 from '../../assets/online-assistance.jpeg'
import Image2 from '../../assets/your-account.png'
import Image3 from '../../assets/repair.jpg'
import Image4 from '../../assets/cleaning.jpg'
import Image5 from '../../assets/pool.jpg'
import Image6 from '../../assets/Garden.jpg'
import Image7 from '../../assets/drycleaning.jpg'
import Image8 from '../../assets/Gym.jpg'

const Services = ({}) => (
  <Fragment>
    <div className="service-page-main-container">
      <div className="service-page-header-container">
        <h1>Services We Offer</h1>
      </div>
      <div className="service-page-list-container">
        <div className="service-list-item-container">
          <img
            className="service-list-item-image"
            src={Image1}
            alt="Avatar"
          />
          <div className="service-list-item-text-container">
            <h4>
              <b>Online Assistance</b>
            </h4>
            <p>24/7 Online assistance for all your needs.</p>
          </div>
        </div>
        <div className="service-list-item-container">
          <img
            className="service-list-item-image"
            src={Image2}
            alt="Avatar"
          />
          <div className="service-list-item-text-container">
            <h4>
              <b>Manage your account</b>
            </h4>
            <p>
              Whether you are a resident or visitor, Everyone can manage their
              account through our portal.
            </p>
          </div>
        </div>
        <div className="service-list-item-container">
          <img
            className="service-list-item-image"
            src={Image3}
            alt="Avatar"
          />
          <div className="service-list-item-text-container">
            <h4>
              <b>Repair and Maintainance</b>
            </h4>
            <p>
              Need your house cleaned and AC serviced? Or have to get that leaky
              tap fixed and the flickering tube light replaced? Or do you just
              want your big screen TV to be mounted at the right angle and
              distance? We got you!
            </p>
          </div>
        </div>
        <div className="service-list-item-container">
          <img
            className="service-list-item-image"
            src={Image4}
            alt="Avatar"
          />
          <div className="service-list-item-text-container">
            <h4>
              <b>Cleaning Services</b>
            </h4>
            <p>
              We offer the best in class cleaning services for all our
              residents.
            </p>
          </div>
        </div>
        <div className="service-list-item-container">
          <img
            className="service-list-item-image"
            src={Image5}
            alt="Avatar"
          />
          <div className="service-list-item-text-container">
            <h4>
              <b>Pools</b>
            </h4>
            <p>We are equiped with the state of the art swimming pools.</p>
          </div>
        </div>
        <div className="service-list-item-container">
          <img
            className="service-list-item-image"
            src={Image6}
            alt="Avatar"
          />
          <div className="service-list-item-text-container">
            <h4>
              <b>Gardening Services</b>
            </h4>
            <p>Skilled gardeners available at your fingertips.</p>
          </div>
        </div>
        <div className="service-list-item-container">
          <img
            className="service-list-item-image"
            src={Image7}
            alt="Avatar"
          />
          <div className="service-list-item-text-container">
            <h4>
              <b>Laundry Services</b>
            </h4>
            <p>We also provide laundry and dry cleaning services.</p>
          </div>
        </div>
        <div className="service-list-item-container">
          <img
            className="service-list-item-image"
            src={Image8}
            alt="Avatar"
          />
          <div className="service-list-item-text-container">
            <h4>
              <b>Fitness Trainers</b>
            </h4>
            <p>
              For our health freaks, Book a fitness trainer and follow the
              pursuit of staying fit and leading a healthy lifestyle.
            </p>
          </div>
        </div>
      </div>
    </div>
  </Fragment>
);

export default Services;
