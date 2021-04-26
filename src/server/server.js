const express = require("express");
const path = require("path");
const cors = require("cors");
const fetch = require("node-fetch");
const userApi = require("./userApi");
const bodyParser = require("body-parser");
const app = express();

const discoveryURL = "https://accounts.google.com/.well-known/openid-configuration";

async function fetchJson(url, options) {
    const res = await fetch(url, options);
    if (!res.ok) {
        throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
    }
    return await res.json();
}

app.use(async (req, res, next) => {
    const Authorization = req.header("Authorization");
    if (Authorization) {
        const { userinfo_endpoint } = await fetchJson(discoveryURL);
        req.userinfo = await fetchJson(userinfo_endpoint, {
            headers: {
                Authorization,
            },
        });
    }
    next();
});

app.get("/api/profile", async (req, res) => {
    if (!req.userinfo) {
        return res.send(401);
    }
    return res.json(req.userinfo);
});


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
    console.log("Server started on http://localhost:3000");
});
