import {useAtom} from "jotai";
import {ActiveView, activeViewAtom} from "../../state/state.ts";

import {useEffect, useState} from "preact/hooks";
import WelcomeLogo from "../../assets/welcome-logo.svg"

import "./StartView.css"

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
        <div className="screen !bg-[#FFBD54]">
            <div className="absolute top-0 right-0 bg-white hidden">
                <div>Width: {windowSize.width}</div>
                <div>Height: {windowSize.height}</div>
            </div>

            <div className="flex flex-row w-full min-h-[150px]">
                <div className="self-end font-baloo font-bold text-5xl self-start ml-6">
                    The Smile<br/>Hunter
                </div>
            </div>

            <div className="w-full flex flex-row justify-end flex-grow">
                <img className="self-center h-[320px]"
                     src={WelcomeLogo}/>
            </div>
            <div className="w-full flex flex-col justify-between min-h-[150px]">
                <button
                    className="nb-btn self-center"
                    onClick={() => setActiveView(ActiveView.CONFIGURE_GAME_VIEW)}>New Game
                </button>
            </div>
        </div>
    )
}
