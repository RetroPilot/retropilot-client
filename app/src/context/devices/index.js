import React, { createContext, useReducer, useEffect, useRef } from "react";
import * as deviceController from "./../../controllers/devices"

function process(state, action) {
    if (action.type !== "ADD_DATA") { return state }

    switch (action.data.command) {

        case "dongle_status":
            console.log("dongle:", action.data.data.dongle_id)
            return {
                ...state,
                dongles: {
                    ...state.dongles,
                    [action.data.data.dongle_id]: {
                        ...state.dongles[action.data.data.dongle_id],
                        online: action.data.data.online,
                        last_seen: action.data.data.time,
                        dongle_id: action.data.data.dongle_id
                    }
                }

            }

        case "get_drives": {



        }
        default:
            return state;
    }
}




export const Reducer = (state, action) => {
    console.log("input", state, action)
    switch (action.type) {
        case 'ADD_DATA':
            return process(state, action);
        case "fetch_all_dongles":
            console.log("fetch", action)

            return {
                ...state,
                dongles: action.data
            }

        case "update_dongle_drive":

            return {
                ...state,
                dongles: {
                    ...state.dongles,
                    [action.dongle_id]: {
                        ...state.dongles[action.dongle_id],
                        drives: action.drives
                    }
                }
            }

        case "update_dongle_bootlogs":
            return {
                ...state,
                dongles: {
                    ...state.dongles,
                    [action.dongle_id]: {
                        ...state.dongles[action.dongle_id],
                        boot: action.bootlogs
                    }
                }
            }

        case "update_dongle_crashlogs":
            return {
                ...state,
                dongles: {
                    ...state.dongles,
                    [action.dongle_id]: {
                        ...state.dongles[action.dongle_id],
                        crash: action.crashlogs
                    }
                }
            }


        default:
            return state;
    }
};




const initialState = {
    dongles: {}
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

        deviceController.getAllDevices().then((devices) => {
            console.log("store", devices)


            dispatch({ type: "fetch_all_dongles", data: devices })
        })

        return () => {
            try {
                ws.close();
            } catch (e) { }
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