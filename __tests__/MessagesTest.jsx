import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import { Messages } from "../src/client/messages";

const messageApi = {
    listMessages: async () => [{ id: 1, username: "Fredrik", message: "Velkommen" }],
};

describe("message list page", () => {
    it("show messages on dom", async () => {
        const container = document.createElement("div");
        document.body.appendChild(container);
        await act(async () => {
            ReactDOM.render(
                <MemoryRouter>
                    <Messages messageApi={messageApi} />
                </MemoryRouter>,
                container
            );
        });

        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("p").textContent).toEqual(
            "User: Fredrik " + "Message:Velkommen"
        );
    });
});