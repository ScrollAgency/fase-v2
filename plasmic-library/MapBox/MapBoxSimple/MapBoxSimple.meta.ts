const MapBoxSimpleMeta = {
    section: "Map",
    displayName: "MapBoxSimple",
    description: "carte avec adresse MapBox",
    thumbnailUrl: "https://plasmic-api.agence-scroll.com/mapbox.png",
    type: "component",
    name: "MapBoxSimple",
    props: {
        address: {
            type: "string",
            section: "general",
            required: true
        },
        mapStyle: {
            type: "string",
            displayName: "style of the mapbox",
            description: "See this link for choosing a style : https://docs.mapbox.com/api/maps/styles/",
            section: "general",
            defaultValueHint: "mapbox://styles/mapbox/streets-v12",
            required: false
        },
        pin: {
            type: "imageUrl",
            displayName: "icon of the pin",
            section: "pin",
            required: false
        },
        pinSize: {
            type: "number",
            displayName: "size of the pin",
            section: "pin",
            defaultValueHint: 30,
            required: false
        },
        pinColor: {
            type: "string",
            displayName: "color of the pin",
            section: "pin",
            defaultValueHint: "tomato",
            required: false
        },
        initialZoom: {
            type: "number",
            displayName: "initial zoom on the map",
            section: "general",
            defaultValueHint: 10,
            required: false
        }
    },
    importPath: "./components/MapBox/MapBoxSimple/MapBoxSimple",
}
export default MapBoxSimpleMeta;