export const generateReceipt = () => {
    const receiptNumber = getRandomInt(600, 800000)
    return `receipt#${receiptNumber}`
}

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}