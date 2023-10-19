import { createContext, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider(props){

    const [userToken , serUserToken] = useState(null);
    const [userData , serUserData] = useState(null);

    return <UserContext.Provider value={{userToken , serUserToken , serUserData , userData}}>
        {props.children}
    </UserContext.Provider>
}
