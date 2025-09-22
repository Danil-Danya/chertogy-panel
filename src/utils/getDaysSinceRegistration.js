import { differenceInDays, parseISO } from 'date-fns';

const getDaysSinceRegistration = (registrationDate) => {
    if (!registrationDate) return 0;

    const date = typeof registrationDate === 'string' ? parseISO(registrationDate) : registrationDate;
    const now = new Date();

    return differenceInDays(now, date);
}

export default getDaysSinceRegistration;
