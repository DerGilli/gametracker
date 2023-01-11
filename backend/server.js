const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/games", require("./routes/gameRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/scores", require("./routes/scoreRoutes"));
app.use("/api/participants", require("./routes/participantRoutes"));
app.use("/api/sessions", require("./routes/sessionRoutes"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
