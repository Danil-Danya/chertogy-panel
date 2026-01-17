import { combineDateAndTime } from './combineDateAndTime';

export function prepareEventFormData(form, preview) {
    const fd = new FormData();

    console.log(preview);
    
    fd.append('file', preview);
    if (preview) {
    }

    const start = combineDateAndTime(form.date, form.startTime);
    const end = combineDateAndTime(form.date, form.endTime);

    fd.append('start_time', start);
    fd.append('end_time', end);

    for (const key in form) {
        if (['date', 'startTime', 'endTime', 'file'].includes(key)) {
            continue;
        }

        const val = form[key];

        if (Array.isArray(val)) {
            val.forEach(v => fd.append(`${key}[]`, v));
        }
        else if (val?.value) {
            fd.append(key, val.value);
        }
        else {
            fd.append(key, val ?? '');
        }
    }

    return fd;
}
