import React, { Fragment, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./resident.css";
import Housing from "../../assets/housing1.jpg";
import toast from "react-hot-toast";
import CustomTable from "../../components/Table/Table";
import columnsData from "../../util/tableColumn";
import { Button } from "@material-ui/core";
import {
  APPROVE_VISITOR_REQUEST,
  BASE_URL,
  BOOK_RESIDENT_SERVICE_REQ,
  CONTRIBUTE_TO_LUNAMAR,
  GET_RESIDENT_VISIT_REQUESTS,
  GET_SERVICES_LIST,
  RESIDENT_SERVICE_REQ_LIST,
} from "../../api/api";
import axios from "axios";
import ChatBox from "../../components/ChatBox/ChatBox";
import io from "socket.io-client";

const Resident = ({}) => {
  const history = useHistory();
  // const socket = io.connect('http://localhost:3005');
  const [socketState, setSocketState] = useState(
    io.connect("http://localhost:3005")
  );
  const [userResidentData, setUserResidentData] = useState(null);
  const [serviceTableData, setServiceTableData] = useState(null);
  const [serviceReqTableData, setServiceReqTableData] = useState(null);
  const [visitorReqTableData, setVisitorReqTableData] = useState(null);
  const [captionImage, setCaptionImage] = useState("");
  const [uploadImageData, setUploadImageData] = useState(null);
  const [uploadImageButton, setUploadImageButton] = useState(false);
  const [visitorHistoryTableData, setVisitorHistoryTableData] = useState(null);
  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");
  const userData = sessionStorage.getItem("residentUser");

  useEffect(() => {
    if (userData) {
      setUserResidentData(JSON.parse(userData));
      getData();
      getVisitorData();
    } else {
      history.replace("/login-signup");
      toast("Unauthorized Access!");
    }
    // code to run on component mount
    console.log("user data", JSON.parse(userData));
  }, []);

  const getData = () => {
    const userData = sessionStorage.getItem("residentUser");
    const tempDataUser = JSON.parse(userData);
    axios({
      baseURL: BASE_URL,
      method: "get",
      url: GET_SERVICES_LIST,
      headers: {
        "content-type": "application/json",
      },
    })
      .then((result) => {
        // console.log(result)
        // console.log(result.data);
        setServiceTableData(result.data.data);
      })
      .catch((error) => console.log(error));

    axios({
      baseURL: BASE_URL,
      method: "get",
      url: RESIDENT_SERVICE_REQ_LIST,
      params: {
        id: tempDataUser.email,
      },
      headers: {
        "content-type": "application/json",
      },
    })
      .then((result) => {
        // console.log(result)
        console.log(result.data);
        setServiceReqTableData(result.data.data);
      })
      .catch((error) => console.log(error));

    joinRoom(tempDataUser);
  };

  const getVisitorData = () => {
    const userData = sessionStorage.getItem("residentUser");
    const tempDataUser = JSON.parse(userData);
    axios({
      baseURL: BASE_URL,
      method: "get",
      url: GET_RESIDENT_VISIT_REQUESTS,
      params: {
        status: "new",
        owner_id: tempDataUser.email,
      },
      headers: {
        "content-type": "application/json",
      },
    })
      .then((result) => {
        // console.log(result)
        // console.log(result.data);
        if (result.data.status == "pass") {
          setVisitorReqTableData(result.data.data);
        }
      })
      .catch((error) => console.log(error));

    axios({
      baseURL: BASE_URL,
      method: "get",
      url: GET_RESIDENT_VISIT_REQUESTS,
      params: {
        status: "old",
        owner_id: tempDataUser.email,
      },
      headers: {
        "content-type": "application/json",
      },
    })
      .then((result) => {
        // console.log(result)
        // console.log(result.data);
        if (result.data.status == "pass") {
          setVisitorHistoryTableData(result.data.data);
        }
      })
      .catch((error) => console.log(error));
  };

  const bookService = (serviceData) => {
    let dataOfService = {
      owner_id: userResidentData.email,
      service_id: serviceData.id,
      service_name: serviceData.service_name,
      apt: userResidentData.apt,
      bldg: userResidentData.bldg,
    };
    axios({
      baseURL: BASE_URL,
      method: "post",
      url: BOOK_RESIDENT_SERVICE_REQ,
      data: dataOfService,
      headers: {
        "content-type": "application/json",
      },
    })
      .then((result) => {
        // console.log(result)
        console.log(result.data);
        if (result.data.status == "pass") {
          toast(result.data.message);
          getData();
        } else {
          toast(result.data.message);
        }
      })
      .catch((error) => console.log(error));
  };

  const approveVisitRequest = (visitData) => {
    let dataOfVisit = {
      owner_id: userResidentData.email,
      visit_request_id: visitData.id,
    };
    axios({
      baseURL: BASE_URL,
      method: "put",
      url: APPROVE_VISITOR_REQUEST,
      data: dataOfVisit,
      headers: {
        "content-type": "application/json",
      },
    })
      .then((result) => {
        // console.log(result)
        console.log(result.data);
        if (result.data.status == "pass") {
          toast(result.data.message);
          getVisitorData();
        } else {
          toast(result.data.message);
        }
      })
      .catch((error) => console.log(error));
  };

  const renderBookButton = (params) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: "auto" }}
          onClick={() => {
            console.log(params.row);
            bookService(params.row);
          }}
        >
          Book
        </Button>
      </strong>
    );
  };

  const renderApproveReqButton = (params) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: "auto" }}
          onClick={() => {
            console.log(params.row);
            // bookService(params.row);
            approveVisitRequest(params.row);
          }}
        >
          Approve
        </Button>
      </strong>
    );
  };

  const isFileImage = (file) => {
    const acceptedImageTypes = ["image/jpg", "image/jpeg", "image/png"];

    return file && acceptedImageTypes.includes(file["type"]);
  };

  const contributeToLunamar = async () => {
    if (uploadImageData && captionImage) {
      if (isFileImage(uploadImageData)) {
        setUploadImageButton(true);
        toast("We are uploading your photo, please wait!");
        const data = new FormData();
        data.append("file", uploadImageData);
        data.append("upload_preset", "lunamar_upload");
        data.append("cloud_name", "xxxxxxxxx");
        fetch("https://api.cloudinary.com/v1_1/xxxxxxxx/image/upload", {
          method: "post",
          body: data,
        })
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data);
            const formData1 = new FormData();
            formData1.append("image", data.secure_url);
            formData1.append("caption", captionImage);
            formData1.append(
              "resName",
              userResidentData.fname + " " + userResidentData.lname
            );
            formData1.append("resEmail", userResidentData.email);
            axios({
              baseURL: BASE_URL,
              method: "post",
              url: CONTRIBUTE_TO_LUNAMAR,
              data: formData1,
              headers: {
                "content-type": "multipart/form-data",
              },
            })
              .then((result) => {
                // console.log(result)
                console.log(result);
                if (result.data.status == "pass") {
                  setUploadImageButton(false);
                  toast(result.data.message);
                  setUploadImageData(null);
                  setCaptionImage("");
                } else {
                  setUploadImageButton(false);
                  toast(result.data.message);
                }
              })
              .catch((error) => {
                setUploadImageButton(false);
                console.log(error);
              });
          })
          .catch((err) => {
            setUploadImageButton(false);
            console.log(err);
          });
      } else {
        toast("File uploaded is not an image!")
      }
    } else {
      toast("Please enter caption and image!");
    }
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
          <h2 id="resident-services">Services</h2>
          <div className="services-tables-container">
            <div style={{ width: "100%" }}>
              <h4>Service List</h4>
              <CustomTable
                rows={serviceTableData ? serviceTableData : []}
                columns={columnsData.servicesResident(renderBookButton)}
                pageSize={5}
                rowHeight={70}
                width={"95%"}
                rowsPerPageOptions={[5]}
              />
            </div>
            <div style={{ width: "100%" }}>
              <h4>Service Requests</h4>
              <CustomTable
                rows={serviceReqTableData ? serviceReqTableData : []}
                columns={columnsData.service_req_resident}
                pageSize={5}
                rowHeight={70}
                width={"95%"}
                rowsPerPageOptions={[5]}
              />
            </div>
          </div>
        </div>
        <div className="residents-visitors-table-container">
          <h2 id="resident-visitors">My Visitors</h2>
          <div className="residents-visitors-table-container-inner">
            <div className="residents-visitors-table-container-inner-1">
              <h4>Visitor Requests</h4>
              <CustomTable
                rows={visitorReqTableData ? visitorReqTableData : []}
                columns={columnsData.residentRequestVisitor(
                  renderApproveReqButton
                )}
                pageSize={5}
                rowHeight={70}
                width={"95%"}
                rowsPerPageOptions={[5]}
              />
            </div>
            <div className="residents-visitors-table-container-inner-1">
              <h4>Visitor History</h4>
              <CustomTable
                rows={visitorHistoryTableData ? visitorHistoryTableData : []}
                columns={columnsData.residentVisitorHistory}
                pageSize={5}
                rowHeight={70}
                width={"95%"}
                rowsPerPageOptions={[5]}
              />
            </div>
          </div>
        </div>
        <div>
          <h2 id="resident-contribute">Contibute to Lunamar</h2>
          <div className="resident-page-file-upload-form-container">
            <div className="resident-page-file-upload-form-container-inner">
              <div className="form resident-photo-form">
                <label for="fname">Caption</label>
                <input
                  type="text"
                  id="caption"
                  name="caption"
                  placeholder="Enter your caption.."
                  value={captionImage}
                  onChange={(e) => setCaptionImage(e.target.value)}
                />

                <label for="lname">Upload Image</label>
                <input
                  type="file"
                  id="myFile"
                  name="filename"
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={(e) => setUploadImageData(e.target.files[0])}
                />

                <input
                  type="submit"
                  value="Upload"
                  disabled={uploadImageButton}
                  onClick={() => contributeToLunamar()}
                />
              </div>
            </div>
            <div className="resident-page-file-upload-form-container-inner">
              <img
                className="resident-upload-image"
                src={
                  uploadImageData
                    ? URL.createObjectURL(uploadImageData)
                    : Housing
                }
                alt=""
              />
            </div>
          </div>
        </div>
        <div>
          <div>
            <h2 id="resident-chat">Chat with Management</h2>
          </div>
          <ChatBox socket={socketState} username={username} room={room} />
        </div>
      </div>
    </Fragment>
  );
};

export default Resident;
