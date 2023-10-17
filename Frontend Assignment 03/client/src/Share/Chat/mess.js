// import React, { useState, useEffect, useRef } from "react";
// import socketIOClient from "socket.io-client";
// import './Chat.css'
// const host = "http://localhost:5001";

// function Chat() {
//   const [mess, setMess] = useState([]);
//   const [message, setMessage] = useState('');
//   const [id, setId] = useState();

//   const socketRef = useRef();
//   const messagesEnd = useRef();

//   useEffect(() => {
//     socketRef.current = socketIOClient.connect(host)

//     socketRef.current.on('getId', data => {
//       setId(data)
//     })

//     socketRef.current.on('sendDataServer', dataGot => {
//       setMess(oldMsgs => [...oldMsgs, dataGot.data])
//       scrollToBottom()
//     })

//     return () => {
//       socketRef.current.disconnect();
//     };
//   }, []);

//   const sendMessage = () => {
//     if(message !== null) {
//       const msg = {
//         content: message,
//         id: id
//       }
//       socketRef.current.emit('sendDataClient', msg)
//       setMessage('')
//     }
//   }

//   const scrollToBottom = () => {
//     messagesEnd.current.scrollIntoView({ behavior: "smooth" });
//   }

//   const handleChange = (e) => {
//     setMessage(e.target.value)
//   }

//   const onEnterPress = (e) => {
//     if(e.keyCode == 13 && e.shiftKey == false) {
//       sendMessage()
//     }
//   }

//     return (
//         <>
//                 <div>
//                     <div className="wrapper_chat">
//                         <div className="chat_messenger" onClick={onChat}>
//                             <svg x="0" y="0" width="60px" height="60px"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
//                                 <g>
//                                     <circle fill="#383838" cx="30" cy="30" r="30"></circle>
//                                     <svg x="10" y="10">
//                                         <g transform="translate(0.000000, -10.000000)" fill="#FFFFFF">
//                                             <g id="logo" transform="translate(0.000000, 10.000000)">
//                                                 <path d="M20,0 C31.2666,0 40,8.2528 40,19.4 C40,30.5472 31.2666,38.8
//                                         20,38.8 C17.9763,38.8 16.0348,38.5327 14.2106,38.0311 C13.856,37.9335 13.4789,37.9612
//                                         13.1424,38.1098 L9.1727,39.8621 C8.1343,40.3205 6.9621,39.5819 6.9273,38.4474 L6.8184,34.8894
//                                         C6.805,34.4513 6.6078,34.0414 6.2811,33.7492 C2.3896,30.2691 0,25.2307 0,19.4 C0,8.2528 8.7334,0
//                                         20,0 Z M7.99009,25.07344 C7.42629,25.96794 8.52579,26.97594 9.36809,26.33674 L15.67879,21.54734
//                                         C16.10569,21.22334 16.69559,21.22164 17.12429,21.54314 L21.79709,25.04774 C23.19919,26.09944
//                                         25.20039,25.73014 26.13499,24.24744 L32.00999,14.92654 C32.57369,14.03204 31.47419,13.02404
//                                         30.63189,13.66324 L24.32119,18.45264 C23.89429,18.77664 23.30439,18.77834 22.87569,18.45674
//                                         L18.20299,14.95224 C16.80079,13.90064 14.79959,14.26984 13.86509,15.75264 L7.99009,25.07344 Z">
//                                                 </path>
//                                             </g>
//                                         </g>
//                                     </svg>
//                                 </g>
//                             </g>
//                             </svg>
//                         </div>
//                     </div>
//                     {
//                         activeChat && (
//                             <div className='active_chat animate__animated animate__jackInTheBox'>
//                                 <div style={{ width: '100%' }}>
//                                     <div className="card card-bordered fix_boderChat">
//                                         <div className="card-header">
//                                             <h4 className="card-title"><strong>Customer Support</strong></h4> <a className="btn btn-xs btn-secondary" href="#">Let's Chat App</a>
//                                         </div>
//                                         <div className="ps-container ps-theme-default ps-active-y fix_scoll">
//                                             {
//                                                 message && message.map(value => (
//                                                     value.category === 'send' ? (
//                                                         <div className="media media-chat media-chat-reverse" key={value.id}>
//                                                             <div className="media-body">
//                                                                 <p>{value.message}</p>
//                                                             </div>
//                                                         </div>
//                                                     ) : (
//                                                         <div className="media media-chat" key={value.id}> <img className="avatar" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="..." />
//                                                             <div className="media-body" key={value.id}>
//                                                                 <p>ADMIN: {value.message}</p>
//                                                             </div>
//                                                         </div>
//                                                     )
//                                                 ))
//                                             }
//                                         </div>
//                                         <div className="publisher bt-1 border-light">
//                                             <img className="avatar avatar-xs" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="..." />
//                                             <input type="text" placeholder="Enter Message!" onChange={onChangeText} value={textMessage} />
//                                             <span className="publisher-btn file-group">
//                                                 <i className="fa fa-paperclip file-browser"></i>
//                                                 <input type="file" />
//                                             </span>
//                                             <a className="publisher-btn" href="#" data-abc="true">
//                                                 <i className="fa fa-smile"></i>
//                                             </a>
//                                             <a onClick={handlerSend} className="publisher-btn text-info" data-abc="true">
//                                                 <i className="fa fa-paper-plane"></i>
//                                             </a>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         )
//                     }
//                 </div>
//         </>
//     );
// }

// export default Chat;

import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import "./Chat.css";
import MessengerApi from "../../API/MessengerAPI";

const host = "http://localhost:5001";

function Chat() {
  const [mess, setMess] = useState([]);
  const [message, setMessage] = useState("");
  const [id, setId] = useState("");
  const [activeChat, setActiveChat] = useState(false); // Assuming you have an active chat state
  const [textMessage, setTextMessage] = useState(""); // Assuming you have textMessage state

  const socketRef = useRef();
  const messagesEnd = useRef();

  useEffect(async () => {
    const params = {
      id: localStorage.getItem("id_user"),
    };

    const response = await MessengerApi.getMessage(params);

    socketRef.current = socketIOClient.connect(host);

    socketRef.current.on("getId", (data) => {
      setId(data);
    });

    socketRef.current.on("sendDataServer", (dataGot) => {
      setMess((oldMsgs) => [...oldMsgs, dataGot.data]);
      scrollToBottom();
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message !== "") {
      const msg = {
        content: message,
        id: localStorage.getItem("id_user"),
        isAdmin: false,
      };
      socketRef.current.emit("sendDataClient", msg);
      setMessage("");
    }
  };

  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      sendMessage();
    }
  };

  const handlerSend = () => {
    if (textMessage !== "") {
      const value = {
        message: textMessage,
        id_user: id,
      };
      socketRef.current.emit("send_message", value);
      // You may want to clear the input here or handle the sent message as needed
      setTextMessage("");
    }
  };

  const onChangeText = (e) => {
    setTextMessage(e.target.value);
  };

  const onChat = () => {
    setActiveChat(!activeChat);
  };

  return (
    <>
      <div>
        <div className="wrapper_chat">
          <div className="chat_messenger" onClick={onChat}>
            <svg x="0" y="0" width="60px" height="60px">
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g>
                  <circle fill="#383838" cx="30" cy="30" r="30"></circle>
                  <svg x="10" y="10">
                    <g
                      transform="translate(0.000000, -10.000000)"
                      fill="#FFFFFF"
                    >
                      <g id="logo" transform="translate(0.000000, 10.000000)">
                        <path
                          d="M20,0 C31.2666,0 40,8.2528 40,19.4 C40,30.5472 31.2666,38.8
                                        20,38.8 C17.9763,38.8 16.0348,38.5327 14.2106,38.0311 C13.856,37.9335 13.4789,37.9612
                                        13.1424,38.1098 L9.1727,39.8621 C8.1343,40.3205 6.9621,39.5819 6.9273,38.4474 L6.8184,34.8894
                                        C6.805,34.4513 6.6078,34.0414 6.2811,33.7492 C2.3896,30.2691 0,25.2307 0,19.4 C0,8.2528 8.7334,0
                                        20,0 Z M7.99009,25.07344 C7.42629,25.96794 8.52579,26.97594 9.36809,26.33674 L15.67879,21.54734
                                        C16.10569,21.22334 16.69559,21.22164 17.12429,21.54314 L21.79709,25.04774 C23.19919,26.09944
                                        25.20039,25.73014 26.13499,24.24744 L32.00999,14.92654 C32.57369,14.03204 31.47419,13.02404
                                        30.63189,13.66324 L24.32119,18.45264 C23.89429,18.77664 23.30439,18.77834 22.87569,18.45674
                                        L18.20299,14.95224 C16.80079,13.90064 14.79959,14.26984 13.86509,15.75264 L7.99009,25.07344 Z"
                        ></path>
                      </g>
                    </g>
                  </svg>
                </g>
              </g>
            </svg>
          </div>
        </div>
        {activeChat && (
          <div className="active_chat animate__animated animate__jackInTheBox">
            <div style={{ width: "100%" }}>
              <div className="card card-bordered fix_boderChat">
                <div className="card-header">
                  <h4 className="card-title">
                    <strong>Customer Support</strong>
                  </h4>{" "}
                  <a className="btn btn-xs btn-secondary" href="#">
                    Let's Chat App
                  </a>
                </div>
                <div className="ps-container ps-theme-default ps-active-y fix_scoll">
                  {mess.map((value, index) =>
                    value.category === "send" ? (
                      <div
                        className="media media-chat media-chat-reverse"
                        key={index}
                      >
                        <div className="media-body">
                          <p>{value.message}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="media media-chat" key={index}>
                        {" "}
                        <img
                          className="avatar"
                          src="https://img.icons8.com/color/36/000000/administrator-male.png"
                          alt="..."
                        />
                        <div className="media-body">
                          <p>ADMIN: {value.message}</p>
                        </div>
                      </div>
                    )
                  )}
                </div>
                <div className="publisher bt-1 border-light">
                  <img
                    className="avatar avatar-xs"
                    src="https://img.icons8.com/color/36/000000/administrator-male.png"
                    alt="..."
                  />
                  <input
                    type="text"
                    placeholder="Enter Message!"
                    onChange={onChangeText}
                    value={textMessage}
                  />
                  <span className="publisher-btn file-group">
                    <i className="fa fa-paperclip file-browser"></i>
                    <input type="file" />
                  </span>
                  <a className="publisher-btn" href="#" data-abc="true">
                    <i className="fa fa-smile"></i>
                  </a>
                  <button
                    onClick={handlerSend}
                    className="publisher-btn text-info"
                    data-abc="true"
                    disabled={!textMessage}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Chat;


// io.on("connection", (socket) => {
//   console.log("New client connected : " + socket.id);

//   socket.emit("getId", socket.id);

//    // Server nhận key "send_message" với value "data" do người dùng gửi lên
//   socket.on("send_message", async (data) => {
//     console.log("Mess: " + data.message);

//     // Tạo một tin nhắn mới
//     const newData = {
//       id_user: data.id,
//       message: data.message,
//       isAdmin: data.isAdmin
//     };

//     try {
//       // Tìm phòng chat tương ứng với người dùng và cập nhật tin nhắn
//       const rooms = await Rooms.findOneAndUpdate(
//         {
//           id_user: data.id,
//         },
//         {
//           $push: { content: newData },
//         },
//         { new: true }
//       );

//       if (!rooms) {
//         // Nếu phòng chat không tồn tại, tạo mới
//         const newRoom = new Rooms({
//           id_user: data.id,
//           content: [newData],
//         });
//         await newRoom.save();
//       }

//       // Gửi tin nhắn tới tất cả client trừ bản thân người gửi
//       socket.broadcast.emit("receive_message");
//     } catch (error) {
//       console.error(error);
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });


      {/* {message &&
                        message.map((value) =>
                          value.category === "send" ? (
                            <li
                              className="chat-item odd list-style-none mt-3"
                              key={value.id}
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
                        )} */}