import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import { FiLayout } from 'react-icons/fi';
 
mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = 'pk.eyJ1Ijoic2Vva2h5ZW9uZGV2IiwiYSI6ImNrZ2FkbHZmOTAxbjQycXRpNDVyazk1czAifQ.ljJvsclBNaPsUiJWFSttYw';
 
export default class MabBoxContents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: props.place ? props.place.x : 126.923778562273,
            lat: props.place ? props.place.y :37.5568707448873,
            zoom: 15,
            width:'100%',
            map : null,
            isResizing : false
        };
        this.mapContainer = React.createRef();
    }
    componentDidMount() {
        const { lng, lat, zoom } = this.state;
        this.setState({
            map : new mapboxgl.Map({
                container: this.mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [lng, lat],
                zoom: zoom,
                dragPan:false
            })
        })
    
        /*this.state.map.on('move', () => {
            this.setState({
                    lng: map.getCenter().lng.toFixed(4),
                    lat: map.getCenter().lat.toFixed(4),
                    zoom: map.getZoom().toFixed(2)
                });
            });*/
    }

    componentDidUpdate() {
        
        if (this.state.isResizing) {
            console.log("this.state.isResizing" + this.state.isResizing)
            this.state.map.resize();
            this.setState({
                isResizing : false
            })
        }
    }

    flyTo = (x,y) => {
        this.state.map.flyTo({
        center: [ x, y ],
        essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
        var marker = new mapboxgl.Marker()
        .setLngLat([x, y])
        .addTo(this.state.map);
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