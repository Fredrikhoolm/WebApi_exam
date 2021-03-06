import React from "react";
import { LoadingView } from "../Components/LoadingView";
import { Link } from "react-router-dom";
import { useLoading } from "../lib/useLoading";
import { ErrorView } from "../Components/ErrorView";

export function UserListPage({  userApi }) {
    const { data: user, error, loading, reload } = useLoading(
        async () => await userApi.listUser()
    );

    if (error) {
        return <ErrorView error={error} reload={reload} />;
    }

    if (loading || !user) {
        return <LoadingView />;
    }

    return (
        <>
            <h1 id="header-title">List user</h1>

            <div id="list-user">

            {user.map(({ id, firstName }) => (

                <li key={id}>
                    <Link to={`/user/${id}/edit`}>{firstName}</Link>
                </li>

            ))}
            </div>
        </>
    );
}
