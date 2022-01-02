import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./chatmanager.css";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useSelector, useDispatch } from "react-redux";
import "react-pro-sidebar/dist/css/styles.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import ChatBox from "../../components/ChatBox/ChatBox";
import io from 'socket.io-client';

const ChatManager = ({}) => {
  const history = useHistory();
  // const socket = io.connect('http://localhost:3005');
  const [socketState, setSocketState] = useState(io.connect('http://localhost:3005'));
  const pageContentType = useSelector((state) => state.admin.pageContent);
  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");
  const userData = history.location.state ? history.location.state.data : null;
  const userRole = history.location.state ? history.location.state.role : null;
  const [message, SetMessage] = history.location.state ? history.location.state.role : null;

  useEffect(() => {
    // console.log(userData);
    let userTokenData = sessionStorage.getItem("managerUser");
    if(userTokenData == null) {
      history.replace("/login-signup");
      toast("Unauthorized Access!");
    } else {
      joinRoom()
    }
  }, []);

  const joinRoom = () => {
    socketState.emit("join_room", userData.email);
    setRoom(userData.email);
    setUsername("Manager")
  };

  return (
    <Fragment>
      <div className="admin-manager-main-container">
        <div className="admin-manager-side-menu-container">
          <ProSidebar style={{ width: "100%", height: "100%" }}>
            <Menu iconShape="square">
              <MenuItem
                onClick={() => {
                  history.replace(`/manager`);
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
                <h2>Chat with user</h2>
              </div>
              <ChatBox 
              socket={socketState} username={username} room={room}
              />
            </div>
          </section>
        </div>
      </div>
    </Fragment>
  );
};

export default ChatManager;
