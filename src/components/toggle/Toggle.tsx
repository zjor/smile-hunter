import "./Toggle.css"
import {useState} from "preact/hooks";

interface ChipProps {
    pressed: boolean
    value: number
}

export interface OnToggleSelected {
    onSelected: (value: number) => void
}

export function Toggle({onSelected}: OnToggleSelected) {
    const [state, setState] = useState<Array<ChipProps>>([
        {pressed: true, value: 5},
        {pressed: false, value: 10},
        {pressed: false, value: 15}
    ])

    const _onClick = (ix: number) => {
        state.forEach((_, i) => state[i].pressed = false)
        state[ix].pressed = true
        setState([...state])
        onSelected(state[ix].value)
    }

    return (
        <div className="flex flex-row bg-amber-400 rounded-2xl overflow-hidden">
            {state.map(({pressed, value}, i) => (
                <div
                    onClick={() => _onClick(i)}
                    className={`chip ${pressed ? 'active' : ''}`}>{value}</div>
            ))}
        </div>
    )
}