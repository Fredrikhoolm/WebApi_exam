import React, { useState } from "react";
import { useParams } from "react-router";
import { LoadingView } from "./LoadingView";
import { InputField } from "./InputField";
import { useLoading } from "./useLoading";
import { ErrorView } from "./ErrorView";

function EditUserForm({ user, onSubmit }) {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);

    async function submit(e) {
        onSubmit(e, { firstName, lastName, email });
    }

    return (
        <form onSubmit={submit}>
            <h1>Edit an existing User ({firstName})</h1>
            <InputField label={"firstName"} value={firstName} onChangeValue={setFirstName} />
            <InputField label={"lastName"} value={lastName} onChangeValue={setLastName} />
            <InputField label={"email"} value={email} onChangeValue={setEmail} />

            <button>Submit</button>
        </form>
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
