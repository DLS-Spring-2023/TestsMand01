export const generateDob = (): Date => {
    const now = new Date().getTime();
    const MAX_YEARS_AGO = 80;
    const MAX_MILISECONDS_AGO = MAX_YEARS_AGO * 365 * 24 * 60 * 60 * 1000;
    const randomTime = now - Math.floor(Math.random() * MAX_MILISECONDS_AGO);

    return new Date(randomTime);
}