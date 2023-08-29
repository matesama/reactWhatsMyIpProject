import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'


const Map = ({lat, lng}) => {
    const position = [lat, lng]
    
    return <div>
      <h2>That is your Location:</h2>
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ minHeight: "50vh", minWidth: "50vw" }}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={position}>
    <Popup>
     That is your  <br /> location!
    </Popup>
  </Marker>
</MapContainer>

    </div>;
}

export default Map;