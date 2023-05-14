import React, { useEffect } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'

const RectangleComponent = () => {
  const map = useMap()

  useEffect(() => {
    const rectangle = L.rectangle([[51.49, -0.08], [51.5, -0.06]], { color: '#ff7800', weight: 1 }).addTo(map)
    map.fitBounds(rectangle.getBounds())
  }, [map])

  return null
}

const MyMap = () => {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <RectangleComponent />
    </MapContainer>
  )
}

export default MyMap
