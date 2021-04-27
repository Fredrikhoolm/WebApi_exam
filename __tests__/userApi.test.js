const request = require("supertest");

const express = require("express");

const app = express();
app.use(require("body-parser").json());
app.use(require("../src/server/userApi"));

describe("user API", () => {
    it("can return the predefined users", async () => {
        await request(app)
            .get("")
            .then((response) => {
                expect(response.body.find(({ id }) => id === 2)).toMatchObject({
                    firstName: "Håvard",
                });
            });
    });

    it("can create a new user", async () => {
        await request(app)
            .post("")
            .send({
                firstName: "Benjamin",
                lastName: "Giske",
                email: "benjamin@giske.no",
            })
            .expect(201);
        await request(app)
            .get("")
            .then((response) => {
                expect(response.body.map(({ firstName }) => firstName)).toContain("Benjamin");
            });
    });
});