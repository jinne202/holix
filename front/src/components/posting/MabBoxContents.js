import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
 
mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = 'pk.eyJ1Ijoic2Vva2h5ZW9uZGV2IiwiYSI6ImNrZ2FkbHZmOTAxbjQycXRpNDVyazk1czAifQ.ljJvsclBNaPsUiJWFSttYw';
 
export default class MabBoxContents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: -70.9,
            lat: 42.35,
            zoom: 9
        };
        this.mapContainer = React.createRef();
    }
    componentDidMount() {
        const { lng, lat, zoom } = this.state;
        const map = new mapboxgl.Map({
        container: this.mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom
    });
    
    map.on('move', () => {
        this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });
    }
    render() {
        const { lng, lat, zoom } = this.state;
        return (
            <div>
            <div ref={this.mapContainer} className="map-container" />
            </div>
        );
    }
}