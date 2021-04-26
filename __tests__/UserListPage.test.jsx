import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import {UserListPage} from "../src/client/UserListPage";

const userApi = {
    listUser: async () => [{ id: 1, firstName: "Fredrik" }],
};

describe("user list page", () => {
    it("show user on dom", async () => {
        const container = document.createElement("div");
        document.body.appendChild(container);
        await act(async () => {
            ReactDOM.render(
                <MemoryRouter>
                    <UserListPage userApi={userApi} />
                </MemoryRouter>,
                container
            );
        });

        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("li").textContent).toEqual(
            "Fredrik"
        );
    });
});
