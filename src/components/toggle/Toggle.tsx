import "./Toggle.css"
import {useState} from "preact/hooks";

interface ChipProps {
    pressed: boolean
    value: number
}

export interface ToggleProps {
    values: Array<number>
    selectedValue: number
    onSelected: (value: number) => void
}

export function Toggle({values, selectedValue, onSelected}: ToggleProps) {
    const initialState: Array<ChipProps> = values.map(v => {
        return {
            value: v,
            pressed: v == selectedValue
        }
    })
    const [state, setState] = useState<Array<ChipProps>>(initialState)

    const _onClick = (ix: number) => {
        state.forEach((_, i) => state[i].pressed = false)
        state[ix].pressed = true
        setState([...state])
        onSelected(state[ix].value)
    }

    return (
        <div className="flex flex-row gap-4">
            {state.map(({pressed, value}, i) => (
                <button
                    onClick={() => _onClick(i)}
                    className={`toggle-btn ${pressed ? 'active' : ''}`}>{value}</button>
            ))}
        </div>
    )
}