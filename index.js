const express = require("express");
const { ExpressPeerServer } = require("peer");
const http = require("http");
const cors = require("cors");

const app = express();
app.use(cors());

// Render otomatik port atar
const PORT = process.env.PORT || 9000;

const server = http.createServer(app);

const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: "/myapp",
  allow_discovery: true,
});

app.use("/peerjs", peerServer);

app.get("/", (req, res) => {
  res.send("Narrative Chain Server Calisiyor!");
});

// Render uyumasın diye ping atılacak adres
app.get("/health", (req, res) => {
  res.status(200).send("Ayaktayim!");
});

server.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda basladi.`);
});
