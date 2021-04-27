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

    return (<>

            <h1 id="create-header">Create new User</h1>

        <form onSubmit={submit} id="create-form">

            <InputField label={"First name"} value={firstName} onChangeValue={setFirstName} />
            <br/>
            <InputField label={"Last name"} value={lastName} onChangeValue={setLastName} />
            <br/>
            <InputField label={"Email"} value={email} onChangeValue={setEmail} />
            <br/>
            <button>Submit</button>
        </form>
        </>
    );
}
