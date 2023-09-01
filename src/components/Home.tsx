
const Home = () => {
    return (
        <>
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
        </>
    );
}

export default Home;