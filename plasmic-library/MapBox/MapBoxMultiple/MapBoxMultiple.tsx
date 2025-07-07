"use client";
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

import Map, { Marker, NavigationControl, Popup, MapRef } from 'react-map-gl/mapbox';
import "mapbox-gl/dist/mapbox-gl.css";
import { IoMdPin } from "react-icons/io";

import { geocodeAddress } from '../geocoding';
import { coordToSupabase } from '../coordToSupabase';
import { Location } from '../interface';

import styles from '../MapBox.module.css';

interface MapBoxMultipleProps {
    locations: Location[];
    centerAddress?: string;
    mapStyle?: string;
    pin?: string;
    pinSize?: number;
    pinColor?: string;
    initialZoom?: number;
    className?: string;
    apiTableAndParams?: string;
}

export default function MapBoxMultiple(props: MapBoxMultipleProps) {
    const router = useRouter();
    const mapRef = useRef<MapRef>(null);
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const [coordinates, setCoordinates] = useState<Array<{ latitude: number; longitude: number; address: string; title: string; slug: string }>>([]);
    const [centerCoordinates, setCenterCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);
    const [hoveredMarkerId, setHoveredMarkerId] = useState<string | null>(null);

    const fetchCoordinates = async () => {
        try {
            const results = await Promise.all(
                props.locations.map(async (location) => {
                    let coords = { latitude: 0, longitude: 0};

                    if (
                        typeof location.latitude === 'number' &&
                        typeof location.longitude === 'number'
                    ) {
                        coords = {
                            latitude: location.latitude,
                            longitude: location.longitude
                        };
                    } else {
                        try {
                            const result = await geocodeAddress(location.address.toString());
                            coords = result;

                            if (props.apiTableAndParams) {
                                await coordToSupabase({
                                    api_table_and_params: `${props.apiTableAndParams}${location.address}`,
                                    latitude: result.latitude,
                                    longitude: result.longitude
                                });
                            }
                        } catch (error) {
                            console.error(error);
                        }
                    }
                    
                    return { ...coords, address: location.address, title: location.title, slug: location.slug };
                })
            );
            
            // Set the coordinates state with the results
            setCoordinates(results);

            if (props.centerAddress) {
                const centerCoords = await geocodeAddress(props.centerAddress);
                setCenterCoordinates(centerCoords);
            } else if (results.length > 0) {
                setCenterCoordinates({ latitude: results[0].latitude!, longitude: results[0].longitude! });
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

    const handleMarkerClick = (slug: string) => {
        if (slug && slug.length > 0) router.push(slug);
    };

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
                                className={coord.slug && coord.slug.length > 0 ? "cursor-pointer" : ""}
                                onMouseEnter={() => setHoveredMarkerId(`${coord.address}-${index}`)}
                                onMouseLeave={() => setHoveredMarkerId(null)}
                                onClick={() => handleMarkerClick(coord.slug)}
                            >
                                {props.pin ? (
                                    <img
                                        src={props.pin}
                                        alt={`pin ${coord.address}`}
                                        style={{width: props.pinSize || 30, height: props.pinSize || 30}}
                                    />
                                ) : (
                                    <IoMdPin size={props.pinSize || 30} color={props.pinColor || "tomato"} />
                                )}
                            </div>
                            {hoveredMarkerId === `${coord.address}-${index}` && (
                                <Popup
                                    latitude={coord.latitude}
                                    longitude={coord.longitude}
                                    closeButton={false}
                                    closeOnClick={false}
                                    anchor="bottom"
                                    offset={15}
                                >
                                    <div className="px-2 py-1 text-sm">
                                        <div className="font-semibold">{coord.title}</div>
                                    </div>
                                </Popup>
                            )}
                        </Marker>
                    ))}
                </Map>
            )}
        </main>
    );
} 