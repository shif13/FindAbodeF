import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { FaMapMarkerAlt, FaHome, FaDirections } from 'react-icons/fa';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon issue with Leaflet + Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const PropertyMap = ({ latitude, longitude, address, title, city, state }) => {
  // Default to Mumbai if no coordinates
  const lat = latitude ? parseFloat(latitude) : 19.0760;
  const lng = longitude ? parseFloat(longitude) : 72.8777;

  const position = [lat, lng];

  // Custom marker icon (blue)
  const customIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const openInGoogleMaps = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank');
  };

  return (
    <div className="relative">
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: '400px', width: '100%', borderRadius: '8px' }}
        className="z-0"
      >
        {/* FREE OpenStreetMap tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <Marker position={position} icon={customIcon}>
          <Popup>
            <div className="p-2 min-w-[200px]">
              <div className="flex items-center gap-2 mb-2">
                <FaHome className="text-blue-600 text-lg" />
                <h3 className="font-semibold text-gray-900">{title}</h3>
              </div>
              <div className="flex items-start gap-2 mb-3">
                <FaMapMarkerAlt className="text-gray-500 mt-1 flex-shrink-0" />
                <p className="text-sm text-gray-600">{address}</p>
              </div>
              <button
                onClick={openInGoogleMaps}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
              >
                <FaDirections />
                Get Directions
              </button>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      {/* Google Maps Link Button */}
      <button
        onClick={openInGoogleMaps}
        className="absolute top-3 right-3 z-10 bg-white shadow-lg px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium text-gray-700"
      >
        <FaDirections className="text-blue-600" />
        Directions
      </button>
    </div>
  );
};

export default PropertyMap;