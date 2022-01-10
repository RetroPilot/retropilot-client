import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import GoogleMapReact from 'google-map-react';
import { Scrollbars } from 'react-custom-scrollbars';

import DrivesTable from './tabPane';

function DeviceLastSeenMap() {
  return (
    <div style={{ height: '500px', width: 'calc(100%)' }}>
      <GoogleMapReact
        height="100px"
        bootstrapURLKeys={{ key: process.env.REACT_APP_GMAPS_API_KEY }}
        defaultCenter={{
          lat: 51.501134,
          lng: -0.142318,
        }}
        defaultZoom={17}
        options={{
          styles: [
            { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
            { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
            { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#d59563' }],
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#d59563' }],
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{ color: '#263c3f' }],
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#6b9a76' }],
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{ color: '#38414e' }],
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#212a37' }],
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#9ca5b3' }],
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{ color: '#746855' }],
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#1f2835' }],
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#f3d19c' }],
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{ color: '#2f3948' }],
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#d59563' }],
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#17263c' }],
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#515c6d' }],
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{ color: '#17263c' }],
            },
          ],
        }}
      />
    </div>
  );
}

function DeviceData(props) {
  const { device } = props;

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      <Scrollbars autoHeightMin="100%" autoHeightMax="100%">
        <Grid container style={{ padding: 30 }}>
          <Grid item xs={12}>
            <DeviceLastSeenMap />
          </Grid>

          <Grid item xs={12}>
            <DrivesTable dongleId={device.dongle_id} />
          </Grid>
        </Grid>
      </Scrollbars>
    </div>
  );
}

DeviceData.propTypes = {
  device: PropTypes.shape({
    dongle_id: PropTypes.string.isRequired,
  }).isRequired,
};

export default DeviceData;
