const express = require("express");
const app = express();
const movieRouter = require("./routes/movie");
const userMiddleware = require("./middleware");
const err = require("./routes/404");
const cors = require("cors");
app.use(cors());

app.use(userMiddleware);

app.use("/api/movies", movieRouter);

app.use(err);

app.listen(4000, () => {
    console.log('server is running.....');
});
