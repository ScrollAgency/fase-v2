const MapBoxSimpleMeta = {
    section: "Map",
    displayName: "MapBoxSimple",
    description: "carte avec adresse MapBox",
    thumbnailUrl: "https://plasmic-api.agence-scroll.com/mapbox.png",
    type: "component",
    name: "MapBoxSimple",
    props: {
        location: {
            type: "object",
            displayName: "address",
            description: "object { 'address' : '6 rue du Bac...', 'latitude': 48.8566, 'longitude': 2.3522 }",
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
        },
        apiTableAndParams: {
            type: "string",
            displayName: "Table name and params to update the row",
            description: "example : 'locations?location=eq.3 rue du bac, 75008 Filou-sur-Indre'"
        },
        hideLogo: {
            type: "boolean",
            displayName: "Hide Mapbox logo attribution",
            description: "Allows you to hide the Mapbox logo in the bottom right corner",
            section: "general",
            defaultValueHint: false,
            required: false
        }
    },
    importPath: "./components/MapBox/MapBoxSimple/MapBoxSimple",
}
export default MapBoxSimpleMeta;