import { useContext } from "react";

import React from 'react'
import UserContext from "../context/UserContext";

function Profile() {
    const {user} = useContext(UserContext)
    console.log(user);
    if(!user) return <div> Please login</div>
    else return <div> Welcome: {user.username} </div>
}

export default Profile
