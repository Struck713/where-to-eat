import { useState } from "react";
import { Geolocation, useGeolocation } from "@/hooks/useGeolocation";
import Home from "@/components/Home";
import { Place, PlaceView } from "@/components/Places";

const Page = () => {

    const [place, setPlace] = useState<Place | null>(null); // [ places, setPlaces
    const { loading, failed, location } = useGeolocation();

    const loadPlaces = async (location: Geolocation) => {
        let places = await fetch("/api/places", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...location
            })
        }).then(res => res.json())
            .then(places => places as Place[])
            .catch(_ => null);

        if (places) setPlace(places[Math.floor(places.length * Math.random())]);
    }

    return (
        <main className="flex h-screen bg-blue-400">
            <div className="m-auto">
                <div className="bg-white ml-28 mr-28 p-5 rounded-md drop-shadow-md">
                    {place ? <PlaceView place={place} /> : <Home />}
                    <FindPlaceButton loading={loading} failed={failed} location={location} loadPlaces={loadPlaces} />
                </div>
            </div>
        </main>
    )
};

interface FindPlaceButtonProps { loading: boolean, failed: boolean, location: Geolocation, loadPlaces: Function };
const FindPlaceButton = ({ loading, failed, location, loadPlaces } : FindPlaceButtonProps) => {
    if (loading) return <p>Loading...</p>;
    if (failed) return <p className="text-red-400">Failed to load location.</p>;
    return <button className="p-2 bg-blue-500 text-white rounded-md transition ease-in-out duration-500 hover:bg-blue-600" onClick={() => loadPlaces(location)}>Find me a place to eat!</button>
}

export default Page;