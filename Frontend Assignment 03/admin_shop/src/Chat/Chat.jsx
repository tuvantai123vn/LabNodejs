import React, { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import MessengerAPI from "../API/MessengerAPI";
import "./Chat.css";
import axios from "axios";

const host = "http://localhost:5001";

function Chat() {
  const [message, setMessage] = useState([]);
  const [textMessage, setTextMessage] = useState("");
  const [roomlist, setRoomslist] = useState([]);
  const [load, setLoad] = useState(false);
  const [id, setid] = useState("");

  const socketRef = useRef();

  const onChangeText = (e) => {
    setTextMessage(e.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:5001/auth/mess/get/all");
        // Truy cập vào dữ liệu từ phản hồi Axios
        setRoomslist(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const fetchMessageData = async (value) => {
    try {
      const response = await MessengerAPI.getMessageId(value);
      setMessage(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handler_id_user = (value) => {
    connectToSocket();
    setid(value);
    fetchMessageData(value);
  };

  const connectToSocket = () => {
    socketRef.current = socketIOClient.connect(host);

    socketRef.current.on("receive_message", () => {
      setLoad(true);
    });

    return () => {
      socketRef.current.disconnect();
    };
  };

  const handlerSend = () => {
    if (socketRef.current && textMessage.trim() !== "") {
      const value = {
        content: textMessage,
        id: localStorage.getItem("id_user"),
        name: localStorage.getItem("name_user"),
        isAdmin: true,
      };
      socketRef.current.emit("send_message", value);
      setTextMessage("");
      setLoad(true);
    }
  };

  useEffect(() => {
    if (id) {
      fetchMessageData();
    }
    setLoad(false);
  }, [load]);

  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-7 align-self-center">
            <h4 className="page-title text-truncate text-dark font-weight-medium mb-1">
              Chat
            </h4>
            <div className="d-flex align-items-center">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb m-0 p-0">
                  <li
                    className="breadcrumb-item text-muted active"
                    aria-current="page"
                  >
                    Apps
                  </li>
                  <li
                    className="breadcrumb-item text-muted"
                    aria-current="page"
                  >
                    Chat
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="row no-gutters">
                <div className="col-lg-3 col-xl-2 border-right">
                  <div className="card-body border-bottom">
                    <form>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Search Contact"
                      />
                    </form>
                  </div>
                  <div
                    className="scrollable position-relative"
                    style={{ height: "calc(80vh - 100px)" }}
                  >
                    <ul className="mailbox list-style-none">
                      <li>
                        <div className="message-center">
                          {roomlist &&
                            roomlist?.map((value) => (
                              <a
                                key={value._id}
                                onClick={() => handler_id_user(value.id_user)}
                                className="message-item d-flex align-items-center border-bottom px-3 py-2 active_user"
                              >
                                <div className="user-img">
                                  {" "}
                                  <img
                                    src="https://img.icons8.com/color/36/000000/administrator-male.png"
                                    alt="user"
                                    className="img-fluid rounded-circle"
                                    width="40px"
                                  />{" "}
                                  <span className="profile-status away float-right"></span>
                                </div>
                                <div className="w-75 d-inline-block v-middle pl-2">
                                  <h6 className="message-title mb-0 mt-1">
                                    {value.name}
                                  </h6>
                                  <span className="font-12 text-nowrap d-block text-muted text-truncate">
                                    Online
                                  </span>
                                  <span className="font-12 text-nowrap d-block text-muted">
                                    9:08AM
                                  </span>
                                </div>
                              </a>
                            ))}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-9  col-xl-10">
                  <div
                    className="chat-box scrollable position-relative"
                    style={{ height: "calc(100vh - 111px)" }}
                  >
                    <ul className="chat-list list-style-none px-3 pt-3">
                      {message &&
                        message?.content?.map((value) =>
                          value.isAdmin ? (
                            <li
                              className="chat-item odd list-style-none mt-3 text-right"
                              key={value.id_user}
                            >
                              <div className="chat-content text-right d-inline-block pl-3">
                                <div className="box msg p-2 d-inline-block mb-1">
                                  You: {value.message}
                                </div>
                                <br />
                              </div>
                            </li>
                          ) : (
                            <li
                              className="chat-item list-style-none mt-3"
                              key={value.id}
                            >
                              <div className="chat-img d-inline-block">
                                <img
                                  src="https://img.icons8.com/color/36/000000/administrator-male.png"
                                  alt="user"
                                  className="rounded-circle"
                                  width="45"
                                />
                              </div>
                              <div className="chat-content d-inline-block pl-3">
                                <h6 className="font-weight-medium">
                                  {value.name}
                                </h6>
                                <div className="msg p-2 d-inline-block mb-1">
                                  {value.message}
                                </div>
                              </div>
                              <div className="chat-time d-block font-10 mt-1 mr-0 mb-3"></div>
                            </li>
                          )
                        )}
                    </ul>
                  </div>
                  <div className="card-body border-top">
                    <div className="row">
                      <div className="col-9">
                        <div className="input-field mt-0 mb-0">
                          <input
                            id="textarea1"
                            placeholder="Type and enter"
                            className="form-control border-0"
                            type="text"
                            onChange={onChangeText}
                            value={textMessage}
                          />
                        </div>
                      </div>
                      <div className="col-3">
                        <a
                          className="btn-circle btn-lg btn-cyan float-right text-white"
                          onClick={handlerSend}
                        >
                          <i className="fas fa-paper-plane"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer text-center">
        All Rights Reserved by Adminmart. Designed and Developed by{" "}
        <a href="https://www.facebook.com/KimTien.9920/">Tien Kim</a>.
      </footer>
    </div>
  );
}

export default Chat;
