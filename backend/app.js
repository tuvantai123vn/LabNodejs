const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const MongoDBStore = require("connect-mongodb-session")(session);
const cookieParser = require("cookie-parser");

const Rooms = require("./model/Rooms");

// Khởi tạo ứng dụng Express
const app = express();

// Tạo một HTTP server cho ứng dụng Express
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

const MONGODB_URI = `mongodb+srv://admin:admin@node-products.o0dvpt9.mongodb.net/E-commerce_website`;

app.use(cookieParser());

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

app.use(
  session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
    },
  })
);

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true,
};

app.use(cors(corsOptions));

// Sử dụng body-parser để phân tích các yêu cầu HTTP
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

// Định nghĩa các định tuyến
const auth = require("./routes/auth");
const products = require("./routes/products");
const order = require("./routes/order");

const multer = require("multer");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    const originalName = file.originalname;
    const fileName = originalName.replace(/\s+/g, ""); // Remove spaces
    cb(null, fileName);
  },
});

const upload = multer({ storage: fileStorage });

app.use(upload.array("image"));

app.use("/auth", auth);

app.use("/products", products);

app.use("/order", order);

mongoose.connect(MONGODB_URI);

io.on("connection", (socket) => {
  console.log(`Có người vừa kết nối, socketID: ${socket.id}`);

  //Server nhận key send_message với value data do người dùng gửi lên
  socket.on("send_message", (data) => {

    //Sau đó nó sẽ update lại database bên phía người nhận
    //Vì 1 bên gửi 1 bên nhận nên id_user đôi ngược nhau và category cũng vậy
    const newData = {
      id: data.id,
      message: data.content,
      isAdmin: data.isAdmin,
    };

    const postData = async () => {
      const rooms = await Rooms.findOneAndUpdate(
        {
          id_user: data.id,
        },
        {
          $push: { content: newData },
        },
        { new: true }
      );

      if (!rooms) {
        // Nếu phòng chat không tồn tại, tạo mới
        const newRoom = new Rooms({
          id_user: data.id,
          name: data.name,
          content: [newData],
        });
        await newRoom.save();
      }
    };

    postData();
    //Xử lý xong server gửi ngược lại client thông qua socket với key receive_message
    socket.broadcast.emit("receive_message", );
  });

  // Server nhận key send_order với value data do người dùng gửi lên
  // Phần này dùng để xử lý bên admin history biết được có người vừa đặt hàng
  socket.on("send_order", (data) => {
    console.log(data);

    //Xử lý xong server gửi ngược lại client admin thông qua socket với key receive_order
    socket.broadcast.emit("receive_order", data);
  });
});

server.listen(5001, () => {
  console.log("server is running!!");
});
