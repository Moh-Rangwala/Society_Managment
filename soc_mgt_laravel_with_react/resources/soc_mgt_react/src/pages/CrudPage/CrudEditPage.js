import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./crudpage.css";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useSelector, useDispatch } from "react-redux";
import "react-pro-sidebar/dist/css/styles.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  BASE_URL,
  DELETE_FLAT_DETAIL,
  DELETE_GARDEN_POOL_DETAIL,
  DELETE_MANAGER_DETAIL,
  DELETE_RESIDENT_VISITOR_DETAIL,
  DELETE_SERVICE_DETAIL,
  DELETE_SERVICE_REQUEST_DETAIL,
  EDIT_FLAT_DETAIL,
  EDIT_GARDEN_POOL_DETAIL,
  EDIT_MANAGER_DETAIL,
  EDIT_RESIDENT_VISITOR_DETAIL,
  EDIT_SERVICE_DETAIL,
  EDIT_SERVICE_REQUESTS_DETAIL,
} from "../../api/api";
import { confirmAlert } from "react-confirm-alert";
import moment from "moment";

const CrudEditPage = ({}) => {
  const history = useHistory();
  const pageContentType = useSelector((state) => state.admin.pageContent);
  const userData = history.location.state ? history.location.state.data : null;
  const userRole = history.location.state ? history.location.state.role : null;
  const path = history.location.pathname;
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [bldg, setBldg] = useState("1");
  const [apt, setApt] = useState("101");
  const [date, setDate] = useState("");
  const [license, setLicense] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [serviceCategory, setServiceCategory] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [flatDetail, setFlatDetail] = useState("");
  const [approveReq, setApproveReq] = useState("");
  const [amenityName, setAmenityName] = useState("");

  useEffect(async () => {
    // console.log(userRole);
    let userTokenData = null;
    if (path.includes("manager")) {
      userTokenData = sessionStorage.getItem("managerUser");
    } else if (path.includes("admin")) {
      userTokenData = sessionStorage.getItem("adminUser");
    }
    // console.log(history.location.pathname);
    // console.log(pageContentType);
    if (userTokenData) {
      switch (pageContentType) {
        case "managers":
        case "visitor":
          setFname(userData.fname);
          setLname(userData.lname);
          setEmail(userData.email);
          setContact(userData.contact);
          setHomeAddress(userData.address);
          setLicense(userData.license);
          setDate(userData.dob);
          break;
        case "buildings":
          setOwnerId(userData.owner_id);
          setApt(userData.aptnum);
          setBldg(userData.bldgnum);
          setOwnerName(userData.owner);
          break;
        case "servicelist":
          setServiceCategory(userData.category);
          setServiceName(userData.service_name);
          setStartTime(userData.start_time);
          setEndTime(userData.end_time);
          break;
        case "servicereq":
          setApproveReq(userData.approve);
          setFlatDetail(userData.flat_detail);
          setOwnerId(userData.owner_id);
          setServiceId(userData.service_id);
          setServiceName(userData.service_name);
          break;
        case "resident":
          setFname(userData.fname);
          setLname(userData.lname);
          setEmail(userData.email);
          setContact(userData.contact);
          setLicense(userData.license);
          setDate(userData.dob);
          setApt(userData.apt);
          setBldg(userData.bldg);
          setHomeAddress(userData.address);
          break;
        case "garden":
        case "pools":
          setAmenityName(userData.name);
          setStartTime(userData.start_time);
          setEndTime(userData.end_time);
          break;
        default:
          break;
      }
    } else {
      history.replace("/login-signup");
      toast("Unauthorized Access!");
    }
  }, []);

  const confirmDeleteSubmit = () => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure to do this?",
      closeOnEscape: true,
      closeOnClickOutside: true,
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteUserDetail(),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validateTime = (time) => {
    return moment(time, "HH:mm:ss", true).isValid();
  };

  const updateUserDetail = () => {
    switch (pageContentType) {
      case "managers":
        if (fname && lname && contact && homeAddress && license && date) {
          let data = {
            email,
            fname,
            lname,
            contact,
            dob: date,
            lic: license,
            address: homeAddress,
          };
          console.log("sdsd", data);
          axios({
            baseURL: BASE_URL,
            method: "put",
            url: EDIT_MANAGER_DETAIL,
            data: data,
            headers: {
              "content-type": "application/json",
            },
          })
            .then((result) => {
              console.log(result.data);
              if (result.data.status == "pass") {
                toast(result.data.message);
                history.replace(`/${userRole}`);
              } else {
                toast(
                  result.data.message
                    ? result.data.message
                    : "something went wrong"
                );
              }
            })
            .catch((error) => console.log(error));
        } else {
          toast("Fields cannot be empty!");
        }
        break;
      case "buildings":
        if (ownerId && ownerName) {
          if (validateEmail(ownerId)) {
            let data = {
              ownerId: ownerId,
              owner: ownerName,
              bldg: bldg,
              apt: apt,
            };
            console.log("sdsd", data);
            axios({
              baseURL: BASE_URL,
              method: "put",
              url: EDIT_FLAT_DETAIL,
              data: data,
              headers: {
                "content-type": "application/json",
              },
            })
              .then((result) => {
                console.log(result.data);
                if (result.data.status == "pass") {
                  toast(result.data.message);
                  history.replace(`/${userRole}`);
                } else {
                  toast(
                    result.data.message
                      ? result.data.message
                      : "something went wrong"
                  );
                }
              })
              .catch((error) => console.log(error));
          } else {
            toast("Invalid email format!");
          }
        } else {
          toast("Fields cannot be empty!");
        }
        break;
      case "servicelist":
        if (serviceCategory && serviceName && startTime && endTime) {
          if (validateTime(startTime) && validateTime(endTime)) {
            // console.log(startTime, endTime);
            let data = {
              service_name: serviceName,
              category: serviceCategory,
              start_time: startTime,
              end_time: endTime,
              id: userData.id,
            };
            axios({
              baseURL: BASE_URL,
              method: "put",
              url: EDIT_SERVICE_DETAIL,
              data: data,
              headers: {
                "content-type": "application/json",
              },
            })
              .then((result) => {
                console.log(result.data);
                if (result.data.status == "pass") {
                  toast(result.data.message);
                  history.replace(`/${userRole}`);
                } else {
                  toast(
                    result.data.message
                      ? result.data.message
                      : "something went wrong"
                  );
                }
              })
              .catch((error) => console.log(error));
          } else {
            toast("Invalid time format!");
          }
        } else {
          toast("Fields cannot be empty!");
        }
        break;
      case "servicereq":
        if (approveReq == "1") {
          // console.log(startTime, endTime);
          let data = {
            approve: approveReq,
            id: userData.id,
          };
          axios({
            baseURL: BASE_URL,
            method: "put",
            url: EDIT_SERVICE_REQUESTS_DETAIL,
            data: data,
            headers: {
              "content-type": "application/json",
            },
          })
            .then((result) => {
              console.log(result.data);
              if (result.data.status == "pass") {
                toast(result.data.message);
                history.replace(`/${userRole}`);
              } else {
                toast(
                  result.data.message
                    ? result.data.message
                    : "something went wrong"
                );
              }
            })
            .catch((error) => console.log(error));
        } else {
          toast("Approve the request!");
        }
        break;
      case "resident":
      case "visitor":
        if (fname && lname && contact && license && date) {
          let data = {
            email,
            fname,
            lname,
            contact,
            dob: date,
            lic: license,
            address: homeAddress,
          };
          //   console.log("sdsd", data);
          axios({
            baseURL: BASE_URL,
            method: "put",
            url: EDIT_RESIDENT_VISITOR_DETAIL,
            data: data,
            headers: {
              "content-type": "application/json",
            },
          })
            .then((result) => {
              console.log(result.data);
              if (result.data.status == "pass") {
                toast(result.data.message);
                history.replace(`/${userRole}`);
              } else {
                toast(
                  result.data.message
                    ? result.data.message
                    : "something went wrong"
                );
              }
            })
            .catch((error) => console.log(error));
        } else {
          toast("Fields cannot be empty!");
        }
        break;
      case "garden":
      case "pools":
        if (amenityName && startTime && endTime) {
          if (validateTime(startTime) && validateTime(endTime)) {
            // console.log(startTime, endTime);
            let data = {
              amenityName: amenityName,
              start_time: startTime,
              end_time: endTime,
              id: userData.id,
            };
            axios({
              baseURL: BASE_URL,
              method: "put",
              url: EDIT_GARDEN_POOL_DETAIL,
              data: data,
              headers: {
                "content-type": "application/json",
              },
            })
              .then((result) => {
                console.log(result.data);
                if (result.data.status == "pass") {
                  toast(result.data.message);
                  history.replace(`/${userRole}`);
                } else {
                  toast(
                    result.data.message
                      ? result.data.message
                      : "something went wrong"
                  );
                }
              })
              .catch((error) => console.log(error));
          } else {
            toast("Invalid time format!");
          }
        } else {
          toast("Fields cannot be empty!");
        }
        break;
    }
  };

  const deleteUserDetail = () => {
    switch (pageContentType) {
      case "managers":
        {
          let data = {
            email,
          };
          console.log("delete");
          axios({
            baseURL: BASE_URL,
            method: "delete",
            url: DELETE_MANAGER_DETAIL,
            data: data,
            headers: {
              "content-type": "application/json",
            },
          })
            .then((result) => {
              console.log(result.data);
              if (result.data.status == "pass") {
                toast(result.data.message);
                history.replace(`/${userRole}`);
              } else {
                toast(
                  result.data.message
                    ? result.data.message
                    : "something went wrong"
                );
              }
            })
            .catch((error) => console.log(error));
        }
        break;
      case "buildings":
        {
          let data = {
            bldg: bldg,
            apt: apt,
          };
          // console.log("delete");
          axios({
            baseURL: BASE_URL,
            method: "delete",
            url: DELETE_FLAT_DETAIL,
            data: data,
            headers: {
              "content-type": "application/json",
            },
          })
            .then((result) => {
              console.log(result.data);
              if (result.data.status == "pass") {
                toast(result.data.message);
                history.replace(`/${userRole}`);
              } else {
                toast(
                  result.data.message
                    ? result.data.message
                    : "something went wrong"
                );
              }
            })
            .catch((error) => console.log(error));
        }
        break;
      case "servicelist":
        {
          let data = {
            id: userData.id,
          };
          axios({
            baseURL: BASE_URL,
            method: "delete",
            url: DELETE_SERVICE_DETAIL,
            data: data,
            headers: {
              "content-type": "application/json",
            },
          })
            .then((result) => {
              console.log(result.data);
              if (result.data.status == "pass") {
                toast(result.data.message);
                history.replace(`/${userRole}`);
              } else {
                toast(
                  result.data.message
                    ? result.data.message
                    : "something went wrong"
                );
              }
            })
            .catch((error) => console.log(error));
        }
        break;
      case "servicereq":
        {
          let data = {
            id: userData.id,
          };
          axios({
            baseURL: BASE_URL,
            method: "delete",
            url: DELETE_SERVICE_REQUEST_DETAIL,
            data: data,
            headers: {
              "content-type": "application/json",
            },
          })
            .then((result) => {
              console.log(result.data);
              if (result.data.status == "pass") {
                toast(result.data.message);
                history.replace(`/${userRole}`);
              } else {
                toast(
                  result.data.message
                    ? result.data.message
                    : "something went wrong"
                );
              }
            })
            .catch((error) => console.log(error));
        }
        break;
      case "resident":
      case "visitor":
        {
          let data = {
            email,
          };
          console.log("delete");
          axios({
            baseURL: BASE_URL,
            method: "delete",
            url: DELETE_RESIDENT_VISITOR_DETAIL,
            data: data,
            headers: {
              "content-type": "application/json",
            },
          })
            .then((result) => {
              console.log(result.data);
              if (result.data.status == "pass") {
                toast(result.data.message);
                history.replace(`/${userRole}`);
              } else {
                toast(
                  result.data.message
                    ? result.data.message
                    : "something went wrong"
                );
              }
            })
            .catch((error) => console.log(error));
        }
        break;
      case "garden":
      case "pools":
        {
          let data = {
            id: userData.id,
          };
          axios({
            baseURL: BASE_URL,
            method: "delete",
            url: DELETE_GARDEN_POOL_DETAIL,
            data: data,
            headers: {
              "content-type": "application/json",
            },
          })
            .then((result) => {
              console.log(result.data);
              if (result.data.status == "pass") {
                toast(result.data.message);
                history.replace(`/${userRole}`);
              } else {
                toast(
                  result.data.message
                    ? result.data.message
                    : "something went wrong"
                );
              }
            })
            .catch((error) => console.log(error));
        }
        break;
    }
  };

  return (
    <Fragment>
      <div className="admin-manager-main-container">
        <div className="admin-manager-side-menu-container">
          <ProSidebar style={{ width: "100%", height: "100%" }}>
            <Menu iconShape="square">
              <MenuItem
                onClick={() => {
                  if (path.includes("manager")) {
                    history.replace(`/manager`);
                  } else {
                    history.replace(`/admin`);
                  }
                }}
              >
                Return to Dashboard
              </MenuItem>
            </Menu>
          </ProSidebar>
        </div>
        <div className="admin-manager-content-container">
          <section className="tab-content">
            <div className="tab-content-container">
              <div className="tab-content-container-header-and-add-button">
                <h2>Update Info</h2>
              </div>
              {pageContentType == "managers" || pageContentType == "visitor" ? (
                <div className="crud-operation-form-container">
                  <form className="form">
                    <label htmlFor="first-name">First Name</label>
                    <input
                      type="text"
                      id="first-name"
                      name="first-name"
                      placeholder="Your first name.."
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                    />
                    <label htmlFor="last-name">Last Name</label>
                    <input
                      type="text"
                      id="last-name"
                      name="last-name"
                      placeholder="Your last name.."
                      value={lname}
                      onChange={(e) => setLname(e.target.value)}
                    />
                    <label htmlFor="email-signup">Email:</label>
                    <input
                      type="email"
                      id="email-signup"
                      name="email-signup"
                      placeholder="xyz@mail.com"
                      value={email}
                      disabled
                    />
                    <label htmlFor="contact">Contact</label>
                    <input
                      type="text"
                      id="contact"
                      name="contact"
                      placeholder="XXX-XXX-XXXX"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
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

                    <label for="license-resident">Driving License:</label>
                    <input
                      type="text"
                      id="license-resident"
                      name="license-resident"
                      placeholder="Enter license number"
                      value={license}
                      onChange={(e) => setLicense(e.target.value)}
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

                    <div className="crud-operation-form-button-container">
                      <a
                        onClick={() => updateUserDetail()}
                        className="crud-operation-form-button"
                      >
                        Update
                      </a>
                      <a
                        onClick={() => confirmDeleteSubmit()}
                        className="crud-operation-form-button"
                      >
                        Delete
                      </a>
                    </div>
                  </form>
                </div>
              ) : null}
              {pageContentType == "buildings" ? (
                <div className="crud-operation-form-container">
                  <form className="form">
                    <label for="first-name">Owner</label>
                    <input
                      type="text"
                      id="first-name"
                      name="first-name"
                      placeholder="Enter Owner Name.."
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                    />
                    <label for="last-name">Owner Id</label>
                    <input
                      type="email"
                      id="last-name"
                      name="last-name"
                      placeholder="Enter owner Id.."
                      value={ownerId}
                      onChange={(e) => setOwnerId(e.target.value)}
                    />
                    <div
                      className="
                   visitors-check-in-form-container-bldg-info-container
                 "
                    >
                      <div
                        className="
                     visitors-check-in-form-container-bldg-info-select
                   "
                      >
                        <label for="building-num">Building</label>
                        <select disabled id="building-num" name="building-num">
                          <option value={bldg}>{bldg}</option>
                        </select>
                      </div>
                      <div
                        className="
                     visitors-check-in-form-container-bldg-info-select
                   "
                      >
                        <label for="apartment-num">Apartment</label>
                        <select
                          disabled
                          id="apartment-num"
                          name="apartment-num"
                        >
                          <option value={apt}>{apt}</option>
                        </select>
                      </div>
                    </div>
                    <div className="crud-operation-form-button-container">
                      <a
                        onClick={() => updateUserDetail()}
                        className="crud-operation-form-button"
                      >
                        Update
                      </a>
                      <a
                        onClick={() => confirmDeleteSubmit()}
                        className="crud-operation-form-button"
                      >
                        Delete
                      </a>
                    </div>
                  </form>
                </div>
              ) : null}
              {pageContentType == "servicelist" ? (
                <div className="crud-operation-form-container">
                  <form className="form">
                    <label htmlFor="first-name">Service Category</label>
                    <input
                      type="text"
                      id="first-name"
                      name="first-name"
                      placeholder="Enter the category.."
                      value={serviceCategory}
                      onChange={(e) => setServiceCategory(e.target.value)}
                    />
                    <label htmlFor="last-name">Service Name</label>
                    <input
                      type="text"
                      id="last-name"
                      name="last-name"
                      placeholder="Enter the service name.."
                      value={serviceName}
                      onChange={(e) => setServiceName(e.target.value)}
                    />
                    <label htmlFor="email-signup">Start Time:</label>
                    <input
                      type="text"
                      id="contact"
                      name="contact"
                      placeholder="hh:mm:ss"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                    <label htmlFor="contact">End Time</label>
                    <input
                      type="text"
                      id="contact"
                      name="contact"
                      placeholder="hh:mm:ss"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />

                    <div className="crud-operation-form-button-container">
                      <a
                        onClick={() => updateUserDetail()}
                        className="crud-operation-form-button"
                      >
                        Update
                      </a>
                      <a
                        onClick={() => confirmDeleteSubmit()}
                        className="crud-operation-form-button"
                      >
                        Delete
                      </a>
                    </div>
                  </form>
                </div>
              ) : null}

              {pageContentType == "servicereq" ? (
                <div className="crud-operation-form-container">
                  <form className="form">
                    <label htmlFor="first-name">Service ID</label>
                    <input
                      type="text"
                      id="first-name"
                      name="first-name"
                      placeholder="Enter the ID.."
                      value={serviceId}
                      disabled
                    />
                    <label htmlFor="last-name">Service Name</label>
                    <input
                      type="text"
                      id="last-name"
                      name="last-name"
                      placeholder="Enter the service name.."
                      value={serviceName}
                      disabled
                    />
                    <label htmlFor="email-signup">Owner ID</label>
                    <input
                      type="text"
                      id="contact"
                      name="contact"
                      placeholder="Owner ID"
                      value={ownerId}
                      disabled
                    />
                    <label htmlFor="contact">Flat Detail</label>
                    <input
                      type="text"
                      id="contact"
                      name="contact"
                      placeholder="flat detail"
                      value={flatDetail}
                      disabled
                    />

                    <div onChange={(e) => setApproveReq(e.target.value)}>
                      <input
                        checked={approveReq == "1" ? true : false}
                        type="radio"
                        value={"1"}
                        name="approve"
                      />{" "}
                      Approve
                      <input
                        checked={approveReq == "0" ? true : false}
                        type="radio"
                        value={"0"}
                        name="approve"
                      />{" "}
                      Don't Approve
                    </div>

                    <div className="crud-operation-form-button-container">
                      <a
                        onClick={() =>
                          userData.approve == "0" ? updateUserDetail() : null
                        }
                        className="crud-operation-form-button"
                      >
                        Update
                      </a>
                      <a
                        onClick={() => confirmDeleteSubmit()}
                        className="crud-operation-form-button"
                      >
                        Delete
                      </a>
                    </div>
                  </form>
                </div>
              ) : null}

              {pageContentType == "resident" ? (
                <div className="crud-operation-form-container">
                  <form className="form">
                    <label htmlFor="first-name">First Name</label>
                    <input
                      type="text"
                      id="first-name"
                      name="first-name"
                      placeholder="Your first name.."
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                    />
                    <label htmlFor="last-name">Last Name</label>
                    <input
                      type="text"
                      id="last-name"
                      name="last-name"
                      placeholder="Your last name.."
                      value={lname}
                      onChange={(e) => setLname(e.target.value)}
                    />
                    <label htmlFor="email-signup">Email:</label>
                    <input
                      type="email"
                      id="email-signup"
                      name="email-signup"
                      placeholder="xyz@mail.com"
                      value={email}
                      disabled
                    />
                    <label htmlFor="contact">Contact</label>
                    <input
                      type="text"
                      id="contact"
                      name="contact"
                      placeholder="XXX-XXX-XXXX"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    />

                    <div
                      className="
                   visitors-check-in-form-container-bldg-info-container
                 "
                    >
                      <div
                        className="
                     visitors-check-in-form-container-bldg-info-select
                   "
                      >
                        <label for="building-num">Building</label>
                        <select disabled id="building-num" name="building-num">
                          <option value={bldg}>{bldg}</option>
                        </select>
                      </div>
                      <div
                        className="
                     visitors-check-in-form-container-bldg-info-select
                   "
                      >
                        <label for="apartment-num">Apartment</label>
                        <select
                          disabled
                          id="apartment-num"
                          name="apartment-num"
                        >
                          <option value={apt}>{apt}</option>
                        </select>
                      </div>
                    </div>

                    <label for="license-resident">Driving License:</label>
                    <input
                      type="text"
                      id="license-resident"
                      name="license-resident"
                      placeholder="Enter license number"
                      value={license}
                      onChange={(e) => setLicense(e.target.value)}
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

                    <div className="crud-operation-form-button-container">
                      <a
                        onClick={() => updateUserDetail()}
                        className="crud-operation-form-button"
                      >
                        Update
                      </a>
                      <a
                        onClick={() => confirmDeleteSubmit()}
                        className="crud-operation-form-button"
                      >
                        Delete
                      </a>
                    </div>
                  </form>
                </div>
              ) : null}

              {pageContentType == "garden" || pageContentType == "pools" ? (
                <div className="crud-operation-form-container">
                  <form className="form">
                    <label htmlFor="first-name">
                      {pageContentType.charAt(0).toUpperCase() +
                        pageContentType.slice(1)}{" "}
                      Name
                    </label>
                    <input
                      type="text"
                      id="first-name"
                      name="first-name"
                      placeholder="Enter the name.."
                      value={amenityName}
                      onChange={(e) => setAmenityName(e.target.value)}
                    />
                    <label htmlFor="email-signup">Start Time:</label>
                    <input
                      type="text"
                      id="contact"
                      name="contact"
                      placeholder="hh:mm:ss"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                    <label htmlFor="contact">End Time</label>
                    <input
                      type="text"
                      id="contact"
                      name="contact"
                      placeholder="hh:mm:ss"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />

                    <div className="crud-operation-form-button-container">
                      <a
                        onClick={() => updateUserDetail()}
                        className="crud-operation-form-button"
                      >
                        Update
                      </a>
                      <a
                        onClick={() => confirmDeleteSubmit()}
                        className="crud-operation-form-button"
                      >
                        Delete
                      </a>
                    </div>
                  </form>
                </div>
              ) : null}
            </div>
          </section>
        </div>
      </div>
    </Fragment>
  );
};

export default CrudEditPage;
