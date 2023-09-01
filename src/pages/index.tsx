import { useState } from "react";
import { Geolocation, useGeolocation } from "@/hooks/useGeolocation";
import Home from "@/components/Home";
import { Place, PlaceView } from "@/components/Places";

const Page = () => {

    const [ loading, setLoading ] = useState(false);
    const [place, setPlace] = useState<Place | null>(null); // [ places, setPlaces
    const { loading: loadingGeolocation, failed, location } = useGeolocation();

    const loadPlaces = async (location: Geolocation) => {
        setLoading(true);
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
        setLoading(false);
    }

    return (
        <main className="flex h-screen bg-blue-400">
            <div className="m-auto">
                <div className="bg-white ml-5 mr-5 md:mr-60 md:ml-60 p-5 rounded-md drop-shadow-md">
                    {place ? <PlaceView place={place} /> : <Home />}
                    <FindPlaceButton loading={loadingGeolocation || loading} failed={failed} location={location} loadPlaces={loadPlaces} />
                </div>
            </div>
        </main>
    )
};

interface FindPlaceButtonProps { loading: boolean, failed: boolean, location: Geolocation, loadPlaces: Function };
const FindPlaceButton = ({ loading, failed, location, loadPlaces } : FindPlaceButtonProps) => {
    if (loading) return <button className="p-2 bg-blue-600 text-white rounded-md" disabled>Loading...</button>;
    if (failed) return <button className="p-2 bg-red-500 text-white rounded-md transition ease-in-out duration-500 hover:bg-red-600">Failed to load location.</button>;
    return <button className="p-2 bg-blue-500 text-white rounded-md transition ease-in-out duration-500 hover:bg-blue-600" onClick={() => loadPlaces(location)}>Find me a place to eat!</button>;
}

export default Page;