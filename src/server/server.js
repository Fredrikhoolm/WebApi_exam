const express = require("express");
const path = require("path");
const cors = require("cors");

const userApi = require("./userApi");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.use(cors());


app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));
app.use("/api/user", userApi);

const wsServer = require("./websocket");
app.use("/api", require("./apiRouter"));

app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));
app.use((req, res, next) => {
    if (req.method === "GET" || !req.path.startsWith("/api")) {
        return res.sendFile(
            path.resolve(__dirname, "..", "..", "dist", "index.html")
        );
    }
    return next();
});

const server = app.listen(3000, () => {
    server.on("upgrade", (req, socket, head) => {
        wsServer.handleUpgrade(req, socket, head, (socket) => {
            wsServer.emit("connection", socket, req);
        });
    });
});
