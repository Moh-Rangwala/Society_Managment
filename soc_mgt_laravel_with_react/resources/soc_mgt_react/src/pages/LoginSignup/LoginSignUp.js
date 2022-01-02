import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./loginsignup.css";
import { useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import emailjs from "emailjs-com";
import {
  BASE_URL,
  GET_BUILDINGS,
  LOGIN_USER,
  SERVICE_ID,
  SIGNUP_USER,
  TEMPLATE_ID_SIGNUP,
} from "../../api/api";
import { storeAuthData } from "../../redux/actions/authAction";

const LoginSignup = ({}) => {
  // const dispatch = useDispatch();

  useEffect(() => {
    // code to run on component mount
    axios({
      baseURL: BASE_URL,
      method: "get",
      url: GET_BUILDINGS,
      headers: {
        "content-type": "application/json",
      },
    })
      .then((result) => {
        // console.log(result)
        console.log(result.data);
        setBldgArray(result.data.bldg);
        setAptArray(result.data.apt);
      })
      .catch((error) => console.log(error));
  }, []);

  const history = useHistory();
  const [roleSignup, setRoleSignup] = useState("resident");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [emailSignup, setEmailSignup] = useState("");
  const [passSignup, setPassSignup] = useState("");
  const [confPassSignup, setConfPassSignup] = useState("");
  const [contact, setContact] = useState("");
  const [bldg, setBldg] = useState("1");
  const [apt, setApt] = useState("101");
  const [bldgArray, setBldgArray] = useState(null);
  const [aptArray, setAptArray] = useState(null);
  const [date, setDate] = useState("");
  const [license, setLicense] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [accessID, setAccessID] = useState("");
  const checkUser = () => {
    if (pass && validateEmail(email) && pass.length >= 6) {
      loginUser();
    } else {
      if (!validateEmail(email)) {
        toast("Email not valid!");
      } else if (pass == "") {
        toast("Password is Required");
      } else if (pass.length < 6) {
        toast("Password too short");
      }
    }
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const resetData = () => {
    setFname("");
    setLname("");
    setEmailSignup("");
    setPassSignup("");
    setConfPassSignup("");
    setContact("");
    setBldg("1");
    setApt("101");
    setLicense("");
    setAccessID("");
    setHomeAddress("");
  };

  const signUpUser = (e) => {
    if (
      fname &&
      lname &&
      emailSignup &&
      passSignup &&
      confPassSignup &&
      contact
    ) {
      if (!validateEmail(emailSignup)) {
        toast("Invalid Email-Id");
      } else if (passSignup != confPassSignup) {
        toast("Password and Confim password mismatched");
      } else if (passSignup.length < 6) {
        toast("Password should have at least 6 character");
      } else {
        switch (roleSignup) {
          case "resident":
            if (bldg && apt && date && license) {
              let data = {
                email: emailSignup,
                fname: fname,
                lname: lname,
                pass: passSignup,
                contact: contact,
                role: roleSignup,
                bldg: bldg,
                apt: apt,
                dob: date,
                lic: license,
              };
              axios({
                baseURL: BASE_URL,
                method: "post",
                url: SIGNUP_USER,
                data: data,
                headers: {
                  "content-type": "application/json",
                },
              })
                .then((result) => {
                  console.log(result.data);
                  if (result.data.status == "pass") {
                    resetData();
                    toast(result.data.message);
                    sendMail(e)
                  } else if (result.data.status == "fail") {
                    toast(
                      result.data.message
                        ? result.data.message
                        : "something went wrong"
                    );
                  } else {
                    toast(
                      result.data.errorInfo
                        ? result.data.errorInfo[2]
                        : "something went wrong"
                    );
                  }

                  console.log(result.data);
                  // history.push("/resident");
                })
                .catch((error) => console.log(error));
            } else {
              toast("Missing fields for resident!");
            }
            break;
          case "visitor":
            if (homeAddress && date && license) {
              let dataVisitor = {
                email: emailSignup,
                fname: fname,
                lname: lname,
                pass: passSignup,
                contact: contact,
                role: roleSignup,
                address: homeAddress,
                dob: date,
                lic: license,
              };
              axios({
                baseURL: BASE_URL,
                method: "post",
                url: SIGNUP_USER,
                data: dataVisitor,
                headers: {
                  "content-type": "application/json",
                },
              })
                .then((result) => {
                  console.log(result.data);
                  if (result.data.status == "pass") {
                    resetData();
                    toast(result.data.message);
                    sendMail(e);
                  } else if (result.data.status == "fail") {
                    toast(
                      result.data.message
                        ? result.data.message
                        : "something went wrong"
                    );
                  } else {
                    toast(
                      result.data.errorInfo
                        ? result.data.errorInfo[2]
                        : "something went wrong"
                    );
                  }
                  // console.log(result)
                  console.log(result.data);
                  //  history.push("/visitor");
                })
                .catch((error) => console.log(error));
            } else {
              toast("Missing fields for visitor!");
            }
            break;
          default:
            if (homeAddress && date && accessID && license) {
              let dataAdminManager = {
                email: emailSignup,
                fname: fname,
                lname: lname,
                pass: passSignup,
                contact: contact,
                role: roleSignup,
                address: homeAddress,
                dob: date,
                id: accessID,
                lic: license,
              };
              axios({
                baseURL: BASE_URL,
                method: "post",
                url: SIGNUP_USER,
                data: dataAdminManager,
                headers: {
                  "content-type": "application/json",
                },
              })
                .then((result) => {
                  if (result.data.status == "pass") {
                    console.log(result.data);
                    resetData();
                    toast(result.data.message);
                    sendMail(e);
                  } else if (result.data.status == "fail") {
                    toast(
                      result.data.message
                        ? result.data.message
                        : "something went wrong"
                    );
                  } else {
                    toast(
                      result.data.errorInfo
                        ? result.data.errorInfo[2]
                        : "something went wrong"
                    );
                  }
                  // console.log(result)
                  console.log(result.data);
                  //    history.push("/manager");
                })
                .catch((error) => console.log(error));
            } else {
              toast(`Missing fields for ${roleSignup}!`);
            }
            break;
        }
      }
    } else {
      toast("Some fields are empty!");
    }
  };

  const sendMail = (e) => {
    e.preventDefault();
    let fullName = `${fname} ${lname}`;
    let templateParams = {
      to_email: emailSignup,
      from_name: "Lunamar holdings",
      to_name: fullName,
      message: `You can now login with the following credentials \n
      username: ${emailSignup}
      password: ${passSignup}
      `,
    };
    emailjs.send(SERVICE_ID, TEMPLATE_ID_SIGNUP, templateParams).then(
      (result) => {
        console.log(result.text);
        toast("We just sent you a confirmation!");
      },
      (error) => {
        console.log(error.text);
      }
    );
  };

  // const setUserData = (userData) => {
  //   dispatch(storeAuthData(userData));
  // };

  const loginUser = () => {
    axios({
      baseURL: BASE_URL,
      method: "post",
      url: LOGIN_USER,
      headers: {
        "content-type": "application/json",
      },
      data: { email: email, pass: pass },
    })
      .then((result) => {
        // console.log(result)
        // console.log(result.data);
        if (result.data.status == "pass") {
          let userData = result.data.data;
          // setUserData(userData);
          switch (result.data.data.role) {
            case "resident":
              sessionStorage.setItem("residentUser", JSON.stringify(userData));
              history.push("/resident");
              break;
            case "visitor":
              sessionStorage.setItem("visitorUser", JSON.stringify(userData));
              history.push("/visitor");
              break;
            case "manager":
              sessionStorage.setItem("managerUser", JSON.stringify(userData));
              history.push("/manager");
              break;
            default:
              sessionStorage.setItem("adminUser", JSON.stringify(userData));
              history.push("/admin");
              break;
          }
        } else {
          console.log(result);
          toast(result.data.message);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Fragment>
      <div className="login-signup-container">
        <div>
          <div name="form-signin" className="login-box form">
            <h1>Sign In</h1>

            <fieldset>
              <label htmlFor="email-signin">Email:</label>
              <input
                type="email"
                id="email-signin"
                name="email-signin"
                placeholder="xyz@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label htmlFor="password-signin">Password:</label>
              <input
                type="password"
                id="password-signin"
                name="password-signin"
                required
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Enter password"
              />
            </fieldset>
            <button type="button" onClick={() => checkUser()}>
              Login
            </button>
          </div>
        </div>

        <div>
          <form name="form-signup" className="signup-box">
            <h1>Sign Up</h1>

            <fieldset>
              <legend>Basic info:</legend>
              <label htmlFor="f-name">First Name:</label>
              <input
                type="text"
                id="f-name"
                name="f-name"
                placeholder="Enter first name"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
              />

              <label htmlFor="l-name">Last Name:</label>
              <input
                type="text"
                id="l-name"
                name="l-name"
                placeholder="Enter last name"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />

              <label htmlFor="email-signup">Email:</label>
              <input
                type="email"
                id="email-signup"
                name="email-signup"
                placeholder="xyz@mail.com"
                value={emailSignup}
                onChange={(e) => setEmailSignup(e.target.value)}
              />

              <label htmlFor="pass-signup">Password:</label>
              <input
                type="password"
                id="pass-signup"
                name="pass-signup"
                placeholder="Enter password"
                value={passSignup}
                onChange={(e) => setPassSignup(e.target.value)}
              />
              <label htmlFor="conf-pass-signup">Confirm Password:</label>
              <input
                type="password"
                id="conf-pass-signup"
                name="conf-pass-signup"
                placeholder="Enter password"
                value={confPassSignup}
                onChange={(e) => setConfPassSignup(e.target.value)}
              />

              <label htmlFor="contact-signup">Contact Number:</label>
              <input
                type="number"
                id="contact-signup"
                name="contact-signup"
                placeholder="Enter contact number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </fieldset>

            <fieldset>
              <label htmlFor="sign-up-role">Who are you?:</label>
              <select
                id="sign-up-role"
                name="user_role"
                value={roleSignup}
                onChange={(e) => setRoleSignup(e.target.value)}
              >
                <option value="resident">Resident</option>
                <option value="visitor">Visitor</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </fieldset>

            {roleSignup == "manager" || roleSignup == "admin" ? (
              <fieldset className="manager-admin-form">
                <label htmlFor="access-id">Enter Unique Access Id:</label>
                <input
                  type="text"
                  id="access-id"
                  name="access-id"
                  placeholder="Enter access id"
                  value={accessID}
                  onChange={(e) => setAccessID(e.target.value)}
                />
                <label htmlFor="address-mgr-adm">Home Address:</label>
                <input
                  type="text"
                  id="address-mgr-adm"
                  name="address-mgr-adm"
                  placeholder="Enter home address"
                  value={homeAddress}
                  onChange={(e) => setHomeAddress(e.target.value)}
                />
                <label htmlFor="mgr-dob">Date of birth:</label>
                <input
                  type="date"
                  id="mgr-dob"
                  name="date-of-birth"
                  min="1900-01-01"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <label for="license-resident">Driving License:</label>
                <input
                  type="text"
                  id="license-resident"
                  name="license-resident"
                  placeholder="Enter license number"
                  value={license}
                  onChange={(e) => setLicense(e.target.value)}
                />
              </fieldset>
            ) : null}

            {roleSignup == "resident" ? (
              <fieldset className="resident-admin-form">
                <div className="visitors-check-in-form-container-bldg-info-container">
                  <div className="visitors-check-in-form-container-bldg-info-select">
                    <label htmlFor="building-num">Building</label>
                    <select
                      id="building-num"
                      name="building-num"
                      onChange={(e) => setBldg(e.target.value)}
                    >
                      {bldgArray ? (
                        bldgArray.map((elem) => (
                          <option value={elem.bldgnum}>{elem.bldgnum}</option>
                        ))
                      ) : (
                        <option value="1">1</option>
                      )}
                    </select>
                  </div>
                  <div className="visitors-check-in-form-container-bldg-info-select">
                    <label for="apartment-num">Apartment</label>
                    <select
                      id="apartment-num"
                      name="apartment-num"
                      onChange={(e) => setApt(e.target.value)}
                    >
                      {aptArray ? (
                        aptArray.map((elem) => (
                          <option value={elem.aptnum}>{elem.aptnum}</option>
                        ))
                      ) : (
                        <option value="1">101</option>
                      )}
                    </select>
                  </div>
                </div>
                <label for="resident-dob">Date of birth:</label>
                <input
                  type="date"
                  id="resident-dob"
                  name="date-of-birth"
                  min="1900-01-01"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <label for="license-resident">Driving License:</label>
                <input
                  type="text"
                  id="license-resident"
                  name="license-resident"
                  placeholder="Enter license number"
                  value={license}
                  onChange={(e) => setLicense(e.target.value)}
                />
              </fieldset>
            ) : null}

            {roleSignup == "visitor" ? (
              <fieldset className="visitor-admin-form">
                <label for="dob-visitor">Date of birth:</label>
                <input
                  type="date"
                  id="dob-visitor"
                  name="date-of-birth"
                  min="1900-01-01"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <label for="address-visitor">Home Address:</label>
                <input
                  type="text"
                  id="address-visitor"
                  name="address-visitor"
                  placeholder="Enter home address"
                  value={homeAddress}
                  onChange={(e) => setHomeAddress(e.target.value)}
                />
                <label for="license-visitor">Driving License:</label>
                <input
                  type="text"
                  id="license-visitor"
                  name="license-visitor"
                  placeholder="Enter license number"
                  value={license}
                  onChange={(e) => setLicense(e.target.value)}
                />
              </fieldset>
            ) : null}

            <button type="button" onClick={(e) => signUpUser(e)}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginSignup;
