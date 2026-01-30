export function combineDateAndTime(date, time) {
    if (!date || !time) return null;

    if (!(date instanceof Date)) date = new Date(date);
    if (isNaN(date)) return null;

    let hours, minutes;

    if (time instanceof Date) {
        hours = time.getHours();
        minutes = time.getMinutes();
    } else if (typeof time === 'object' && time !== null) {
        hours = time.hours;
        minutes = time.minutes;
    } else if (typeof time === 'string') {
        if (time.includes('T')) {
            const d = new Date(time);
            if (isNaN(d)) return null;
            hours = d.getHours();
            minutes = d.getMinutes();
        } else if (time.includes(':')) {
            [hours, minutes] = time.split(':').map(Number);
        } else {
            return null;
        }
    } else {
        return null;
    }

    date.setHours(hours, minutes, 0, 0);
    return date.toISOString();
}


