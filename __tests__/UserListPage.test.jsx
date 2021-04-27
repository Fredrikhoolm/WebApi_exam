import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import {UserListPage} from "../src/client/UserListPage";


async function renderForTest(child) {
    const container = document.createElement("div");
    await act(async () => {
        await ReactDOM.render(<MemoryRouter>{child}</MemoryRouter>, container);
    });
    return container;
}

const userApi = {
    listUser: async () => [
        { id: 1, firstName: "Fredrik", lastName: "Holm", email: "fredrik@hotmail.com" },
    ],
};

describe("show user on page", () => {
    it("shows users in a list", async () => {
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

    it("can show error message", async () => {
        const listUser = () => {
            throw new Error("Failed to load");
        };
        const container = await renderForTest(
            <UserListPage userApi={{ listUser }} />
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("div").textContent).toEqual(
            "An error occurredError: Failed to load"
        );
    });
});