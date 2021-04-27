import React, { useState } from "react";
import { useParams } from "react-router";
import { LoadingView } from "../Components/LoadingView";
import { InputField } from "../Components/InputField";
import { useLoading } from "../lib/useLoading";
import { ErrorView } from "../Components/ErrorView";

function EditUserForm({ user, onSubmit }) {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);

    async function submit(e) {
        onSubmit(e, { firstName, lastName, email });
    }

    return (
        <>
            <div id="header-title">
            <h1>Edit an existing User ({firstName})</h1>
            </div>

        <div id="edit-form">
        <form onSubmit={submit}>
            <InputField label={"First name"} value={firstName} onChangeValue={setFirstName} />
            <br/>
            <InputField label={"Last name"} value={lastName} onChangeValue={setLastName} />
            <br/>
            <InputField label={"Email"} value={email} onChangeValue={setEmail} />
            <br/>
            <button>Submit</button>
        </form>
        </div>
        </>
    );
}

export function EditUserPage({ userApi }) {
    const { id } = useParams();

    const { data: user, loading, error, reload } = useLoading(
        async () => await userApi.getUser(id),
        [id]
    );

    async function handleSubmit(e, { firstName, lastName, email }) {
        e.preventDefault();
        await userApi.updateUser(id, { firstName, lastName, email  });
    }

    if (error) {
        return <ErrorView error={error} reload={reload} />;
    }

    if (loading || !user) {
        return <LoadingView />;
    }

    return <EditUserForm user={user} onSubmit={handleSubmit} />;
}
