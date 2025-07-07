"use client";
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import "mapbox-gl/dist/mapbox-gl.css";
import { IoMdPin } from "react-icons/io";

import { geocodeAddress } from '../geocoding';
import { coordToSupabase } from '../coordToSupabase';
import { Location } from '../interface';

import styles from '../MapBox.module.css';

const MapDynamic = dynamic(() => import('react-map-gl/mapbox').then(mod => mod.default), { ssr: false });
const MarkerDynamic = dynamic(() => import('react-map-gl/mapbox').then(mod => mod.Marker), { ssr: false });

// Définir les props pour le composant MapBox
interface MapBoxSimpleProps {
    location: Location;
    mapStyle?: string;
    pin?: string;
    pinSize?: number;
    pinColor?: string;
    initialZoom?: number;
    className?: string;
    apiTableAndParams?: string;
    hideLogo?: boolean;
}

export default function MapBoxSimple( props: MapBoxSimpleProps) {
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);

    useEffect(() => {
        if (
            typeof props.location.latitude === 'number' &&
            typeof props.location.longitude === 'number'
        ) {
            setCoords({
                latitude: props.location.latitude,
                longitude: props.location.longitude
            });
        } else {
            const setCoordinates = async () => {
                try {
                    const result = await geocodeAddress(props.location.address.toString());
                    setCoords(result);
                    if (props.apiTableAndParams) {
                        await coordToSupabase({
                            api_table_and_params: props.apiTableAndParams,
                            latitude: result.latitude,
                            longitude: result.longitude
                        });
                    }
                } catch (error) {
                    console.error(error);
                }
            };
            setCoordinates();
        }
    }, [props.location, props.apiTableAndParams]);

    return (
        <main className={`${styles.mainStyle} ${props.className}`} >
            {coords &&
                <MapDynamic
                    mapboxAccessToken={mapboxToken}
                    mapStyle={props.mapStyle || "mapbox://styles/mapbox/streets-v12"}
                    style={{width: "100%", height: "100%"}}
                    initialViewState={{ latitude: coords.latitude, longitude: coords.longitude, zoom: props.initialZoom || 10 }}
                    maxZoom={20}
                    minZoom={3}
                >
                    <MarkerDynamic latitude={coords.latitude} longitude={coords.longitude}>
                        <div
                            className="cursor-pointer"
                        >
                            {
                                (props.pin &&
                                    <img
                                        src={props.pin}
                                        alt={`pin ${props.location.address}`}
                                        style={{width:props.pinSize || 30, height: props.pinSize || 30}}
                                    />
                                )    
                                ||
                                <IoMdPin size={props.pinSize || 30} color={props.pinColor || "tomato"} />
                            }
                        </div>
                    </MarkerDynamic>
                </MapDynamic>
            }
        </main>
    );
}
