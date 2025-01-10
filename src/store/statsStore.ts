const MAX_LENGTH = 10

function _storeItem(key: string, value: number) {
    const stored: string | null = localStorage.getItem(key)
    if (stored == null) {
        localStorage.setItem(key, JSON.stringify([value]))
    } else {
        const items: Array<number> = JSON.parse(stored)
        items.push(value)
        localStorage.setItem(key, JSON.stringify(items.slice(Math.max(0, items.length - MAX_LENGTH))))
    }
}

export function storeResults(nOfRounds: number, time: number, accuracy: number) {
    _storeItem(`${nOfRounds}:time`, time)
    _storeItem(`${nOfRounds}:accuracy`, accuracy)
}

interface ResultsType {
    times: Array<number>
    accuracies: Array<number>
}

export function getResults(nOfRounds: number): ResultsType {
    return {
        times: JSON.parse(localStorage.getItem(`${nOfRounds}:time`) || '[]'),
        accuracies: JSON.parse(localStorage.getItem(`${nOfRounds}:accuracy`) || '[]'),
    }
}