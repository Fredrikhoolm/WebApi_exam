import * as React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import {LoginPage} from "../src/client/Pages/LoginPage";


async function renderForTest(child) {
    const container = document.createElement("div");
    await act(async () => {
        await ReactDOM.render(<MemoryRouter>{child}</MemoryRouter>, container);
    });
    return container;
}

const googleIdentityProvider = {
    discoveryURL: "https://accounts.google.com/.well-known/openid-configuration",
    client_id:
        "905480636398-omo1hcghgtgmedidmcffvintfk3cvdm1.apps.googleusercontent.com",
};

describe("login page", () => {
    it("display login page", async () => {
        const container = await renderForTest(
            <LoginPage identityProvider={{ googleIdentityProvider }} />
        );
        expect(container.innerHTML).toMatchSnapshot();
    });
});