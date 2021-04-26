import { BrowserRouter, Link } from "react-router-dom";
import { Route, Switch } from "react-router";
import { ProfilePage } from "./ProfilePage";
import * as React from "react";
import { ChatPage } from "./ChatPage";
import {CreateUserPage} from "./CreateUserPage";
import {fetchJSON, postJSON} from "./http";
import {UserListPage} from "./UserListPage";
import {EditUserPage} from "./EditUserPage";

export function Application() {

    const userApi = {
        listUser: async () => await fetchJSON("/api/user"),
        getUser: async (id) => await fetchJSON(`/api/user/${id}`),
        createUser: async ({ firstName, lastName, email }) => {
            return postJSON("/api/user", {
                method: "POST",
                json: { firstName, lastName, email },
            });
        },
        updateUser: async (id, { firstName, lastName, email }) =>
            postJSON(`/api/user/${id}`, {
                method: "PUT",
                json: { firstName, lastName, email },
            }),
    };


    return (
        <BrowserRouter>
            <header>
                <Link to={"/"}>Home</Link>
            </header>
            <Switch>
                <Route path={"/"} exact>
                    <h1>Home page</h1>
                    <ul>
                        <li>
                            <Link to={"/profile"}>Profile</Link>
                        </li>
                        <li>
                            <Link to={"/create"}>Create</Link>
                        </li>
                        <li>
                            <Link to={"/user"}>User</Link>
                        </li>
                        <li>
                            <Link to={"/login"}>Login</Link>
                        </li>
                        <li>
                            <Link to={"/chat"}>Chat</Link>
                        </li>

                    </ul>
                </Route>
                <Route path={"/profile"}>
                    <ProfilePage />
                </Route>
                <Route path={"/create"}>
                    <CreateUserPage userApi={userApi}/>
                </Route>
                <Route exact path={"/user"}>
                    <UserListPage userApi={userApi} />
                </Route>
                <Route path={"/user/:id/edit"}>
                    <EditUserPage userApi={userApi}/>
                </Route>
                <Route path={"/chat"}>
                    <ChatPage />
                </Route>
                <Route path={"/login"}>
                    <h1>Login page</h1>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}
