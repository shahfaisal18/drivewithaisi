
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { RideStatus, Location } from '../types';

interface InteractiveMapProps {
  status?: RideStatus;
  pickup?: Location;
  dropoff?: Location;
  driverLocation?: { lat: number; lng: number };
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ status, pickup, dropoff, driverLocation }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize map
    const initialLat = pickup?.lat || 40.7128;
    const initialLng = pickup?.lng || -74.0060;
    
    mapRef.current = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false
    }).setView([initialLat, initialLng], 14);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(mapRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach(m => m.remove());
    markersRef.current = {};

    const createIcon = (color: string) => L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color: ${color}; width: 14px; height: 14px; border: 3px solid white; border-radius: 50%; box-shadow: 0 0 10px rgba(0,0,0,0.2);"></div>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7]
    });

    if (pickup) {
      markersRef.current.pickup = L.marker([pickup.lat, pickup.lng], { icon: createIcon('#4F46E5') })
        .addTo(mapRef.current)
        .bindPopup('Pickup');
    }

    if (dropoff) {
      markersRef.current.dropoff = L.marker([dropoff.lat, dropoff.lng], { icon: createIcon('#EF4444') })
        .addTo(mapRef.current)
        .bindPopup('Drop-off');
    }

    if (driverLocation || (status === RideStatus.ACCEPTED || status === RideStatus.ARRIVED)) {
      const dLat = driverLocation?.lat || (pickup ? pickup.lat - 0.005 : 40.71);
      const dLng = driverLocation?.lng || (pickup ? pickup.lng - 0.005 : -74.01);
      
      markersRef.current.driver = L.marker([dLat, dLng], { 
        icon: L.divIcon({
          className: 'driver-icon',
          html: `<div style="background-color: #10B981; width: 24px; height: 24px; border: 2px solid white; border-radius: 6px; display: flex; align-items: center; justify-content: center; transform: rotate(45deg); box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
                  <div style="transform: rotate(-45deg); color: white;">
                    <svg style="width: 14px; height: 14px;" fill="currentColor" viewBox="0 0 20 20"><path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /><path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1V9.414a1 1 0 00-.293-.707l-2-2A1 1 0 0017 6.414H14z" /></svg>
                  </div>
                </div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        }) 
      }).addTo(mapRef.current);
    }

    // Auto-fit bounds if we have both points
    if (pickup && dropoff) {
      const bounds = L.latLngBounds([pickup.lat, pickup.lng], [dropoff.lat, dropoff.lng]);
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    } else if (pickup) {
      mapRef.current.setView([pickup.lat, pickup.lng], 15);
    }

  }, [status, pickup, dropoff, driverLocation]);

  return <div ref={mapContainerRef} className="w-full h-full" />;
};

export default InteractiveMap;
