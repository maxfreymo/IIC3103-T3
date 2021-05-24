import React, {useState, useEffect} from 'react';
//import Socket from "./Socket";


function Flights({Socket}) {

    const [infoFlights, setInfo] = useState([]);

    const onPressSend = () => {
        Socket.emit("FLIGHTS");
      };

    useEffect (()=>{
        Socket.on('FLIGHTS', (data) => {
            console.log(data);
            setInfo([infoFlights, data]);
        })

    }, [infoFlights, Socket]);

    return (
        <div id="container"> 
            <button id="button-flight" onClick={onPressSend}> Solicitar Vuelos </button>
            <div id="info-flights">
                {infoFlights.map((e,i) => <div key={i}> <b>{e.plane}</b> </div>)}
            </div>
        </div>

)};

export default Flights;