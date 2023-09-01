import { useEffect, useState } from "react"

export type Geolocation = {
    latitude: number;
    longitude: number;
};

/**
 * Promisified version of getCurrentPosition
 * 
 * @returns A promise based on the Navigator Geolocation API
 */
const getGeolocation = () => {
    return new Promise<Geolocation>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords
            resolve({ latitude, longitude })
        }, () => {
            reject(null);
        })
    })
}

/**
 * A hook to grab the Geolocation. Can be used in components.
 * 
 * @returns An object containing loading state, failed state and location.
 */
export const useGeolocation = () => {
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ failed, setFailed ] = useState<boolean>(false);
    const [ location, setLocation ] = useState<Geolocation>({ latitude: 0, longitude: 0 });

    useEffect(() => {
        const loadGeolocation = async () => {
            const location = await getGeolocation().catch(_ => null);
            if (location) setLocation(location);
            else setFailed(true);
            setLoading(false);
        }

        setLoading(true);
        setFailed(false);
        loadGeolocation();
    }, []);
    
    return { loading, failed, location };
}