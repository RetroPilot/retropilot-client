import axios from "axios";
import {context as DeviceContext} from "./../context/devices"



export async function updateDongleInfo(dongleId) {
    const req = await axios.get('https://localhost/realtime/dongle/c3a5d816/connected', {withCredentials: true});
    const responseData = req.data;

    return responseData.data

}

export async function athenaCommandControl(dongleId, command, params) {
    const req = await axios.get('https://localhost/realtime/dongle/c3a5d816/send/reboot', {withCredentials: true});
    const responseData = req.data;

    return responseData.data

}