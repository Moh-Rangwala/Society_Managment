import React, { useState, useEffect, Fragment } from "react";
import { NavLink } from "react-router-dom";
import "./chatbox.css";
import { useLocation, useHistory } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { TextInput } from "./TextInput.js";
import { MessageLeft, MessageRight } from "./Message.js";
import ScrollToBottom from "react-scroll-to-bottom";
import moment from "moment";
import { ADD_CHAT_DATA, BASE_URL, GET_CHAT_DATA } from "../../api/api";
import axios from "axios";
import toast from "react-hot-toast";

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      width: "75%",
      height: "80vh",
      // maxWidth: "500px",
      maxHeight: "700px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative",
    },
    paper2: {
      width: "80vw",
      maxWidth: "500px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative",
    },
    container: {
      //   width: "700px",
      height: "80vh",
      display: "flex",
      //   alignItems: "center",
      justifyContent: "center",
    },
    messagesBody: {
      width: "calc( 100% - 20px )",
      margin: 10,
      overflowY: "scroll",
      height: "calc( 100% - 80px )",
    },
  })
);

const ChatBox = (props) => {
  const location = useLocation();
  const [loc, setLoc] = useState("/");
  const history = useHistory();
  const classes = useStyles();
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {}, []);

  const sendMessage = async () => {
    const currentDate = new Date(Date.now());
    const momentDate = moment(currentDate).format("lll");
    if (currentMessage !== "") {
      const messageData = {
        room: props.room,
        author: props.username,
        message: currentMessage,
        time: momentDate,
      };
      await axios({
        baseURL: BASE_URL,
        method: "post",
        url: ADD_CHAT_DATA,
        data: messageData,
        headers: {
          "content-type": "application/json",
        },
      })
        .then(async (result) => {
          // console.log(result)
          console.log(result.data);
          if (result.data.status == "pass") {
            // toast(result.data.message);
            await props.socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
          } else {
            toast("Message did not get sent!");
          }
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    props.socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [props.socket]);

  useEffect(async () => {
    if (props.room) {
      // console.log('rooom data',props.room);
      await axios({
        baseURL: BASE_URL,
        method: "get",
        url: GET_CHAT_DATA,
        params: {
          room: props.room,
        },
        headers: {
          "content-type": "application/json",
        },
      })
        .then((result) => {
          // console.log(result)
          console.log("chat data", result.data);
          setMessageList((list) => result.data.data);
        })
        .catch((error) => console.log(error));
    }
  }, [props.room]);

  return (
    <Fragment>
      <div className={classes.container}>
        <Paper className={classes.paper} zDepth={2}>
          <ScrollToBottom id="style-1" className={classes.messagesBody}>
            {messageList.map((messageContent, ind) => {
              // console.log(messageContent);
              if (props.username == messageContent.author) {
                return (
                  <div key={ind}>
                    <MessageRight
                      message={messageContent.message}
                      timestamp={messageContent.time}
                      displayName={messageContent.author}
                      avatarDisp={false}
                    />
                  </div>
                );
              } else
                return (
                  <div key={ind}>
                    <MessageLeft
                      message={messageContent.message}
                      timestamp={messageContent.time}
                      displayName={messageContent.author}
                      avatarDisp={true}
                    />
                  </div>
                );
            })}
          </ScrollToBottom>
          <TextInput
            onClickSend={() => sendMessage()}
            placeholder="Hey..."
            value={currentMessage}
            onChange={(event) => {
              // console.log(event.target.value);
              setCurrentMessage(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key == "Enter" && sendMessage();
            }}
          />
        </Paper>
      </div>
    </Fragment>
  );
};

export default ChatBox;
