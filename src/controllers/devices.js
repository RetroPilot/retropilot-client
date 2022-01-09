import axios from 'axios';

export async function getDrives(dongleId) {
  const req = await axios.get(`http://localhost/retropilot/0/device/${dongleId}/drives/false`, { withCredentials: true });
  return req.data;
}

export async function getBootlogs(dongleId) {
  const req = await axios.get(`http://localhost/retropilot/0/device/${dongleId}/bootlogs`, { withCredentials: true });
  return req.data;
}

export async function getCrashlogs(dongleId) {
  const req = await axios.get(`http://localhost/retropilot/0/device/${dongleId}/crashlogs`, { withCredentials: true });
  return req.data;
}

export async function getDriveSegments(dongleId, driveIdentifier) {
  const req = await axios.get(`http://localhost/retropilot/0/device/${dongleId}/drives/${driveIdentifier}/segment`, { withCredentials: true });
  return req.data;
}

export async function getAllDevices() {
  const req = await axios.get('http://localhost/retropilot/0/devices', { withCredentials: true });
  const responseData = req.data;

  if (!responseData.success) {
    return null;
  }

  // TODO: use array reduce
  const dongles = {};
  responseData.data.forEach((object) => {
    dongles[object.id] = {
      ...object,
      online: false,
      // Show when last connected to api instead Athena by default
      last_seen: object.last_ping,
    };
  });

  return dongles;
}
