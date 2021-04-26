import React, { useState } from "react";
import { InputField } from "./InputField";

export function CreateUserPage({ userApi: userApi }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    async function submit(e) {
        e.preventDefault();
        await userApi.createUser({ firstName, lastName, email });
    }

    return (
        <form onSubmit={submit}>
            <h1>Create new User</h1>
            <InputField label={"First name"} value={firstName} onChangeValue={setFirstName} />
            <InputField label={"Last name"} value={lastName} onChangeValue={setLastName} />
            <InputField label={"Email"} value={email} onChangeValue={setEmail} />

            <button>Submit</button>
        </form>
    );
}
