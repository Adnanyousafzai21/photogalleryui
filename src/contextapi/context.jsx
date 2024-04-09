import { createContext, useState } from "react";

export const context = createContext()

const AppWrapper = ({children})=>{

    const [isAuthorized, setIsAuthorized]= useState(false)
    const [user, setUser]= useState([])

    return (<context.Provider value={{isAuthorized, setIsAuthorized, user, setUser}}>
{children}
    </context.Provider>)
}

export default AppWrapper