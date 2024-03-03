export const getRandomIntMinMax = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
}

export const getRandomIntMax = (max: number) => {
    return Math.floor(Math.random() * max);
}