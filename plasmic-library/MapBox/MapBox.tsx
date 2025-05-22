"use client";
import { useState } from 'react'

import Map, { Marker } from 'react-map-gl/mapbox';
import "mapbox-gl/dist/mapbox-gl.css";
import { IoMdAirplane } from "react-icons/io";

import { geocodeAddress } from './geocoding';

import styles from './MapBox.module.css';

// Définir les props pour le composant MapBox
interface MapBoxProps {
    address: string;
}

export default function MapBox({ address }: MapBoxProps) {
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);

    const setCoordinates = async () => {
        try {
            const result = await geocodeAddress(address);
            setCoords(result);
        } catch (error) {
            console.error(error);
        }
    };

    setCoordinates();

    return (
        <main className={styles.mainStyle}>
            <p>Helloqweqw</p>
            <p>{coords?.latitude}</p>
            {coords &&
                <Map
                    mapboxAccessToken={mapboxToken}
                    mapStyle="mapbox://styles/mapbox/streets-v12"
                    style={{width: 600, height: 400}}
                    initialViewState={{ latitude: coords.latitude, longitude: coords.longitude, zoom: 10 }}
                    maxZoom={20}
                    minZoom={3}
                >
                    <Marker latitude={coords.latitude} longitude={coords.longitude}>
                        <button
                            type="button"
                            className="cursor-pointer"
                        >
                            {<IoMdAirplane size={30} color="tomato" />}
                        </button>
                    </Marker>
                </Map>
            }
        </main>
    );
}
