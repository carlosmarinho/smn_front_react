import React from 'react';
import ReactStreetview from 'react-streetview';
 
class StreetView extends React.Component {
 
    render() {
        // see https://developers.google.com/maps/documentation/javascript
        const googleMapsApiKey = 'AIzaSyARxd3kYMt1_pK1c3kTKj1k9iOCpupzN5Q';
 
        
        let postion = {lat: parseFloat(this.props.latitude), lng: parseFloat(this.props.longitude)};

        // see https://developers.google.com/maps/documentation/javascript/3.exp/reference#StreetViewPanoramaOptions
        const streetViewPanoramaOptions = {
            position: postion,
            pov: {heading: 100, pitch: 0},
            zoom: 1
        };
 
        return (
            <div className="guia-google-maps" >
                <ReactStreetview
                    apiKey={googleMapsApiKey}
                    streetViewPanoramaOptions={streetViewPanoramaOptions}
                />
            </div>
        );
    }
}

export default StreetView;