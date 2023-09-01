import Map from "./Map";
import { Fragment, useMemo } from "react";
import dynamic from "next/dynamic";
import { JsxElement } from "typescript";

export interface Place {
    name: string,
    description: string,
    attributes: string[],
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
export const PlaceView = ({ place: { name, attributes, description, address, geo: { longitude, latitude } } }: PlaceViewProps) => {

    const DynamicMap =  useMemo(() => dynamic(() => import("@/components/Map"), {
        loading: () => <p className="text-xs">Loading map..</p>,
        ssr: false
    }), [ longitude, latitude ]);

    return (
        <>
            <h1 className="text-2xl font-medium">You should go to <span className="text-blue-600 hover:animate-pulse">{name}</span>!</h1>
            <p className="pb-3 text-xs">Tags: {formatList(attributes, (item) => <span key={item} className="text-blue-600 hover:animate-pulse">{item}</span>)}</p>
            {description && <p className="pb-3"><span className="text-blue-600 hover:animate-pulse">{name}</span> is &quot;{description}.&quot;</p>}
            <p className="pb-3">
                {name}, {address.street}, {address.city}, {address.state} {address.zip}
            </p>
            <div className="pb-3">
                <DynamicMap name={name} longitude={longitude} latitude={latitude} />
            </div>
        </>
    );
}

const formatList = (list: string[], consumer: (item: string) => (React.ReactNode | string)) => {
    list = list.filter(item => item !== "");

    if (!list || list.length == 0) return 'None.';
    if (list.length == 1) return consumer(list[0]);
    if (list.length == 2) return <>{consumer(list[0])} and {consumer(list[1])}</>;
    
    const nodeList = list.map(item => consumer(item));
    const lastItem = nodeList.pop();
    return <>
        {nodeList.reduce((prev, curr) => <>{prev}, {curr}</>)}, and {lastItem}
    </>;
}