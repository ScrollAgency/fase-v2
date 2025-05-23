"use client";
import { useState } from 'react'

import Map, { Marker } from 'react-map-gl/mapbox';
import "mapbox-gl/dist/mapbox-gl.css";
import { IoMdPin } from "react-icons/io";

import { geocodeAddress } from './geocoding';

import styles from './MapBox.module.css';

// Définir les props pour le composant MapBox
interface MapBoxProps {
    address: string;
    mapStyle?: string;
    pin?: string;
    pinSize?: number;
    pinColor?: string;
    initialZoom?: number;
}

export default function MapBox( props: MapBoxProps) {
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);

    const setCoordinates = async () => {
        try {
            const result = await geocodeAddress(props.address);
            setCoords(result);
        } catch (error) {
            console.error(error);
        }
    };

    setCoordinates();

    return (
        <main className={styles.mainStyle}>
            {coords &&
                <Map
                    mapboxAccessToken={mapboxToken}
                    mapStyle={props.mapStyle || "mapbox://styles/mapbox/streets-v12"}
                    style={{width: "100%", height: "100%"}}
                    initialViewState={{ latitude: coords.latitude, longitude: coords.longitude, zoom: props.initialZoom || 10 }}
                    maxZoom={20}
                    minZoom={3}
                >
                    <Marker latitude={coords.latitude} longitude={coords.longitude}>
                        <button
                            type="button"
                            className="cursor-pointer"
                        >
                            {
                                (props.pin &&
                                    <img
                                        src={props.pin}
                                        alt={`pin ${props.address}`}
                                        style={{width:props.pinSize || 30, height: props.pinSize || 30}}
                                    />
                                )    
                                ||
                                <IoMdPin size={props.pinSize || 30} color={props.pinColor || "tomato"} />
                            }
                        </button>
                    </Marker>
                </Map>
            }
        </main>
    );
}
