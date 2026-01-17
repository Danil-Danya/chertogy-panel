export function normalizeTime(time) {
    if (!time) return null;

    if (typeof time === 'object' && 'hours' in time && 'minutes' in time) {
        const h = String(time.hours).padStart(2, '0');
        const m = String(time.minutes).padStart(2, '0');
        return `${h}:${m}`;
    }

    if (typeof time === 'string') {
        return time;
    }

    return null;
}
