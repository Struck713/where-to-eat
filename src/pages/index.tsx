import { Geolocation, useGeolocation } from "@/hooks/useGeolocation";

 const Home = () => {
    return (
        <main className="flex h-screen bg-blue-400">
            <div className="m-auto">
                <div className="bg-white ml-28 mr-28 p-5 rounded-md drop-shadow-md">
                    <h1 className="text-2xl font-medium pb-3">Where should I eat?</h1>
                    <p className="pb-3">
                        I decided to build this website because I always had a hard time choosing where to eat when 
                        I was with friends. There used to be a really good website (and there still is) called
                        {" "}<a className="text-blue-600 hover:animate-pulse" href="https://wtfsigte.com/" target="_blank">wtfsigte.com</a>{" "}
                        but now it&apos;s an app. I thought it would be cool to build my own web app style version of
                        this site myself.
                    </p>
                    <p className="pb-5">
                        Please allow the site to access your location. If you denied the request, you&apos;ll have to enable it.
                    </p>
                    <GeolocationDisplay />
                </div>
            </div>
        </main>
    )
};

const GeolocationDisplay = () => {

    const { loading, failed, location } = useGeolocation();
    
    if (loading) return <p>Loading...</p>;
    if (failed) return <p className="text-red-400">Failed to load location.</p>;
    return <button className="p-2 bg-blue-500 text-white rounded-md transition ease-in-out duration-500 hover:bg-blue-600" onClick={() => console.log(location)}>Find me a place to eat!</button>
}

export default Home;