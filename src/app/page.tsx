"use client";

import { getPlaces } from "@/actions/places";
import Home from "@/components/Home";
import { Place, PlaceView } from "@/components/Places";
import { Link } from "@/components/Text";
import { Geolocation, useGeolocation } from "@/hooks/useGeolocation";
import { useState } from "react";

const Page = () => {

    const [loading, setLoading] = useState(false);
    const [place, setPlace] = useState<Place | null>(null); // [ places, setPlaces
    const { loading: loadingGeolocation, failed, location } = useGeolocation();

    const loadPlaces = async (location: Geolocation) => {
        setLoading(true)
        const places = await getPlaces(location.latitude, location.longitude);
        if (places) setPlace(places[Math.floor(places.length * Math.random())]);
        setLoading(false);
    }

    return (
        <>
            <main className="flex h-screen">
                <div className="m-auto">
                    <div className="bg-white mx-5 xl:mx-80 p-5 rounded-md drop-shadow-md">
                        {place ? <PlaceView place={place} /> : <Home />}
                        <FindPlaceButton loading={loadingGeolocation || loading} failed={failed} location={location} loadPlaces={loadPlaces} />
                    </div>
                </div>
            </main>
            <footer className="-my-6 text-sm float-right mx-2">
                Created by <Link href="https://nstruck.dev" target="_blank">Noah Struck</Link> using &#10084;
            </footer>
        </>

    )
};

interface FindPlaceButtonProps { loading: boolean, failed: boolean, location: Geolocation, loadPlaces: Function };
const FindPlaceButton = ({ loading, failed, location, loadPlaces }: FindPlaceButtonProps) => {
    if (loading) return <button className="p-2 bg-blue-600 text-white rounded-md" disabled>Loading...</button>;
    if (failed) return <button className="p-2 bg-red-500 text-white rounded-md transition ease-in-out duration-500 hover:bg-red-600">Failed to load location.</button>;
    return <button className="p-2 bg-blue-500 text-white rounded-md transition ease-in-out duration-500 hover:bg-blue-600" onClick={() => loadPlaces(location)}>Find me a place to eat!</button>;
}

export default Page;