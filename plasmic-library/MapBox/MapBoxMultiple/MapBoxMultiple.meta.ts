const MapBoxMultipleMeta = {
    section: "Map",
    displayName: "MapBoxMultiple",
    description: "carte avec plusieurs adresses MapBox",
    thumbnailUrl: "https://plasmic-api.agence-scroll.com/mapbox.png",
    type: "component",
    name: "MapBoxMultiple",
    props: {
        locations: {
            type: "array",
            section: "general",
            required: true,
            description: 'object { "address" : "6 rue du Bac...", "title": "Event 12" (displayed on hover), "slug": "/events/12" (slug to add from the base url of the current page) }'
        },
        centerAddress: {
            type: "string",
            section: "general",
            required: false
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
    importPath: "./components/MapBox/MapBoxMultiple/MapBoxMultiple",
}
export default MapBoxMultipleMeta;