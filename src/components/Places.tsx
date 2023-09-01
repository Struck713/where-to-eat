import Map from "./Map";
import { useMemo } from "react";
import dynamic from "next/dynamic";

export interface Place {
    name: string,
    description: string,
    distance: number,
    address: {
        street: string,
        city: string,
        state: string,
        zip: number,
    },
    geo: {
        longitude: number,
        latitude: number
    }
}

export interface PlaceViewProps { place: Place; };
export const PlaceView = ({ place: { name, description, address, geo: { longitude, latitude } } }: PlaceViewProps) => {

    const DynamicMap =  useMemo(() => dynamic(() => import("@/components/Map"), {
        loading: () => <p className="text-xs">Loading map..</p>,
        ssr: false
    }), []);

    return (
        <>
            <h1 className="text-2xl font-medium">You should eat at <span className="text-blue-600 hover:animate-pulse">{name}</span>!</h1>
            <p className="pb-3">{description}</p>
            <p className="pb-3 text-sm">
                {name}<br />
                {address.street}<br />
                {/* {address.line2} */}
                {address.city}, {address.state} {address.zip}
            </p>
            <div className="pb-3">
                <DynamicMap name={name} longitude={longitude} latitude={latitude} />
            </div>
        </>
    );
}