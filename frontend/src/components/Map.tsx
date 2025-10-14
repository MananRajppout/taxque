"use client";

import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface MapComponentProps {
  latitude: number;
  longitude: number;
  description?: string;
  height?: string;
}

const MapComponent: React.FC<MapComponentProps> = ({
  latitude,
  longitude,
  description,
  height,
}) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<maplibregl.Map | null>(null);
  const markerRef = useRef<maplibregl.Marker | null>(null);
  const [mapHeight, setMapHeight] = useState("400px");

  useEffect(() => {
    const updateHeight = () => {
      if (height) {
        setMapHeight(height);
      } else if (window.innerWidth < 640) {
        setMapHeight("250px");
      } else if (window.innerWidth < 1024) {
        setMapHeight("300px");
      } else {
        setMapHeight("400px");
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [height]);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapInstance.current = new maplibregl.Map({
      container: mapContainer.current,
      style:
        "https://api.jawg.io/styles/jawg-dark.json?access-token=mm8Fby5IHniYBn6LudtCtxAYTJOplhRsn77BkcfxdmL0sBZ07835gPFUi31DECmE",
      center: [longitude, latitude],
      zoom: 12,
    });

    mapInstance.current.addControl(
      new maplibregl.NavigationControl({
        visualizePitch: true,
      }),
      "top-right"
    );

    mapInstance.current.addControl(
      new maplibregl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      }),
      "top-right"
    );

    return () => {
      mapInstance.current?.remove();
    };
  }, [latitude, longitude]);

  useEffect(() => {
    if (!mapInstance.current) return;

    markerRef.current?.remove();

    const markerElement = document.createElement("div");
    markerElement.className = "custom-marker";
    markerElement.style.width = window.innerWidth < 640 ? "20px" : "24px";
    markerElement.style.height = window.innerWidth < 640 ? "20px" : "24px";
    markerElement.style.backgroundImage = `url('/assets/images/locationIcon2.png')`;
    markerElement.style.backgroundSize = "contain";
    markerElement.style.backgroundRepeat = "no-repeat";
    markerElement.style.cursor = "pointer";

    markerRef.current = new maplibregl.Marker({ element: markerElement })
      .setLngLat([longitude, latitude])
      .setPopup(
        new maplibregl.Popup({ 
          offset: 25,
          closeButton: true,
          closeOnClick: false,
        }).setHTML(`
          <div style="padding: 8px; font-size: 14px; color: #333;">
            <strong>${description || "Location"}</strong>
          </div>
        `)
      )
      .addTo(mapInstance.current);

    markerRef.current.getPopup().addTo(mapInstance.current);

    setTimeout(() => {
      mapInstance.current?.resize();
    }, 100);
  }, [latitude, longitude, description]);

  return (
    <>
      <div
        ref={mapContainer}
        className="map-container"
        style={{ height: mapHeight }}
      />

      <style jsx>{`
        .map-container {
          width: 100%;
          position: relative;
          cursor: grab;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }

        .map-container:active {
          cursor: grabbing;
        }

        :global(.custom-marker) {
          transform: translate(-50%, -100%);
          transition: transform 0.3s ease;
        }

        :global(.custom-marker:hover) {
          transform: translate(-50%, -100%) scale(1.1);
        }

        :global(.maplibregl-popup-content) {
          border-radius: 8px;
          box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 8px;
        }

        :global(.maplibregl-popup-tip) {
          border-top-color: white;
        }

        :global(.maplibregl-ctrl-group) {
          border-radius: 6px;
          box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 6px;
        }

        :global(.maplibregl-ctrl-group button) {
          width: 32px;
          height: 32px;
        }

        @media (max-width: 640px) {
          .map-container {
            border-radius: 4px;
          }

          :global(.maplibregl-ctrl-group button) {
            width: 24px;
            height: 24px;
          }

          :global(.custom-marker) {
            width: 20px !important;
            height: 20px !important;
          }
        }

        @media (min-width: 641px) and (max-width: 1024px) {
          .map-container {
            border-radius: 6px;
          }

          :global(.custom-marker) {
            width: 22px !important;
            height: 22px !important;
          }
        }
      `}</style>
    </>
  );
};

export default MapComponent;