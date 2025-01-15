import React, { useEffect, useState } from "react";
import axios from "axios";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

export default function MapComponent() {
  const [centerCoordinates, setCenterCoordinates] = useState({
    lat: 0,
    lng: 0,
  });
 

  // get real time address
  useEffect(() => {
    (async function () {
      
      try {
        // Geo coding api link
        let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${centerCoordinates.lat},${centerCoordinates.lng}&key=AIzaSyBKlduTqtTfTxhDFOcyY_V5bgUrE8wUZO0`;

        // let url = `https://nominatim.openstreetmap.org/reverse?lat=${centerCoordinates.lat}&lon=${centerCoordinates.lng}&format=json`
        const config = {
          headers: { "Content-Type": "multipart/form-data" },
        };

        const { data } = await axios.get(url, config);
     
      } catch (error) {
       
      }
    })();
  }, [centerCoordinates]);

  const handleCameraChange = (event) => {
    const newCenter = event.detail.center;

    //  swip map and get longitude and latitude real time
    if (newCenter) {
      setCenterCoordinates(newCenter);
    }
  };
 //  Get initial longitude and latitude
 useEffect(() => {
  
  const getLocation =((position)=>{
   setCenterCoordinates({
     lat: position.coords.latitude,
     lng: position.coords.longitude,
   });
  })
  const FailgetLocaton=()=>{
   alert("Allow Your Curent location")
  }
  navigator.geolocation.getCurrentPosition(getLocation ,FailgetLocaton  ) 
 // navigator.geolocation.getCurrentPosition((position ) => {
 //   setCenterCoordinates({
 //     lat: position.coords.latitude,
 //     lng: position.coords.longitude,
 //   });
  
 // });
}, []);
  return (
    <APIProvider
      apiKey={"AIzaSyBKlduTqtTfTxhDFOcyY_V5bgUrE8wUZO0"} // Make sure to replace with your valid API key
       
    >
      <div style={{ height: "400px", width: "100%" }}>
        {" "}
        {/* Added a wrapper for the map */}
        <Map
          className="map"
          // zoom={13}
          center={centerCoordinates}
          onCameraChanged={handleCameraChange}
        >
          <Marker
            position={centerCoordinates} // Set the position of the marker
            title="Center Marker" // Tooltip on hover
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
              scaledSize: { width: 30, height: 30 },
            }} // Custom icon URL and size
          />
        </Map>
      </div>
    </APIProvider>
  );
}
