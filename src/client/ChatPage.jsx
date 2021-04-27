import * as React from "react";
import { useEffect, useState } from "react";

export function ChatPage() {
    const [username, setUsername] = useState();
    if (!username) {
        return <ChatLoginPage onLogin={(username) => setUsername(username)} />;
    }

    return <ChatView username={username} />;
}

function ChatLoginPage({ onLogin }) {
    const [username, setUsername] = useState("");
    function handleSubmit(e) {
        e.preventDefault();
        onLogin(username);
    }
    return (
        <>
                <h1 id="login-header">Enter a chat name</h1>

            <form onSubmit={handleSubmit} id="login-chat-form">
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <button>Enter</button>
            </form>
        </>
    );
}

export function ChatView({ username }) {
    const [chatLog, setChatLog] = useState([]);
    const [message, setMessage] = useState("");
    const [ws, setWs] = useState();

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:3000");
        ws.onmessage = (event) => {
            console.log("message", event);
            const { message, id, username } = JSON.parse(event.data);
            setChatLog((chatLog) => [...chatLog, { message, id, username }]);
        };
        ws.onopen = (event) => {
            ws.send(
                JSON.stringify({
                    type: "login",
                    username,
                })
            );
        };
        setWs(ws);
    }, []);

    function handleSubmitMessage(e) {
        e.preventDefault();
        ws.send(
            JSON.stringify({
                type: "message",
                message: message,
            })
        );
        setMessage("");
    }

    return (
        <>
            <h1 id="login-header">Chat page</h1>
            <div id="chat">
                {chatLog.map(({ message, id, username }) => (
                    <div key={id}>
                        <strong>{username}: </strong>
                        {message}
                    </div>
                ))}
            </div>
            <div id="text-box-chat">
                <form onSubmit={handleSubmitMessage} >
                    <input
                        type="text"
                        autoFocus={true}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button>Send</button>
                </form>
            </div>
        </>
    );
}
