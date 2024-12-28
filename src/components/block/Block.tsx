import "./Block.css"
import {useState} from "preact/hooks";

export interface BlockProps {
    correct: boolean
    onClick?: () => void
}

export function Block({correct, onClick}: BlockProps) {
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
            {correct ? '\u{1F60A}' : '\u{2205}'}
        </div>
    )
}
