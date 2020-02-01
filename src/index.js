const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const http = require("http");
const { setupWebSocket } = require("./webSocket");

const app = express();
const server = http.Server(app);

setupWebSocket(server);

mongoose.connect("mongodb://localhost:27017/omnistack10", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());

app.use(routes);

server.listen(3333);
