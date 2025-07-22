import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

const MapCard = (location:any, isLoading:any, absen:any, icon: any) => {
  return (
    <MapContainer center={[location.latitude, location.longitude]} zoom={16} style={{
      height: 432
    }} >
      <TileLayer
        url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
      />
      {
        (!isLoading && absen.lokasi) && <Marker position={[absen.lokasi.latitude, absen.lokasi.longitude]} icon={icon}  >
          <Popup>
            Lokasi Absen mu
          </Popup>
        </Marker>
      }

    </MapContainer>
  )
}

export default MapCard