
import * as ReactDOM from "react-dom";
import * as React from "react";
import { MemoryRouter } from "react-router";
import { act, Simulate } from "react-dom/test-utils";
import {EditUserPage} from "../src/client/EditUserPage";




async function renderForTest(child) {
    const container = document.createElement("div");
    await act(async () => {
        await ReactDOM.render(<MemoryRouter>{child}</MemoryRouter>, container);
    });
    return container;
}

describe("edit user page", () => {
    it("can show information about an existing user", async () => {
        const getUser = () => ({
            firstName: "Niklas",
            lastName: "Ellefsen",
            email: "niklas@ellefsen.no",
        });
        const container = await renderForTest(
            <EditUserPage userApi={{ getUser }} />
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("h1").textContent).toEqual(
            "Edit an existing User (Niklas)"
        );
    });

    it("can show loading screen", async () => {
        const getUser = () => new Promise((resolve) => {});
        const container = await renderForTest(
            <EditUserPage userApi={{ getUser }} />
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("div").textContent).toEqual("Loading ...");
    });

    it("can show error message", async () => {
        const getUser = () => {
            throw new Error("Failed to load");
        };
        const container = await renderForTest(
            <EditUserPage userApi={{ getUser}} />
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("div").textContent).toEqual(
            "An error occurredError: Failed to load"
        );
    });

    it("updates server on submit", async () => {
        const user = {
            firstName: "Niklas",
            lastName: "Ellefsen",
            email: "niklas@ellefsen.no",
        };
        const getUser = () => user;
        const updateUser = jest.fn();
        const container = await renderForTest(
            <EditUserPage userApi={{ getUser, updateUser }} />
        );
        Simulate.change(container.querySelector("input"), {
            target: { value: "Niklas" },
        });
        Simulate.submit(container.querySelector("form"));
        expect(updateUser).toBeCalledWith(undefined, {
            ...user,
            firstName: "Niklas",
        });
    });
});
