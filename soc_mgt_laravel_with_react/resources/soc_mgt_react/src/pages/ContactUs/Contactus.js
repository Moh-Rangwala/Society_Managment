import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import emailjs from "emailjs-com";
import "./contactus.css";
import { BASE_URL, CONTACTUS, SERVICE_ID, TEMPLATE_ID_CONTACT } from "../../api/api";
import axios from "axios";

const ContactUs = ({}) => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [query, setQuery] = useState("");
  const [contactButton, setContactButton] = useState(false);

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const sendContactQuery = (e) => {
    if (email && fullname && query) {
      if (validateEmail(email)) {
        setContactButton(true);
        let dataContact = {
          fullname: fullname,
          contact: contact,
          email: email,
          queryDesc: query
        };
        axios({
          baseURL: BASE_URL,
          method: "post",
          url: CONTACTUS,
          data: dataContact,
          headers: {
            "content-type": "application/json",
          },
        })
          .then((result) => {
            // console.log(result)
            console.log(result.data)
            setContact("")
            setEmail("")
            setQuery("")
            setContactButton(false);
            sendMail(e)
          })
          .catch((error) => {
            setContactButton(false);
            console.log(error)});
      } else {
        toast("Invalid email format!");
      }
    } else {
      toast("Missing fields!");
    }
  };

  const sendMail = (e) => {
    e.preventDefault();
    let templateParams = {
      to_email: email,
      from_name: "Lunamar holdings",
      to_name: fullname,
      message: `We have received your query! Sit back and we will get back to you as soon as possible!`,
    };
    emailjs.send(SERVICE_ID, TEMPLATE_ID_CONTACT, templateParams).then(
      (result) => {
        console.log(result.text);
        toast("We just sent you a confirmation!")
      },
      (error) => {
        console.log(error.text);
      }
    );
  };
  return (
    <Fragment>
      <Toaster />
      <div className="contact-us-form-container">
        <div>
          <h1 id="visitor-incident">Contact Us</h1>
        </div>
        <div className="visitors-check-in-form-container">
          <div className="form">
            <label for="full-name">Full Name:</label>
            <input
              type="text"
              id="full-name"
              name="full-name"
              placeholder="Enter full name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
            <label for="email-signup">Email:</label>
            <input
              type="email"
              id="email-signup"
              name="email-signup"
              placeholder="xyz@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label for="contact-signup">Contact Number:</label>
            <input
              type="number"
              id="contact-signup"
              name="contact-signup"
              placeholder="Enter contact number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
            <label for="visit-reason">Query:</label>
            <textarea
              rows="3"
              id="visit-reason"
              name="visit-reason"
              placeholder="Type your message"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            ></textarea>
            <input
              type="submit"
              value="Submit"
              disabled={contactButton}
              onClick={(e) => {
                sendContactQuery(e);
              }}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ContactUs;
