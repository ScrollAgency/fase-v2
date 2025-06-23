"use client";
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

import Map, { Marker, NavigationControl, Popup, MapRef } from 'react-map-gl/mapbox';
import "mapbox-gl/dist/mapbox-gl.css";
import { IoMdPin } from "react-icons/io";

import { geocodeAddress } from '../geocoding';

import styles from '../MapBox.module.css';

interface Location {
    id: string;
    address: string;
    title: string;
    slug: string;
    description?: string;
    image?: string;
    startDate?: Date;
    endDate?: Date;
    price?: number;
}

interface MapBoxMultipleProps {
    locations: Location[];
    centerAddress?: string;
    mapStyle?: string;
    pin?: string;
    pinSize?: number;
    pinColor?: string;
    initialZoom?: number;
    className?: string;
    hideLogo?: boolean;
    onMarkerClick?: (marker: {
        latitude: number;
        longitude: number;
        address: string;
        title: string;
        slug: string;
        id?: string;
        description?: string;
        image?: string;
        startDate?: Date;
        endDate?: Date;
        price?: number;
    }) => void;
}

export default function MapBoxMultiple(props: MapBoxMultipleProps) {
    const mapRef = useRef<MapRef>(null);
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const [coordinates, setCoordinates] = useState<Array<{ latitude: number; longitude: number; address: string; title: string; slug: string }>>([]);
    const [centerCoordinates, setCenterCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);
    const [hoveredMarkerId, setHoveredMarkerId] = useState<string | null>(null);
    const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);

    const fetchCoordinates = async () => {
        try {
            const results = await Promise.all(
                props.locations.map(async (location) => {
                    const coords = await geocodeAddress(location.address);
                    return { 
                        ...coords, 
                        ...location,
                    };
                })
            );
            setCoordinates(results);

            if (props.centerAddress) {
                const centerCoords = await geocodeAddress(props.centerAddress);
                setCenterCoordinates(centerCoords);
            } else if (results.length > 0) {
                setCenterCoordinates({ latitude: results[0].latitude, longitude: results[0].longitude });
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCoordinates();
    }, [props.locations, props.centerAddress]);

    // Recenter map when coordinates change
    useEffect(() => {
        if (centerCoordinates && mapRef.current) {
            mapRef.current.flyTo({
                center: [centerCoordinates.longitude, centerCoordinates.latitude],
                duration: 1000
            });
        }
    }, [centerCoordinates]);

    return (
        <main className={`${styles.mainStyle} ${props.className}`}>
            {centerCoordinates && (
                <Map
                    ref={mapRef}
                    mapboxAccessToken={mapboxToken}
                    mapStyle={props.mapStyle || "mapbox://styles/mapbox/streets-v12"}
                    style={{width: "100%", height: "100%"}}
                    initialViewState={{ 
                        latitude: centerCoordinates.latitude, 
                        longitude: centerCoordinates.longitude, 
                        zoom: props.initialZoom || 10 
                    }}
                    maxZoom={20}
                    minZoom={3}
                    attributionControl={false}
                >
                    <NavigationControl 
                        position="bottom-right"
                        showCompass={true}
                        showZoom={true}
                    />
                    {coordinates.length > 0 && coordinates.map((coord, index) => (
                        <Marker 
                            key={`${coord.address}-${index}`}
                            latitude={coord.latitude} 
                            longitude={coord.longitude}
                        >
                            <div 
                                className={props.onMarkerClick ? "cursor-pointer" : ""}
                                onMouseEnter={() => setHoveredMarkerId(`${coord.address}-${index}`)}
                                onMouseLeave={() => setHoveredMarkerId(null)}
                                onClick={() => {
                                    setSelectedMarkerId(`${coord.address}-${index}`);
                                    props.onMarkerClick && props.onMarkerClick(coord);
                                }}
                            >
                                {props.pin ? (
                                    <img
                                        src={props.pin}
                                        alt={`pin ${coord.address}`}
                                        style={{width: props.pinSize || 30, height: props.pinSize || 30}}
                                    />
                                ) : (
                                    <IoMdPin 
                                        size={props.pinSize || 30} 
                                        color={selectedMarkerId === `${coord.address}-${index}` ? "#FCBF18" : (props.pinColor || "tomato")} 
                                    />
                                )}
                            </div>
                        </Marker>
                    ))}
                </Map>
            )}
        </main>
    );
} 