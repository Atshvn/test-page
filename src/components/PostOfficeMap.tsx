"use client";

import { useEffect, useRef } from "react";
import { Map, MapMarker, MarkerContent, MarkerPopup, MapControls, useMap } from "@/components/ui/map";
import { MapPin, Phone } from "lucide-react";
import type { PostOffice } from "@/types";

interface PostOfficeMapProps {
  postOffices: PostOffice[];
  selectedOffice: PostOffice | null;
  onSelectOffice: (office: PostOffice) => void;
}

// Custom marker icon component (green pin)
function GreenPinIcon() {
  return (
    <div className="relative">
      <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 36C12 36 24 22.5 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 22.5 12 36 12 36Z"
          fill="#059669"
        />
        <circle cx="12" cy="12" r="6" fill="white" />
      </svg>
    </div>
  );
}

// Inner component that uses useMap hook
function MapContent({ postOffices, selectedOffice, onSelectOffice }: PostOfficeMapProps) {
  const { map } = useMap();
  const hasFlownToOffice = useRef(false);

  // Center map on selected office
  useEffect(() => {
    if (selectedOffice && selectedOffice.Lat && selectedOffice.Lng && map) {
      map.flyTo({
        center: [selectedOffice.Lng, selectedOffice.Lat],
        zoom: 15,
        duration: 1000,
      });
      hasFlownToOffice.current = true;
    }
  }, [selectedOffice, map]);

  return (
    <>
      <MapControls position="bottom-right" showZoom showLocate />
      
      {postOffices.map((office) => {
        if (!office.Lat || !office.Lng) return null;
        
        const isSelected = selectedOffice?.PostOfficeID === office.PostOfficeID;
        
        return (
          <MapMarker
            key={office.PostOfficeID}
            longitude={office.Lng}
            latitude={office.Lat}
            onClick={() => onSelectOffice(office)}
          >
            <MarkerContent>
              <GreenPinIcon />
            </MarkerContent>
            
            {isSelected && (
              <MarkerPopup className="min-w-[250px]">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-sm mb-1">{office.POName}</h3>
                      <p className="text-xs text-muted-foreground">{office.POAddress}</p>
                    </div>
                  </div>
                  
                  {office.POPhone && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      <span>{office.POPhone}</span>
                    </div>
                  )}
                </div>
              </MarkerPopup>
            )}
          </MapMarker>
        );
      })}
    </>
  );
}

// Custom map style với màu xanh nhạt (green tint)
const customLightStyle = "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json";

export default function PostOfficeMap({
  postOffices,
  selectedOffice,
  onSelectOffice,
}: PostOfficeMapProps) {
  return (
    <div className="w-full h-full rounded-lg overflow-hidden border">
      <Map
        center={[105.8542, 21.0285]} // Hanoi, Vietnam [lng, lat]
        zoom={6}
        theme="light"
        styles={{
          light: customLightStyle,
        }}
      >
        <MapContent 
          postOffices={postOffices}
          selectedOffice={selectedOffice}
          onSelectOffice={onSelectOffice}
        />
      </Map>
    </div>
  );
}
