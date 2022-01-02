import React, { Fragment, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./visitor.css";
import Garden from "../../assets/garden1.jpeg";
import toast from "react-hot-toast";
import axios from "axios";
import {
  BASE_URL,
  CHECKOUT_OUT_VISITOR,
  CHECK_GARDEN_VISIT_ACCESS,
  CHECK_IN_REQUEST_VISITOR,
  GET_BUILDINGS,
  GET_GARDEN_LIST_VISITOR,
  GET_VISITOR_REQUEST_LIST,
  POST_VISITOR_INCIDENT,
  SERVICE_ID,
  TEMPLATE_ID_CONTACT,
} from "../../api/api";
import emailjs from "emailjs-com";
import CustomTable from "../../components/Table/Table";
import columnsData from "../../util/tableColumn";
import { Button } from "@material-ui/core";
import ChatBox from "../../components/ChatBox/ChatBox";
import io from "socket.io-client";

const Visitor = ({}) => {
  const history = useHistory();
  const [userVisitorData, setUserVisitorData] = useState(null);
  const [socketState, setSocketState] = useState(
    io.connect("http://localhost:3005")
  );
  const [aptList, setAptList] = useState(null);
  const [bldgList, setBldgList] = useState(null);
  const [visitApt, setVisitApt] = useState("101");
  const [visitBldg, setVisitBldg] = useState("1");
  const [checkInName, setCheckInName] = useState("");
  const [visitReason, setVisitReason] = useState("");
  const [incidentButton, setIncidentButton] = useState(false);
  const [visitorRequestTable, setVisitorRequestTable] = useState(null);
  const [gardenData, setGardenData] = useState(null);
  const [gardenReqStatus, setGardenReqStatus] = useState("noReq");
  const [incidentDesc, setIncidentDesc] = useState("");
  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");
  const userData = sessionStorage.getItem("visitorUser");

  useEffect(() => {
    if (userData) {
      setUserVisitorData(JSON.parse(userData));
      getData();
      getVisitorRequests();
    } else {
      history.replace("/login-signup");
      toast("Unauthorized Access!");
    }
    // code to run on component mount
    console.log("user data", JSON.parse(userData));
  }, []);

  const getData = () => {
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
        setAptList(result.data.apt);
        setBldgList(result.data.bldg);
      })
      .catch((error) => console.log(error));

    axios({
      baseURL: BASE_URL,
      method: "get",
      url: GET_GARDEN_LIST_VISITOR,
      headers: {
        "content-type": "application/json",
      },
    })
      .then((result) => {
        // console.log(result)
        console.log(result.data);
        setGardenData(result.data.gardenData);
      })
      .catch((error) => console.log(error));
  };

  const getVisitorRequests = () => {
    const userVisData = sessionStorage.getItem("visitorUser");
    const tempVis = JSON.parse(userVisData);
    axios({
      baseURL: BASE_URL,
      method: "get",
      url: GET_VISITOR_REQUEST_LIST,
      params: {
        visitor_id: tempVis.email,
      },
      headers: {
        "content-type": "application/json",
      },
    })
      .then((result) => {
        // console.log(result)
        console.log(result.data);
        setVisitorRequestTable(result.data.data);
      })
      .catch((error) => console.log(error));

    joinRoom(tempVis);
  };

  const requestGardenAccess = () => {
    axios({
      baseURL: BASE_URL,
      method: "get",
      url: CHECK_GARDEN_VISIT_ACCESS,
      params: {
        visitor_id: userVisitorData.email,
      },
      headers: {
        "content-type": "application/json",
      },
    })
      .then((result) => {
        // console.log(result)
        if (result.data.status == "pass") {
          setGardenReqStatus("approve");
          toast(result.data.message);
        } else {
          setGardenReqStatus("noReq");
          toast(result.data.message);
        }
        console.log("garden req", result.data);
      })
      .catch((error) => console.log(error));
  };

  const checkInVisitor = () => {
    if (checkInName && visitReason) {
      let dataOfVisitor = {
        apt: visitApt,
        bldg: visitBldg,
        visitor_id: userVisitorData.email,
        visitor_name: checkInName,
        visit_reason: visitReason,
      };
      axios({
        baseURL: BASE_URL,
        method: "post",
        url: CHECK_IN_REQUEST_VISITOR,
        data: dataOfVisitor,
        headers: {
          "content-type": "application/json",
        },
      })
        .then((result) => {
          // console.log(result)
          console.log(result.data);
          if (result.data.status == "pass") {
            toast(result.data.message);
            // getData();
            setCheckInName("");
            setVisitReason("");
            getVisitorRequests();
          } else {
            toast(result.data.message);
          }
        })
        .catch((error) => console.log(error));
    } else {
      toast("Fields cannot be empty!");
    }
  };

  const checkOutVisitor = (checkoutData) => {
    let dataOfCheckout = {
      visit_request_id: checkoutData.id,
      visitor_id: userVisitorData.email,
    };
    axios({
      baseURL: BASE_URL,
      method: "put",
      url: CHECKOUT_OUT_VISITOR,
      data: dataOfCheckout,
      headers: {
        "content-type": "application/json",
      },
    })
      .then((result) => {
        // console.log(result)
        console.log(result.data);
        if (result.data.status == "pass") {
          toast(result.data.message);
          // getData();
          getVisitorRequests();
        } else {
          toast("Something went wrong!");
        }
      })
      .catch((error) => console.log(error));
  };

  const postIncident = (e) => {
    if (checkInName && incidentDesc) {
      setIncidentButton(true);
      let dataOfVisitor = {
        flat_detail: visitBldg + " " + visitApt,
        visitor_id: userVisitorData.email,
        visitor_name: checkInName,
        incident_desc: incidentDesc,
      };
      axios({
        baseURL: BASE_URL,
        method: "post",
        url: POST_VISITOR_INCIDENT,
        data: dataOfVisitor,
        headers: {
          "content-type": "application/json",
        },
      })
        .then((result) => {
          // console.log(result)
          console.log(result.data);
          if (result.data.status == "pass") {
            toast(result.data.message);
            setCheckInName("");
            setIncidentDesc("");
            setIncidentButton(false);
            sendMail(e);
          } else {
            setCheckInName("");
            setIncidentDesc("");
            setIncidentButton(false);
            toast(result.data.message);
          }
        })
        .catch((error) => console.log(error));
    } else {
      toast("Fields cannot be empty!");
    }
  };

  const sendMail = (e) => {
    e.preventDefault();
    let templateParams = {
      to_email: userVisitorData.email,
      from_name: "Lunamar holdings",
      to_name: checkInName,
      message: `We have received your incident report! \n
      Description: "${incidentDesc}" has been recorded. \n
      Thank you for your cooperation.`,
    };
    emailjs.send(SERVICE_ID, TEMPLATE_ID_CONTACT, templateParams).then(
      (result) => {
        console.log(result.text);
        setCheckInName("");
        setIncidentDesc("");
        setIncidentButton(false);
        toast("We just sent you a confirmation!");
      },
      (error) => {
        console.log(error.text);
        setIncidentButton(false);
        setCheckInName("");
        setIncidentDesc("");
      }
    );
  };

  const renderCheckOutButton = (params) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: "auto" }}
          onClick={() => {
            console.log(params.row);
            if (params.row.approval == "0") {
              toast("Cannot checkout before approval!");
            } else {
              if (params.row.checked_out == "0") {
                checkOutVisitor(params.row);
              } else {
                toast("Already checked out!");
              }
            }
          }}
        >
          Check Out
        </Button>
      </strong>
    );
  };

  const joinRoom = (tempData) => {
    socketState.emit("join_room", tempData.email);
    setRoom(tempData.email);
    setUsername(tempData.fname);
  };

  return (
    <Fragment>
      <div className="resident-page-main-container">
        <div className="residents-services-table-container">
          <h2 id="visitor-services">Visit Apartment Form</h2>
          <div className="visitors-visit-apartment-forms-container">
            <div className="visitors-check-in-form-container">
              <h3>Check-in</h3>
              <form className="form visitor-form">
                <label for="full-name">Full Name</label>
                <input
                  type="text"
                  id="full-name"
                  name="full-name"
                  placeholder="Your name.."
                  value={checkInName}
                  onChange={(e) => setCheckInName(e.target.value)}
                />
                <div className="visitors-check-in-form-container-bldg-info-container">
                  <div className="visitors-check-in-form-container-bldg-info-select">
                    <label for="building-num">Building</label>
                    <select
                      id="building-num"
                      name="building-num"
                      value={visitBldg}
                      onChange={(e) => setVisitBldg(e.target.value)}
                    >
                      {bldgList ? (
                        bldgList.map((item, ind) => {
                          return (
                            <option key={ind} value={item.bldgnum}>
                              {item.bldgnum}
                            </option>
                          );
                        })
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
                      value={visitApt}
                      onChange={(e) => setVisitApt(e.target.value)}
                    >
                      {aptList ? (
                        aptList.map((item, ind) => {
                          return (
                            <option key={ind} value={item.aptnum}>
                              {item.aptnum}
                            </option>
                          );
                        })
                      ) : (
                        <option value="101">101</option>
                      )}
                    </select>
                  </div>
                </div>
                <label for="visit-reason">Visit Reason</label>
                <textarea
                  rows="3"
                  id="visit-reason"
                  name="visit-reason"
                  placeholder="Type your message"
                  value={visitReason}
                  onChange={(e) => setVisitReason(e.target.value)}
                ></textarea>
                <button
                  className="visitor-submit-button"
                  type="button"
                  onClick={(e) => checkInVisitor(e)}
                >
                  Check-In
                </button>
              </form>
            </div>
            <div className="visitors-check-in-form-container">
              <h3>Check-out</h3>
              <CustomTable
                rows={visitorRequestTable ? visitorRequestTable : []}
                columns={columnsData.visitorRequestVisitor(
                  renderCheckOutButton
                )}
                pageSize={5}
                rowHeight={60}
                height={450}
                width={"100%"}
                rowsPerPageOptions={[5]}
              />
            </div>
          </div>
        </div>

        <div>
          <h2 id="visitor-garden">Visit a Garden</h2>
          <div className="resident-page-file-upload-form-container">
            <div className="visitor-page-file-upload-form-container-inner">
              <div className="garden-form">
                <label for="garden-num">Select Garden</label>
                <select
                  id="garden-num"
                  name="garden-num"
                  onChange={() => {
                    setGardenReqStatus("noReq");
                  }}
                >
                  {gardenData ? (
                    gardenData.map((item, ind) => {
                      return (
                        <option key={ind} value={item["name"]}>
                          {item["name"]}
                        </option>
                      );
                    })
                  ) : (
                    <option value="nogarden">No Garden</option>
                  )}
                </select>

                <input
                  type="submit"
                  value="Request Access"
                  onClick={() => {
                    setGardenReqStatus("pending");
                    requestGardenAccess();
                  }}
                />
              </div>
              <h4>
                Request Status:{" "}
                {gardenReqStatus == "approve" ? (
                  <span style={{ color: "green" }}>Approved </span>
                ) : null}
                {gardenReqStatus == "pending" ? (
                  <span style={{ color: "darkgoldenrod" }}>Pending </span>
                ) : null}
                {gardenReqStatus == "noReq" ? (
                  <span style={{ color: "darkgoldenrod" }}>
                    <span> No Request</span>{" "}
                  </span>
                ) : null}
              </h4>
            </div>
            <div className="visitor-page-file-upload-form-container-inner">
              <img src={Garden} style={{ height: 300 }} alt="" />
            </div>
          </div>
        </div>
        <div className="visitor-incident-container">
          <div>
            <h2 id="visitor-incident">Report an Incident</h2>
          </div>
          <div className="visitors-check-in-form-container">
            <div className="form visitor-incident-form">
              <label for="full-name">Full Name</label>
              <input
                type="text"
                id="full-name"
                name="full-name"
                placeholder="Your name.."
                value={checkInName}
                onChange={(e) => setCheckInName(e.target.value)}
              />
              <div className="visitors-check-in-form-container-bldg-info-container">
                <div className="visitors-check-in-form-container-bldg-info-select">
                  <label for="building-num">Building</label>
                  <select
                    id="building-num"
                    name="building-num"
                    value={visitBldg}
                    onChange={(e) => setVisitBldg(e.target.value)}
                  >
                    {bldgList ? (
                      bldgList.map((item, ind) => {
                        return (
                          <option key={ind} value={item.bldgnum}>
                            {item.bldgnum}
                          </option>
                        );
                      })
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
                    value={visitApt}
                    onChange={(e) => setVisitApt(e.target.value)}
                  >
                    {aptList ? (
                      aptList.map((item, ind) => {
                        return (
                          <option key={ind} value={item.aptnum}>
                            {item.aptnum}
                          </option>
                        );
                      })
                    ) : (
                      <option value="101">101</option>
                    )}
                  </select>
                </div>
              </div>
              <label for="visit-reason">Incident Description</label>
              <textarea
                rows="3"
                id="visit-reason"
                name="visit-reason"
                placeholder="Type your message"
                value={incidentDesc}
                onChange={(e) => setIncidentDesc(e.target.value)}
              ></textarea>
              <input
                disabled={incidentButton}
                type="submit"
                value="Submit"
                onClick={(e) => postIncident(e)}
              />
            </div>
          </div>
        </div>
        <div>
          <div>
            <h2 id="visitor-chat">Chat with Management</h2>
          </div>
          <ChatBox socket={socketState} username={username} room={room} />
        </div>
      </div>
    </Fragment>
  );
};

export default Visitor;
