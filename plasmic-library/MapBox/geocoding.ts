export async function geocodeAddress(address: string) {
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

    const encodedAddress = encodeURIComponent(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${accessToken}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch geocoding data");
    }

    const data = await response.json();

    if (data.features.length === 0) {
        throw new Error("No results found for this address");
    }

    const [longitude, latitude] = data.features[0].center;

    return { latitude, longitude };
}