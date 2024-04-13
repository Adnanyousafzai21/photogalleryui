import { createContext, useState } from "react";

export const context = createContext()

const AppWrapper = ({children})=>{

    const [isAuthorized, setIsAuthorized]= useState(false)
    const [user, setUser]= useState([])
    const [boxes, setBoxes]=useState([])
    const [createbox, setCreatebox]= useState(false)

    return (<context.Provider value={{isAuthorized, setIsAuthorized, user, setUser, boxes, setBoxes, createbox, setCreatebox}}>
{children}
    </context.Provider>)
}

export default AppWrapper