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
  ADD_NEW_FLAT_DETAIL,
  ADD_NEW_GARDEN_POOL_DETAIL,
  ADD_NEW_SERVICE_DETAIL,
  BASE_URL,
} from "../../api/api";
import moment from "moment";

const CrudAddPage = ({}) => {
  const history = useHistory();
  const pageContentType = useSelector((state) => state.admin.pageContent);
  const userRole = history.location.state ? history.location.state.role: null;
  const path = history.location.pathname;
  const [bldg, setBldg] = useState("1");
  const [apt, setApt] = useState("01");
  const [ownerName, setOwnerName] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [serviceCategory, setServiceCategory] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [amenityName, setAmenityName] = useState("");

  useEffect(() => {
    console.log(pageContentType);
    let userTokenData = null;
    if(path.includes('manager')) {
       userTokenData = sessionStorage.getItem("managerUser");
    } else if(path.includes('admin')) {
       userTokenData = sessionStorage.getItem("adminUser");
    }
    if(userTokenData == null) {
      history.replace("/login-signup");
      toast("Unauthorized Access!");
    }
  }, []);

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validateTime = (time) => {
    return moment(time, "HH:mm:ss", true).isValid();
  };

  const addUserDetail = () => {
    switch (pageContentType) {
      case "buildings":
        if (ownerId && ownerName && bldg && apt) {
          if (validateEmail(ownerId)) {
            let data = {
              ownerId: ownerId,
              owner: ownerName,
              bldg: bldg,
              apt: bldg + apt,
            };
            // console.log("sdsd", data);
            axios({
              baseURL: BASE_URL,
              method: "post",
              url: ADD_NEW_FLAT_DETAIL,
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
                      : "This flat is already made!"
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
            };
            axios({
              baseURL: BASE_URL,
              method: "post",
              url: ADD_NEW_SERVICE_DETAIL,
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
      case "garden":
      case "pools":
        if (amenityName && startTime && endTime) {
          if (validateTime(startTime) && validateTime(endTime)) {
            // console.log(startTime, endTime);
            let data = {
              amenityName: amenityName,
              start_time: startTime,
              end_time: endTime,
              type: pageContentType == "garden" ? "garden" : "pool",
            };
            axios({
              baseURL: BASE_URL,
              method: "post",
              url: ADD_NEW_GARDEN_POOL_DETAIL,
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

  return (
    <Fragment>
      <div className="admin-manager-main-container">
        <div className="admin-manager-side-menu-container">
          <ProSidebar style={{ width: "100%", height: "100%" }}>
            <Menu iconShape="square">
              <MenuItem
                onClick={() => {
                  if(path.includes('manager')) { 
                    history.replace(`/manager`);
                  }else {
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
                <h2>Add Info</h2>
              </div>

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
                        <select
                          onChange={(e) => setBldg(e.target.value)}
                          id="building-num"
                          name="building-num"
                        >
                          <option value={"1"}>{"1"}</option>
                          <option value={"2"}>{"2"}</option>
                          <option value={"3"}>{"3"}</option>
                          <option value={"4"}>{"4"}</option>
                          <option value={"5"}>{"5"}</option>
                          <option value={"6"}>{"6"}</option>
                          <option value={"7"}>{"7"}</option>
                          <option value={"8"}>{"8"}</option>
                          <option value={"9"}>{"9"}</option>
                          <option value={"10"}>{"10"}</option>
                        </select>
                      </div>
                      <div
                        className="
                     visitors-check-in-form-container-bldg-info-select
                   "
                      >
                        <label for="apartment-num">Apartment</label>
                        <select
                          id="apartment-num"
                          name="apartment-num"
                          onChange={(e) => setApt(e.target.value)}
                        >
                          <option value={"01"}>{"01"}</option>
                          <option value={"02"}>{"02"}</option>
                          <option value={"03"}>{"03"}</option>
                          <option value={"04"}>{"04"}</option>
                          <option value={"05"}>{"05"}</option>
                          <option value={"06"}>{"06"}</option>
                          <option value={"07"}>{"07"}</option>
                          <option value={"08"}>{"08"}</option>
                        </select>
                      </div>
                    </div>
                    <div className="crud-operation-form-button-container">
                      <a
                        onClick={() => addUserDetail()}
                        className="crud-operation-form-button"
                      >
                        Add
                      </a>
                      <a
                        onClick={() => {
                          if(path.includes('manager')) { 
                            history.replace(`/manager`);
                          }else {
                            history.replace(`/admin`);
                          }
                        }}
                        className="crud-operation-form-button"
                      >
                        Cancel
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
                        onClick={() => addUserDetail()}
                        className="crud-operation-form-button"
                      >
                        Add
                      </a>
                      <a
                        onClick={() => {
                          if(path.includes('manager')) { 
                            history.replace(`/manager`);
                          }else {
                            history.replace(`/admin`);
                          }
                        }}
                        className="crud-operation-form-button"
                      >
                        Cancel
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
                        onClick={() => addUserDetail()}
                        className="crud-operation-form-button"
                      >
                        Add
                      </a>
                      <a
                        onClick={() => {
                          if(path.includes('manager')) { 
                            history.replace(`/manager`);
                          }else {
                            history.replace(`/admin`);
                          }
                        }}
                        className="crud-operation-form-button"
                      >
                        Cancel
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

export default CrudAddPage;
