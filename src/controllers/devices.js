import { tableBodyClasses } from "@mui/material";
import axios from "axios";
import {context as DeviceContext} from "./../context/devices"



export async function getDrives(dongleId) {
    const req = await axios.get(`http://localhost/retropilot/0/device/${dongleId}/drives/false`, {withCredentials: true});
    return req.data
}

export async function getBootlogs(dongleId) {
    const req = await axios.get(`http://localhost/retropilot/0/device/${dongleId}/bootlogs`, {withCredentials: true});
    return req.data
}

export async function getCrashlogs(dongleId) {
    const req = await axios.get(`http://localhost/retropilot/0/device/${dongleId}/crashlogs`, {withCredentials: true});
    return req.data
}

export async function getAllDevices() {
    const req = await axios.get(`http://localhost/retropilot/0/devices`, {withCredentials: true});
    const responseData = req.data

    let dongles = {}

    if (responseData.success === true) {

        responseData.data.map((object)=>{

            dongles = {
                ...dongles,
                [object.dongle_id]: {
                    ...object,
                    online: false,
                    // Show when last connected to api instead Athena by default
                    last_seen: object.last_ping,
                }
            }

        })

        return dongles;

    }

    return null;
}  