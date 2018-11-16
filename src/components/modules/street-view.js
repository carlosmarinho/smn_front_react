import React from 'react';
import ReactStreetview from 'react-streetview';
 
class StreetView extends React.Component {
 
    render() {
        // see https://developers.google.com/maps/documentation/javascript
        const googleMapsApiKey = 'AIzaSyARxd3kYMt1_pK1c3kTKj1k9iOCpupzN5Q';
 
        console.log("latitude: ", this.props.latitude);
        console.log("longitude: ", this.props.longitude)

        // see https://developers.google.com/maps/documentation/javascript/3.exp/reference#StreetViewPanoramaOptions
        const streetViewPanoramaOptions = {
            position: {lat: this.props.latitude, lng: this.props.longitude},
            pov: {heading: 100, pitch: 0},
            zoom: 1
        };

        console.log("streeeeeeeeeeeeet: ", streetViewPanoramaOptions);
 
        return (
            <div style={{
                width: '760px',
                height: '450px',
                backgroundColor: '#eeeeee'
            }}>
                <ReactStreetview
                    apiKey={googleMapsApiKey}
                    streetViewPanoramaOptions={streetViewPanoramaOptions}
                />
            </div>
        );
    }
}

export default StreetView;