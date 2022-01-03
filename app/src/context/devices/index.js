import React, { createContext, useReducer, useEffect, useRef } from "react";
import Reducer from './reducer'


const initialState = {

};



const socket = new WebSocket('ws://localhost:81');






const Store = ({ children }) => {
    console.log("STORE HAS BEEN RERENDERED")
    const [state, dispatch] = useReducer(Reducer, initialState);

    useEffect(() => {

        

        socket.addEventListener('message', function (event) {
            const data = JSON.parse(event.data)
    
            if (data.id) {
                dispatch({ type: "ADD_DATA", id: data.id, data: data })
            }
        });
    
        socket.addEventListener('open', function (event) {
            console.log("web socket connected")
        });
    });


    


    return (
        <context.Provider value={[state, dispatch]}>
            {children}
        </context.Provider>
    )
};

export const context = createContext(initialState);
export default Store;