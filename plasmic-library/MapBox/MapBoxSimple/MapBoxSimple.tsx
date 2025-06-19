"use client";
import { useState } from 'react'

import Map, { Marker } from 'react-map-gl/mapbox';
import "mapbox-gl/dist/mapbox-gl.css";
import { IoMdPin } from "react-icons/io";

import { geocodeAddress } from '../geocoding';

import styles from '../MapBox.module.css';

// Définir les props pour le composant MapBox
interface MapBoxSimpleProps {
    address: string;
    mapStyle?: string;
    pin?: string;
    pinSize?: number;
    pinColor?: string;
    initialZoom?: number;
    className?: string;
     hideLogo?: boolean;
}

export default function MapBoxSimple( props: MapBoxSimpleProps) {
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);

    const setCoordinates = async () => {
        try {
            const result = await geocodeAddress(props.address.toString());
            setCoords(result);
        } catch (error) {
            console.error(error);
        }
    };

    setCoordinates();

    return (
        <main className={`${styles.mainStyle} ${props.className}`} >
            {coords &&
                <Map
                    mapboxAccessToken={mapboxToken}
                    mapStyle={props.mapStyle || "mapbox://styles/mapbox/streets-v12"}
                    style={{width: "100%", height: "100%"}}
                    initialViewState={{ latitude: coords.latitude, longitude: coords.longitude, zoom: props.initialZoom || 10 }}
                    maxZoom={20}
                    minZoom={3}
                    attributionControl={!props.hideLogo}
                >
                    <Marker latitude={coords.latitude} longitude={coords.longitude}>
                        <div
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
                        </div>
                    </Marker>
                </Map>
            }
        </main>
    );
}
