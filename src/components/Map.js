
import React, {useState, useEffect} from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
//import Socket from "./Socket";
// Mapbox - Interactive maps in React video

function Map({Socket}) {
    const [viewport, setViewport] = useState({
        latitude: -34.09,
        longitude: -64.48,
        width: '100%',
        height: '550px',
        zoom: 3
    });

    const [planeMarkers, setMarker] = useState([]);

    useEffect (()=>{
        Socket.on('POSITION', (data) => {
            let stop = 0;
            planeMarkers.map(function(marker) {
                if (marker.code === data.code){
                    stop=1;
                };
            })
            if (stop === 0){setMarker([...planeMarkers, data])};

        })

    }, [planeMarkers, Socket]);

    return (
        <div id='container'>
            <ReactMapGL 
                {...viewport} 
                mapboxApiAccessToken={"pk.eyJ1IjoibWF4ZnJleW1vIiwiYSI6ImNrb3pzc25kNjBhdnQydnJ0MjVzcTB3NjgifQ.f7YLAg8k3UJlbEEHCVnPLA"}
                mapStyle="mapbox://styles/maxfreymo/ckp1zuj9735wz17qkb6lhfpnd"
                onViewportChange={viewport => {
                    setViewport(viewport);
                }}
            > 
            {planeMarkers.map(plane => (
                <Marker
                    key={plane.code}
                    latitude={plane.position[0]}
                    longitude={plane.position[1]}
                >
                <button id='button-marker'> Plane </button>
                </Marker>
            ))}
            </ReactMapGL>
        </div>

    )};

export default Map;