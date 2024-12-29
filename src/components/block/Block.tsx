import "./Block.css"
import {useState} from "preact/hooks";

export interface BlockProps {
    url: string
    correct: boolean
    onClick?: () => void
}

export function Block({url, correct, onClick}: BlockProps) {
    const [isShaking, setShaking] = useState(false)
    const _onClick = () => {
        if (!correct) {
            setShaking(true)
            setTimeout(() => setShaking(false), 600)
        }
        onClick && onClick()
    }

    return (
        <div
            className={`block ${isShaking ? 'invalid' : ''}`}
            onClick={_onClick}>
            <img src={url}/>
        </div>
    )
}