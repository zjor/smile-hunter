import {useAtom} from "jotai"
import {ActiveView, activeViewAtom, gameStatsAtom} from "../state/state.ts"
import {useEffect, useState} from "preact/hooks"
import {loadResults, MAX_LENGTH, storeResults} from "../store/statsStore.ts"
import {LineChart, Line, CartesianGrid, YAxis} from "recharts"
import BuyMeACoffeeIcon from "../assets/buymeacoffee.svg"

export function ResultsView() {
    const [_, setActiveView] = useAtom(activeViewAtom)
    const [stats, __] = useAtom(gameStatsAtom)
    const [timeHistory, setTimeHistory] = useState<Array<any>>([])
    const [accuracyHistory, setAccuracyHistory] = useState<Array<any>>([])

    const time = ((stats.endTime - stats.startTime) / 1000).toFixed(2)
    const accuracy = ((stats.totalFaces - stats.erroneousSmiles) / stats.totalFaces * 100).toFixed(1)

    useEffect(() => {
        storeResults(stats.numberOfRounds, parseFloat(time), parseFloat(accuracy))
        const {times, accuracies} = loadResults(stats.numberOfRounds)
        setTimeHistory(Array.from({length: MAX_LENGTH}).map((_, i) => {
            return {
                name: i,
                value: i < times.length ? times[i] : null
            }
        }))

        setAccuracyHistory(Array.from({length: MAX_LENGTH}).map((_, i) => {
            return {
                name: i,
                value: i < accuracies.length ? accuracies[i] : null
            }
        }))

    }, [])

    return (
        <div className="screen">
            <div className="w-full flex flex-col flex-grow justify-center items-center">
                <div className="font-baloo font-bold text-3xl m-2">Congratulations!</div>
                <div className="grid grid-cols-2">
                    <div className="text-right mr-2">Total time:</div>
                    <div><b>{time}</b> seconds</div>
                    <div className="text-right mr-2">Accuracy:</div>
                    <div><b>{accuracy}%</b></div>
                </div>

                <div className="self-start pt-4 pl-4 font-bold">Time history</div>
                <div className="pt-2 pb-2">
                    <LineChart width={300} height={150} data={timeHistory}>
                        <Line type="monotone" dataKey="value" stroke="#FF8640" strokeWidth={3}/>
                        <CartesianGrid stroke="#FF8640" strokeDasharray="5 5"/>
                        <YAxis width={30}
                               tickCount={50}
                               tickFormatter={(value: number) => String(Math.round(value))}
                               stroke="#FF8640"/>
                    </LineChart>
                </div>

                <div className="self-start pt-2 pl-4 font-bold">Accuracy history</div>
                <div className="pt-2 pb-4">
                    <LineChart width={300} height={100} data={accuracyHistory}>
                        <Line type="monotone" dataKey="value" stroke="#FF8640" strokeWidth={3}/>
                        <CartesianGrid stroke="#FF8640" strokeDasharray="5 5"/>
                        <YAxis width={30}
                               tickCount={3}
                               tickFormatter={(value: number) => String(Math.round(value))}
                               stroke="#FF8640"/>
                    </LineChart>
                </div>

            </div>

            <div className="w-full flex flex-col justify-between min-h-[150px]">
                <button
                    className="nb-btn self-center"
                    onClick={() => setActiveView(ActiveView.START_VIEW)}>Play again
                </button>
            </div>
            <footer className="w-full pb-4 flex justify-center items-center gap-1 text-sm">
                <a href="https://buymeacoffee.com/zjor"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center gap-1 font-semibold hover:underline">
                    <img src={BuyMeACoffeeIcon} alt="Buy Me a Coffee" className="w-5 h-5"/>
                    Buy Me a Coffee
                </a>
            </footer>
        </div>
    )
}
