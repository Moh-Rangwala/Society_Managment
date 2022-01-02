import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import HomeImage from "../../assets/lunamarmain.jpg";

const HomePage = () => (
    <Fragment>
        <div>
            <div className="home-page-header">
                <h1 class="black-lives-matter">WELCOME TO LUNAMAR HOUSING SOCIETY</h1>
            </div>
            <div className="home-image-container">
                <img className="home-image" src={HomeImage} alt="" />
            </div>
            <div className="home-iframe-container">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3359.067310493733!2d-97.1273359!3d32.65765290000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e62fa2fd28853%3A0x7d91a4377fc34a6b!2s1023%20Flower%20Dr%2C%20Arlington%2C%20TX%2076017!5e0!3m2!1sen!2sus!4v1634509644969!5m2!1sen!2sus"
                    style={{ margin: "20px" }}
                    width="600"
                    height="450"
                    allowfullscreen=""
                    loading="lazy"
                ></iframe>
            </div>
        </div>
    </Fragment>
);

export default HomePage;
