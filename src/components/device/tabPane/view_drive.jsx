import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import React, { useContext,  useState } from 'react';
import { context as DeviceContext } from "./../../../context/devices";
import * as deviceController from "./../../../controllers/devices";
import Typography from "@mui/material/Typography"




export default function EnhancedTable(props) {
    const [deviceState] = useContext(DeviceContext)

    const [state, setState] = useState({ loading: true, firstReqSent: false, segment: null, drive: null })

    if (state.drive === null) {
        setState({...state, drive: props.drive})
    }

    if (props.drive !== state.drive) {
        setState({...state, loading: true, firstReqSent: false, segment: null, drive: props.drive})
    }

    const dongle_id = props.dongleId;
    const drive_id = props.drive;
    const dongle = deviceState.dongles[dongle_id];
    console.log("view drive", dongle)
    console.log("drives", dongle.drives)
    if (!dongle || !dongle.drives) return (<p>loading</p>)

    if (state.segment === null) {
        // TODO Make this not run multiple times
        deviceController.getDriveSegments(dongle_id, dongle.drives[drive_id].identifier).then((res) => {
            console.log("my res", res.data)
            if (res.data === null) {
                setState({ ...state, loading: false, firstReqSent: true, segment: [] })
            } else {
                setState({ ...state, loading: false, firstReqSent: true, segment: res.data })
            }
            
        })

    }

// test




    const drive = dongle.drives[drive_id];





    let vehicle = "";
    let version = "";
    let gitRemote = "";
    let gitBranch = "";
    let gitCommit = "";
    let metadata = {};


    try {
        metadata = JSON.parse(drive.metadata);
        
        if (metadata['InitData']) {
            version = metadata['InitData']['Version'] || "Unknown";
            gitRemote = metadata['InitData']['GitRemote'] || "Unknown";
            gitBranch = metadata['InitData']['GitBranch'] || "Unknown";
            gitCommit = metadata['InitData']['GitCommit'] || "Unknown";
        }
        

        if (metadata['CarParams']) {
            if (metadata['CarParams']['CarName'] !== undefined) vehicle += (metadata['CarParams']['CarName'].toUpperCase()) + " ";
            if (metadata['CarParams']['CarFingerprint'] !== undefined) vehicle += (metadata['CarParams']['CarFingerprint'].toUpperCase())

        }
    } catch (exception) { console.log(exception) }

    //const directoryTree = dirTree(config.storagePath + device.dongle_id + "/" + dongleIdHash + "/" + driveIdentifierHash + "/" + drive.identifier);
    const directoryTree = state.segment;
    const driveUrl = "driveurl"
    var directorySegments = {};

    if (directoryTree) {
        for (var i in directoryTree.children) {
            // skip any non-directory entries (for example m3u8 file in the drive directory)
            if (directoryTree.children[i].type !== 'directory') continue;

            var segment = directoryTree.children[i].name;

            let logSegment = {}
            for (var c in directoryTree.children[i].children) {
                logSegment[directoryTree.children[i].children[c].name] = {
                    url: `${driveUrl}/${segment}/${directoryTree.children[i].children[c].name}`,
                    name: directoryTree.children[i].children[c].name,
                    fileSize: directoryTree.children[i].children[c].size

                }
            }

            directorySegments[segment] = logSegment;
        }

        console.log("output is", directorySegments)
    }




    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2, padding: '20px' }}>

                <Typography variant="body1"><b>Vehicle:</b> {vehicle}</Typography>
                <Typography variant="body1"><b>Version:</b> {version}</Typography>
                <Typography variant="body1"><b>gitRemote:</b> {gitRemote}</Typography>
                <Typography variant="body1"><b>gitBranch:</b> {gitBranch}</Typography>
                <Typography variant="body1"><b>gitCommit:</b> {gitCommit}</Typography>

                <Typography variant="body2"><b>Fingerprint: </b></Typography>



                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'small'}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell >Segment ID</TableCell>
                                <TableCell >File</TableCell>
                                <TableCell >File size</TableCell>
                                <TableCell >Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                directorySegments ? Object.keys(directorySegments).map((key, index) => {

                                    
                                        return Object.keys(directorySegments[key]).map((key1, index1) => (
                                            <TableRow hover>
                                                <TableCell >{key}</TableCell>
                                                <TableCell >{directorySegments[key][key1].name}</TableCell>
                                                <TableCell>{Math.round(directorySegments[key][key1].fileSize / 1024) + ' MiB'}</TableCell>

                                                <TableCell>
                                                    <Tooltip title="Open in new window">
                                                        <IconButton size="small" onClick={() => window.open(directorySegments[key][key1].url, "_blank")}>
                                                            <OpenInNewIcon fontSize="inherit" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>


                                            </TableRow>
                                      ))
                                    

                                }) : null
                            }

                        </TableBody>
                    </Table>
                </TableContainer>

            </Paper>
        </Box >
    );
}

/*

var dongleIdHash = crypto.createHmac('sha256', config.applicationSalt).update(device.dongle_id).digest('hex');
    var driveIdentifierHash = crypto.createHmac('sha256', config.applicationSalt).update(drive.identifier).digest('hex');

    var driveUrl = config.baseDriveDownloadUrl + device.dongle_id + "/" + dongleIdHash + "/" + driveIdentifierHash + "/" + drive.identifier + "/";

    var cabanaUrl = null;
    if (drive.is_processed) {
        cabanaUrl = config.cabanaUrl + '?retropilotIdentifier=' + device.dongle_id + '|' + dongleIdHash + '|' + drive.identifier + '|' + driveIdentifierHash + '&retropilotHost=' + encodeURIComponent(config.baseUrl) + '&demo=1"';
    }



    var response = `<html style="font-family: monospace">
                <head>
                    <link href="https://vjs.zencdn.net/7.11.4/video-js.css" rel="stylesheet" />
                    <script src="https://vjs.zencdn.net/7.11.4/video.min.js"></script>
                    <style>
                        .video-js .vjs-current-time,
                        .vjs-no-flex .vjs-current-time {
                          display: block;
                        }
                        .vjs-default-skin.vjs-paused .vjs-big-play-button {display: none;}
                    </style>
                </head>
                <body>
                <h2>Welcome To The RetroPilot Server Dashboard!</h2>
                <a href="/useradmin/device/` + device.dongle_id + `">< < < Back To Device ` + device.dongle_id + `</a>

                <br>
                <b>Car Parameters:</b>
                <a id="show-button" href="#" onclick="
                    document.getElementById('hide-button').style.display = 'inline';
                    document.getElementById('show-button').style.display = 'none';
                    document.getElementById('car-parameter-div').style.display = 'block';
                    return false;">Show</a>
                <a id="hide-button" style="display: none;" href="#" onclick="
                    document.getElementById('hide-button').style.display = 'none';
                    document.getElementById('show-button').style.display = 'inline';
                    document.getElementById('car-parameter-div').style.display = 'none';
                    return false;">Hide</a>

                    <br><pre id="car-parameter-div" style="display: none; font-size: 0.8em">` + JSON.stringify(metadata!=undefined && metadata['CarParams']!=undefined ? metadata['CarParams'] : {}, null, 2).replace(/\r?\n|\r/g, "<br>") + `</pre>
                <br>

                <b>Preview <span id="current_preview_segment"></span>:</b>
                `
                +(
                cabanaUrl ? `
                    <video id="drive_preview" class="video-js vjs-default-skin" controls width="480" height="386">
                        <source src="`+driveUrl+`/qcamera.m3u8" type='application/x-mpegURL'>
                    </video>
                    <script>
                    var player = videojs('drive_preview',
                    {
                        "controls": true, "autoplay": false, "preload": "auto",
                        "controlBar": {
                            "remainingTimeDisplay": false
                        }
                    }
                    );
                    player.on('timeupdate', function () {
                        var segment = get_current_segment_info(this);
                        document.getElementById('current_preview_segment').textContent='(Segment: '+segment[0]+' | '+segment[1]+'% - Timestamp: '+segment[2]+')';
                    });

                    function get_current_segment_info(obj, old_segment = null) {
                        var target_media = obj.tech().vhs.playlists.media();
                        if (!target_media) {
                            return [0, 0, 0];
                        }
                        var snapshot_time = obj.currentTime();
                        var segment;
                        var segment_time;
                        for (var i = 0, l = target_media.segments.length; i < l; i++) {
                            if (snapshot_time < target_media.segments[i].end) {
                                segment = target_media.segments[i];
                                break;
                            }
                        }

                        if (segment) {
                            segment_time = Math.max(0, snapshot_time - (segment.end - segment.duration));
                        } else {
                            segment = target_media.segments[0];
                            segment_time = 0;
                        }
                        if (segment) {
                            var uri_arr = segment.uri.split("/");
                            return [uri_arr[uri_arr.length-2], Math.round(100/segment.duration*segment_time), Math.round(snapshot_time)];
                        }
                        return [0, 0, Math.round(snapshot_time)];
                    }

                    </script>
                ` : `(avaiable after processing)`)
                +
                `
                <br>
                ` + (cabanaUrl ? '<a href="' + cabanaUrl + '" target=_blank><b>View Drive in CABANA</b></a>' : 'View Drive in CABANA') + `
                <br><br>
                <b>Files:</b><br>
                <table border=1 cellpadding=2 cellspacing=2>
                    <tr><th>segment</th><th>qcamera</th><th>qlog</th><th>fcamera</th><th>rlog</th><th>dcamera</th><th>processed</th><th>stalled</th></tr>
                `;


    var directorySegments = {};
    for (var i in directoryTree.children) {
        // skip any non-directory entries (for example m3u8 file in the drive directory)
        if (directoryTree.children[i].type != 'directory') continue;

        var segment = directoryTree.children[i].name;


        var qcamera = '--';
        var fcamera = '--';
        var dcamera = '--';
        var qlog = '--';
        var rlog = '--';
        for (var c in directoryTree.children[i].children) {
            if (directoryTree.children[i].children[c].name == 'fcamera.hevc') fcamera = '<a target="_blank" href="' + driveUrl + segment + '/' + directoryTree.children[i].children[c].name + '">' + directoryTree.children[i].children[c].name + '</a>';
            if (directoryTree.children[i].children[c].name == 'dcamera.hevc') fcamera = '<a target="_blank" href="' + driveUrl + segment + '/' + directoryTree.children[i].children[c].name + '">' + directoryTree.children[i].children[c].name + '</a>';
            if (directoryTree.children[i].children[c].name == 'qcamera.ts') qcamera = '<a target="_blank" href="' + driveUrl + segment + '/' + directoryTree.children[i].children[c].name + '">' + directoryTree.children[i].children[c].name + '</a>';
            if (directoryTree.children[i].children[c].name == 'qlog.bz2') qlog = '<a target="_blank" href="' + driveUrl + segment + '/' + directoryTree.children[i].children[c].name + '">' + directoryTree.children[i].children[c].name + '</a>';
            if (directoryTree.children[i].children[c].name == 'rlog.bz2') rlog = '<a target="_blank" href="' + driveUrl + segment + '/' + directoryTree.children[i].children[c].name + '">' + directoryTree.children[i].children[c].name + '</a>';
        }

        var isProcessed = '?';
        var isStalled = '?';

        const drive_segment = await models.__db.get('SELECT * FROM drive_segments WHERE segment_id = ? AND drive_identifier = ? AND dongle_id = ?', parseInt(segment), drive.identifier, device.dongle_id);

        if (drive_segment) {
            isProcessed = drive_segment.is_processed;
            isStalled = drive_segment.is_stalled;
        }

        directorySegments["seg-" + segment] = '<tr><td>' + segment + '</td><td>' + qcamera + '</td><td>' + qlog + '</td><td>' + fcamera + '</td><td>' + rlog + '</td><td>' + dcamera + '</td><td>' + isProcessed + '</td><td>' + isStalled + '</td></tr>';
    }

    var qcamera = '--';
    var fcamera = '--';
    var dcamera = '--';
    var qlog = '--';
    var rlog = '--';
    var isProcessed = '?';
    var isStalled = '?';

    for (var i = 0; i <= drive.max_segment; i++) {
        if (directorySegments["seg-" + i] == undefined) {
            response += '<tr><td>' + i + '</td><td>' + qcamera + '</td><td>' + qlog + '</td><td>' + fcamera + '</td><td>' + rlog + '</td><td>' + dcamera + '</td><td>' + isProcessed + '</td><td>' + isStalled + '</td></tr>';
        } else
            response += directorySegments["seg-" + i];
    }

    response += `</table>
                <br><br>
                <hr/>
                <a href="/useradmin/signout">Sign Out</a></body></html>`;

*/