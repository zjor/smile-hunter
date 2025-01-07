import {useAtom} from "jotai";
import {ActiveView, activeViewAtom} from "../../state/state.ts";
import WelcomeLogo from "../../assets/welcome-logo.svg"
import "./StartView.css"
import {useEffect, useState} from "preact/hooks";

export function StartView() {
    const [_, setActiveView] = useAtom(activeViewAtom)

    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        // Subscribe to the resize event
        window.addEventListener('resize', handleResize);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency array ensures this runs only once on mount


    return (
        <div className="screen">
            <div className="absolute top-0 right-0 bg-white hidden">
                <div>Width: {windowSize.width}</div>
                <div>Height: {windowSize.height}</div>
            </div>

            <div className="flex flex-row w-full">
                <div className="font-baloo font-bold text-5xl self-start ml-2">The Smile<br/>Hunter</div>
            </div>
            <img className="self-end h-[320px]"
                 src={WelcomeLogo}/>
            <button
                className="default-btn"
                onClick={() => setActiveView(ActiveView.CONFIGURE_GAME_VIEW)}>New Game
            </button>
        </div>
    )
}
