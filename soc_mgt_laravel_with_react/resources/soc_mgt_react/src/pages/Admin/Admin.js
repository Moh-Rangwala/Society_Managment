import React, { Fragment, useState, useEffect } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import "./admin.css";
import CustomTable from "../../components/Table/Table";
import toast from "react-hot-toast";
import { Button } from "@material-ui/core";
import columns from "../../util/tableColumn";
import axios from "axios";
import {
  BASE_URL,
  DASHBOARD_ADMIN_MGR,
  GET_BUILDINGS_LIST,
  GET_GARDEN_POOL_LIST,
  GET_MANAGERS_LIST,
  GET_RESIDENT_VISITOR_LIST,
  GET_SERVICES_LIST,
  GET_SERVICE_REQUESTS_LIST,
} from "../../api/api";
import { storePageContentType } from "../../redux/actions/adminAction";

const Admin = ({}) => {
  const [content, setContent] = useState("home");
  const [pageContent, setPageContent] = useState(content);
  const [title, setTitle] = useState("ADMIN DASHBOARD");
  const [tableData, setTableData] = useState(null);
  const [columnData, setColumnData] = useState(null);
  const [addButton, setAddButton] = useState(false);
  const [bldgCount, setBldgCount] = useState("0");
  const [aptCount, setAptCount] = useState("0");
  const [residentCount, setResidentCount] = useState("0");
  const [visitorCount, setVisitorCount] = useState("0");
  const [managerCount, setManagerCount] = useState("0");
  const [gardenCount, setGardenCount] = useState("0");
  const [poolCount, setPoolCount] = useState("0");
  const [servicesCount, setServicesCount] = useState("0");
  const [serviceReqCount, setServiceReqCount] = useState("0");

  const history = useHistory();
  const [userAdminData, setUserAdminData] = useState(null);
  const dispatch = useDispatch();
  // const userDataREdux = useSelector((state) => state.auth.userData);
  useEffect(() => {
    const userData = sessionStorage.getItem("adminUser");
    if (userData) {
      setUserAdminData(JSON.parse(userData));
      axios({
        baseURL: BASE_URL,
        method: "get",
        url: DASHBOARD_ADMIN_MGR,
        headers: {
          "content-type": "application/json",
        },
      })
        .then((result) => {
          // console.log(result)
          const dashData = result.data;
          console.log('DASHBOARD DATA',result.data);
          setAptCount(dashData.bldgData[0].aptcount);
          setBldgCount(dashData.bldgData[0].bldgcount);
          setPoolCount(dashData.amenityData[1].count);
          setGardenCount(dashData.amenityData[0].count);
          setResidentCount(dashData.userData[2].count);
          setManagerCount(dashData.userData[1].count);
          setVisitorCount(dashData.userData[3].count);
          setServicesCount(dashData.servicesData[0].servicecount);
          setServiceReqCount(dashData.serviceReqData[0].servicereqcount);
        })
        .catch((error) => console.log(error));
    } else {
      history.replace("/login-signup");
      toast("Unauthorized Access!");
    }
  }, []);

  useEffect(() => {
    dispatch(storePageContentType(content));
    console.log(content);
  }, [content]);

  const renderEditButton = (params) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: "auto" }}
          onClick={() => {
            // console.log(params.row);
            history.push("/admin/crud-edit-page", {
              data: params.row, 
              role: 'admin'
            });
          }}
        >
          Edit
        </Button>
      </strong>
    );
  };

  const getData = (nameOfData) => {
    switch (nameOfData) {
      case "manager":
        axios({
          baseURL: BASE_URL,
          method: "get",
          url: GET_MANAGERS_LIST,
          headers: {
            "content-type": "application/json",
          },
        })
          .then((result) => {
            // console.log(result)
            console.log(result.data);
            setTableData(result.data.data);
          })
          .catch((error) => console.log(error));
        break;
      case "buildings":
        axios({
          baseURL: BASE_URL,
          method: "get",
          url: GET_BUILDINGS_LIST,
          headers: {
            "content-type": "application/json",
          },
        })
          .then((result) => {
            // console.log(result)
            // console.log(result.data);
            setTableData(result.data.data);
          })
          .catch((error) => console.log(error));
        break;
      case "services":
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
            setTableData(result.data.data);
          })
          .catch((error) => console.log(error));
        break;
      case "service-req":
        axios({
          baseURL: BASE_URL,
          method: "get",
          url: GET_SERVICE_REQUESTS_LIST,
          headers: {
            "content-type": "application/json",
          },
        })
          .then((result) => {
            // console.log(result)
            // console.log(result.data);
            setTableData(result.data.data);
          })
          .catch((error) => console.log(error));
        break;
      case "resident":
      case "visitor":
        axios({
          baseURL: BASE_URL,
          method: "get",
          url: GET_RESIDENT_VISITOR_LIST,
          headers: {
            "content-type": "application/json",
          },
          params: {
            role: nameOfData,
          },
        })
          .then((result) => {
            // console.log(result)
            // console.log(result.data);
            setTableData(result.data.data);
          })
          .catch((error) => console.log(error));
        break;
      case "garden":
      case "pool":
        axios({
          baseURL: BASE_URL,
          method: "get",
          url: GET_GARDEN_POOL_LIST,
          headers: {
            "content-type": "application/json",
          },
          params: {
            type: nameOfData,
          },
        })
          .then((result) => {
            // console.log(result)
            // console.log(result.data);
            setTableData(result.data.data);
          })
          .catch((error) => console.log(error));
        break;

      default:
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
                  setContent("home");
                  setTitle("DASHBOARD");
                }}
              >
                Home
              </MenuItem>
              <SubMenu title="Manage Manager">
                <MenuItem
                  onClick={() => {
                    setContent("managers");
                    setColumnData(columns.manager(renderEditButton));
                    setTitle("MANAGER TABLE");
                    getData("manager");
                    setAddButton(false);
                  }}
                >
                  Managers
                </MenuItem>
              </SubMenu>
              <SubMenu title="Manage Buildings">
                <MenuItem
                  onClick={() => {
                    setColumnData(columns.buildings(renderEditButton));
                    setContent("buildings");
                    setTitle("BUILDINGS TABLE");
                    getData("buildings");
                    setAddButton(true);
                  }}
                >
                  Buildings
                </MenuItem>
              </SubMenu>
              <SubMenu title="Manage Services">
                <MenuItem
                  onClick={() => {
                    setColumnData(columns.services(renderEditButton));
                    setContent("servicelist");
                    setTitle("SERVICES TABLE");
                    getData("services");
                    setAddButton(true);
                  }}
                >
                  Service List
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setColumnData(columns.service_req(renderEditButton));
                    setContent("servicereq");
                    setTitle("SERVICES REQUEST TABLE");
                    getData("service-req");
                    setAddButton(false);
                  }}
                >
                  Service Requests
                </MenuItem>
              </SubMenu>
              <SubMenu title="Residents and Visitors">
                <MenuItem
                  onClick={() => {
                    setColumnData(columns.resident(renderEditButton));
                    setContent("resident");
                    setTitle("RESIDENTS TABLE");
                    getData("resident");
                    setAddButton(false);
                  }}
                >
                  Manage Residents
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setColumnData(columns.visitor(renderEditButton));
                    setContent("visitor");
                    setTitle("VISITORS TABLE");
                    getData("visitor");
                    setAddButton(false);
                  }}
                >
                  Manage Visitors
                </MenuItem>
              </SubMenu>
              <SubMenu title="Manage Amenities">
                <MenuItem
                  onClick={() => {
                    setColumnData(columns.garden(renderEditButton));
                    setContent("garden");
                    setTitle("GARDENS TABLE");
                    getData("garden");
                    setAddButton(true);
                  }}
                >
                  Manage Gardens
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setColumnData(columns.pool(renderEditButton));
                    setContent("pools");
                    setTitle("POOLS TABLE");
                    getData("pool");
                    setAddButton(true);
                  }}
                >
                  Manage Pools
                </MenuItem>
              </SubMenu>
            </Menu>
          </ProSidebar>
        </div>
        <div className="admin-manager-content-container">
          {content == "home" ? (
            <section className="tab-content">
              <h2>{title}</h2>
              <div className="box-container">
                <div className="box blue">
                  <h2>Buildings</h2>
                  <h3>{bldgCount}</h3>
                </div>
                <div className="box blue">
                  <h2>Apartments</h2>
                  <h3>{aptCount}</h3>
                </div>
                <div className="box blue">
                  <h2>Residents</h2>
                  <h3>{residentCount}</h3>
                </div>
                <div className="box blue">
                  <h2>Visitors</h2>
                  <h3>{visitorCount}</h3>
                </div>
                <div className="box blue">
                  <h2>Managers</h2>
                  <h3>{managerCount}</h3>
                </div>
                <div className="box blue">
                  <h2>Services</h2>
                  <h3>{servicesCount}</h3>
                </div>
                <div className="box blue">
                  <h2>Service Requests</h2>
                  <h3>{serviceReqCount}</h3>
                </div>
                <div className="box blue">
                  <h2>Garden</h2>
                  <h3>{gardenCount}</h3>
                </div>
                <div className="box blue">
                  <h2>Pools</h2>
                  <h3>{poolCount}</h3>
                </div>
              </div>
            </section>
          ) : (
            <section className="tab-content">
              <div className="tab-content-container">
                <div className="tab-content-container-header-and-add-button">
                  <h2>{title}</h2>
                  {addButton ? (
                    <button
                      onClick={() => {
                        history.push("/admin/crud-add-page", {role: 'admin'});
                      }}
                      className="button-table-add"
                    >
                      Add
                    </button>
                  ) : null}
                </div>
                <div>
                  <CustomTable
                    rows={tableData ? tableData : []}
                    columns={columnData}
                    pageSize={5}
                    rowHeight={80}
                    height={550}
                    rowsPerPageOptions={[5]}
                  />
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Admin;
