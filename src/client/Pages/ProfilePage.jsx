import * as React from "react";
import {useLoading} from "../useLoading";

export function ProfilePage({loadProfile}){
    const {loading, error, data} = useLoading( async () => await loadProfile());

    console.log(loadProfile)

    if(loading){
        return <div> Loading </div>
    }

    if(error){
        return (
            <div>
                <h1>An error occurred</h1>
                <div>{error.toString()}</div>
            </div>
        )
    }

    return ( <>
        <h1 id="header-title">Profile</h1>
        <div id="google-name">{data.name}</div>
        <div id="profile-p">
        {data.picture && <img src={data.picture}/>}
        </div>
           </> )

    }
