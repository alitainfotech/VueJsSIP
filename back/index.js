const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const WebSocket = require("ws");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/welcome", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

// Listen on PORT
const port = process.env.SERVER_PORT || 4000;
app.listen(port, () => {
  console.log("Connected to port -" + port);
});

const wss = new WebSocket("ws://127.0.0.1:8080");

wss.on("error", console.error);

wss.on("open", function open() {
  console.log(">Opened");
});

/* wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("open", function open() {
    console.log(">Opened");wss
  })

  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });

  ws.send("something");
});
 */
