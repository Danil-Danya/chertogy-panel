const truncateString = (string, maxLength) => {
    if (typeof str !== 'string') {
        String(string);
    }

    return string.length > maxLength ? string.slice(0, maxLength) + '...' : string;
}

export default truncateString;