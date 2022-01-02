import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./header.css";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import HomeWorkIcon from "@mui/icons-material/HomeWork";

const Header = () => {
  const location = useLocation();
  const [loc, setLoc] = useState("/");
  const [r, setR] = useState("Resident");
  const [v, setV] = useState("Visitor");
  const [a, setA] = useState("Admin");
  const [m, setM] = useState("Manager");
  const history = useHistory();

  useEffect(() => {
    setLoc(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    switch (loc) {
      case "/resident":
      case "/resident/crud-resident":
        const resident = sessionStorage.getItem("residentUser");
        if (resident) {
          const jsonData = JSON.parse(resident);
          setR(jsonData.fname);
        }
        break;
      case "/visitor":
      case "/visitor/crud-visitor":
        const visitor = sessionStorage.getItem("visitorUser");
        if (visitor) {
          const jsonData = JSON.parse(visitor);
          setV(jsonData.fname);
        }
        break;
      case "/manager":
      case "/manager/crud-edit-page":
      case "/manager/crud-add-page":
      case "/manager/chat-user":
        const manager = sessionStorage.getItem("managerUser");
        if (manager) {
          const jsonData = JSON.parse(manager);
          setM(jsonData.fname);
        }
        break;
      case "/admin":
      case "/admin/crud-edit-page":
      case "/admin/crud-add-page":
        const admin = sessionStorage.getItem("adminUser");
        if (admin) {
          const jsonData = JSON.parse(admin);
          setA(jsonData.fname);
        }
        break;
      default:
        break;
    }
  }, [loc]);

  const logOut = () => {
    switch (loc) {
      case "/resident":
      case "/resident/crud-resident":
        sessionStorage.removeItem("residentUser");
        history.replace("/login-signup");
        break;
      case "/visitor":
      case "/visitor/crud-visitor":
        sessionStorage.removeItem("visitorUser");
        history.replace("/login-signup");
        break;
      case "/manager":
      case "/manager/crud-edit-page":
      case "/manager/crud-add-page":
      case "/manager/chat-user":
        sessionStorage.removeItem("managerUser");
        history.replace("/login-signup");
        break;
      case "/admin":
      case "/admin/crud-edit-page":
      case "/admin/crud-add-page":
        sessionStorage.removeItem("adminUser");
        history.replace("/login-signup");
        break;
      default:
        break;
    }
  };

  if (loc.includes("/resident") || loc.includes("/visitor")) {
    return (
      <nav>
        <div className="header">
          <div className="topnav" id="myTopnav">
            <div className="favicon">
              <a onClick={() => {}}>Lunamar Housing Society</a>
              <a class="resident-top-nav-message-label">
                {loc.includes("/resident") ? `Hey Resident ${r}!` : `Hey Visitor ${v}!`}{" "}
              </a>
            </div>
            <div>
              <a onClick={() => logOut()}>Logout</a>
              <a className="icon"></a>
            </div>
          </div>
        </div>
      </nav>
    );
  } else if (loc.includes("/manager") || loc.includes("/admin")) {
    return (
      <nav>
        <div className="header">
          <div className="topnav" id="myTopnav">
            <div className="favicon">
              <a onClick={() => {}}>
                {loc.includes("/admin") ? `Hey Admin ${a}!` : `Hey Manager ${m}!`}
              </a>
            </div>
            <div>
              <a onClick={() => logOut()}>Logout</a>
              <a className="icon"></a>
            </div>
          </div>
        </div>
      </nav>
    );
  } else {
    return (
      <nav>
        <div className="header">
          <div className="topnav" id="myTopnav">
            <div className="favicon">
              <HomeWorkIcon style={{ color: "white" }} />
              <a onClick={() => history.push("/")}>Lunamar Housing Society</a>
            </div>
            <div>
              <a onClick={() => history.push("/")}>Home</a>
              <a onClick={() => history.push("/about-us")}>About</a>
              <a onClick={() => history.push("/services")}>Services</a>
              <a onClick={() => history.push("/contact-us")}>Contact</a>
              <a onClick={() => history.push("/gallery")}>Gallery</a>
              <a onClick={() => history.push("/blog")}>Blog</a>
              <a onClick={() => history.push("/login-signup")}>
                Login|Register
              </a>
              <a className="icon"></a>
            </div>
          </div>
        </div>
      </nav>
    );
  }
};

export default Header;
