import './App.css';
//import React, { useState, useEffect } from "react";
import Chat from "./components/Chat";
import Map from "./components/Map";
import InfoFlights from "./components/InfoFlights";
import 'mapbox-gl/dist/mapbox-gl.css';
import io from 'socket.io-client'

function App() {

  const Socket = io('wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl/',{
      path: '/flights'
    });

  return (
    <div>
      <h1> Socket App </h1>
        
      <div className='grid'>
        <Map Socket={Socket} />
        <Chat Socket={Socket} />
        <InfoFlights Socket={Socket} />
      </div>

    </div>

  );
}

export default App;

