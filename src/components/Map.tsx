import { LatLngTuple } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';

interface MapProps { name: string, distance: number, longitude: number, latitude: number; };
const Map = ({ name, distance, longitude, latitude }: MapProps) => {
    const position: LatLngTuple = [latitude, longitude];
    return (
        <MapContainer 
            className="h-[200px] w-full relative"
            center={position} 
            zoom={15}
            zoomControl={false} 
            maxZoom={15}
            minZoom={15}
            dragging={false}
            doubleClickZoom={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Tooltip permanent>
                    <strong>{name}</strong><br />
                    {distance.toFixed(2)} mi. from you
                </Tooltip>
            </Marker>
        </MapContainer>
    )
};

export default Map;