import React, { createContext, useReducer, useEffect, useRef } from "react";
import Reducer from './reducer'


const initialState = {

};








const Store = ({ children }) => {
    console.log("STORE HAS BEEN RERENDERED")
    const [state, dispatch] = useReducer(Reducer, initialState);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:81');    
    
        ws.onmessage = ({ data }) => {
            data = JSON.parse(data)
            console.log("Message")    
            if (data.id) {
                dispatch({ type: "ADD_DATA", id: data.id, data: data })
            }
        };
        return () => {
          try {
            ws.close();
          } catch (e) {}
        };
      }, []);

 


    


    return (
        <context.Provider value={[state, dispatch]}>
            {children}
        </context.Provider>
    )
};

export const context = createContext(initialState);
export default Store;