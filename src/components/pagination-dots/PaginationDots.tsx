import "./PaginationDots.css"

interface PaginationDotsProps {
    total: number;
    filled: number;
}

export function PaginationDots({total, filled}: PaginationDotsProps) {
    const dots = Array(total).fill(false).map((_, i) => i < filled)

    return (
        <div className="flex flex-row gap-2">
            {dots.map(dot => (
                <div className={`dot ${dot ? 'filled' : ''}`}></div>
            ))}
        </div>
    )
}