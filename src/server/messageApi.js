const express = require("express");
const messageApi = express.Router();

const messages = [
    {
        id: 1,
        username: "Fredrik",
        message: "Velkommen",
    },
    {
        id: 2,
        username: "Håvard",
        message: "Tusen takk",
    },
];

messageApi.get("", (req, res) => {
    res.json(messages);
});

messageApi.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const message = messages.find((b) => b.id === id);
    res.json(message);
});

messageApi.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const messageIndex = messages.findIndex((b) => b.id === id);
    const { username, message } = req.body;
    messages[messageIndex] = { username, message, id };
    res.status(200).end();
});

messageApi.post("", (req, res) => {
    const { username, message } = req.body;
    console.log(req.body);
    messages.push({ username, message, id: messages.length + 1 });
    res.status(201).end();
});

module.exports = messageApi;