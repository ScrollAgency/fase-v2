const MapBoxMeta = {
    section: "🔖 Jam",
    displayName: "MapBox",
    description: "Magnifique carte MapBox",
    thumbnailUrl: "https://plasmic-api.agence-scroll.com/mapbox.png",
    type: "component",
    name: "MapBox",
    props: {
        mapStyle: "string",
        latitude: "number",
        longitude: "number",
        iconUrl: "imageUrl",
        searchAddress: "string",
        zoom: "number",
        businesses: {
            type: "object",
            defaultValue: [],
        },
    },
    importPath: "./components/others/MapBox/MapBox",
}
export default MapBoxMeta;