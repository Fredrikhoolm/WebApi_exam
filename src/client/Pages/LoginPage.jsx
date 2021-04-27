import * as React from "react";
import { fetchJSON } from "../lib/http";

export function randomString(length) {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmopqrstuvwxyz1234567890";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return result;
}

export function LoginPage({identityProvider}){
    const {discoveryURL, client_id} = identityProvider;

    async function handleLogin(){
        const {authorization_endpoint} = await fetchJSON(discoveryURL)

        const state = randomString(30);
        const loginState = { state };
        sessionStorage.setItem("loginState", JSON.stringify(loginState));


        const params = {
            response_type: "token",
            client_id,
            scope:"openid email profile",
            redirect_uri: window.location.origin + "/login/callback",
            state

        };
        window.location.href = authorization_endpoint + "?" + new URLSearchParams(params);
    }

    return (

        <>
        <h1 id="header-title">Login</h1>
        <button onClick={handleLogin} id="login-button">Login with a google account</button>
        </>

    )
}