const request = require("supertest");

const express = require("express");

const app = express();
app.use(require("body-parser").json());
app.use(require("../src/server/messageApi"));

describe("user API", () => {
    it("can return the predefined messages", async () => {
        await request(app)
            .get("")
            .then((response) => {
                expect(response.body.find(({ id }) => id === 1)).toMatchObject({
                    message: "Velkommen",
                });
            });
    });

    it("can create a new message", async () => {
        await request(app)
            .post("")
            .send({
                username: "Fredrik",
                message: "Velkomnmen",
            })
            .expect(201);
        await request(app)
            .get("")
            .then((response) => {
                expect(response.body.map(({ username }) => username)).toContain(
                    "Fredrik"
                );
            });
    });
});