import React from "react";
import { useLoading } from "./useLoading";
import { ErrorView } from "./Components/ErrorView";
import { LoadingView } from "./Components/LoadingView";

export function Messages({ messageApi }) {
    const { data: messages, error, loading, reload } = useLoading(
        async () => await messageApi.listMessages()
    );

    if (error) {
        return <ErrorView error={error} reload={reload} />;
    }

    if (loading || !messages) {
        return <LoadingView />;
    }

    return (
        <>
            {messages.map(({ id, username, message }) => (
                <div key={id}>
                    <h3>To user:{id}</h3>
                    <p>
                        User: {username} Message:{message}
                    </p>
                </div>
            ))}
        </>
    );
}