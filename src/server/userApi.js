const express = require("express");
const userApi = express.Router();

const user = [
    {
        id: 1,
        firstName: "Fredrik",
        lastName: "Jensen",
        email: "fredrik@hotmail.com",
    },
    {
        id: 2,
        firstName: "Håvard",
        lastName: "Nes",
        email: "håvard@hotmail.com",
    },
];

userApi.get("", (req, res) => {
    console.log(user);
    res.json(user);
});

userApi.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const users = user.find((b) => b.id === id);
    res.json(users);
});

userApi.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = user.findIndex((b) => b.id === id);
    const { firstName, lastName, email } = req.body;
    user[userIndex] = { firstName, lastName, email, id };
    res.status(200).end();
});

userApi.post("", (req, res) => {
    const { firstName, lastName, email } = req.body;
    console.log(req.body);
    user.push({ firstName, lastName, email, id: user.length + 1 });
    res.status(201).end();
});

module.exports = userApi;