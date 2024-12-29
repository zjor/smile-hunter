export function range(min: number, max: number): number[] {
    return Array.from({length: (max - min)}, (_, i) => i + min);
}

export function choose(n: number): number {
    return Math.floor(Math.random() * n);
}

export function shuffle<T>(array: T[]): T[] {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}