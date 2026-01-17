export function combineDateAndTime(date, time) {
  if (!date || !time) return null;

  let hours, minutes;

  // time как объект {hours, minutes, seconds}
  if (typeof time === 'object' && time !== null) {
    hours = time.hours;
    minutes = time.minutes;
  }
  // time как Date
  else if (time instanceof Date) {
    hours = time.getHours();
    minutes = time.getMinutes();
  }
  // time как ISO строка
  else if (typeof time === 'string' && time.includes('T')) {
    const d = new Date(time);
    if (isNaN(d)) return null;
    hours = d.getHours();
    minutes = d.getMinutes();
  }
  // time как "HH:mm"
  else if (typeof time === 'string' && time.includes(':')) {
    [hours, minutes] = time.split(':').map(Number);
  } else {
    return null;
  }

  const result = new Date(date);
  if (isNaN(result)) return null;

  result.setHours(hours, minutes, 0, 0);

  return result.toISOString();
}

