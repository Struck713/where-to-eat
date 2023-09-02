import Map from "./Map";
import { Fragment, useMemo } from "react";
import dynamic from "next/dynamic";
import { JsxElement } from "typescript";
import { Highlight, Link } from "./Text";

export interface Place {
    name: string,
    description: string,
    tags: string[],
    website: string,
    amenity: string,
    attributes: {
        delivery: boolean,
        takeaway: boolean,
        driveThrough: boolean,
        smoking: boolean,
        wheelchair: boolean,
    },
    address: {
        street: string,
        city: string,
        state: string,
        zip: number,
    },
    geo: {
        distance: number,
        longitude: number,
        latitude: number
    }
}

export interface PlaceViewProps { place: Place; };
export const PlaceView = ({ place: { name, description, website, tags, amenity, attributes, address, geo: { distance, longitude, latitude } } }: PlaceViewProps) => {

    const DynamicMap =  useMemo(() => dynamic(() => import("@/components/Map"), {
        loading: () => <p className="text-xs">Loading map..</p>,
        ssr: false
    }), [ longitude, latitude ]);

    return (
        <>
            <h1 className="text-2xl font-medium">You should go to {website ? <Link href={website} target="_blank">{name}</Link> : <Highlight>{name}</Highlight>}!</h1>
            <p className="pb-3 text-sm">Tags: {formatList(tags, (item) => <Highlight key={item}>{item}</Highlight>)}</p>
            {description && <p className="pb-3">{description}</p>}
            <div className="pb-3">
                <p>{decodeType(amenity)}</p>
                {attributes.delivery && <p>This restaurant does <Highlight>deliver</Highlight>.</p>}
                {attributes.driveThrough && <p>This restaurant has a <Highlight>drive-through</Highlight>.</p>}
            </div>
            <p className="pb-1">
                {name}, {address.street}, {address.city}, {address.state} {address.zip}
            </p>
            <div className="pb-3">
                <DynamicMap name={name} distance={distance / 1609} longitude={longitude} latitude={latitude} />
            </div>
        </>
    );
}

const decodeType = (amentity: string) => {
    switch(amentity.toLowerCase()) {
        case "restaurant": return "This is your typical sitdown restaurant. Expect to be waited on and enjoy table service.";
        case "cafe": return "This is a cafe. They will likely serve coffee, light meals, and pastries, usually with a relaxed and cozy atmosphere.";
        case "bar": return "Bar";
        case "fast_food": return "This is a fast food restaurant. Do not expect much wait time. Delivery and drivethrough services are usually avaliable.";
        case "pub": return "Pub";
    }
    return "N/A"
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