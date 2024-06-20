export function findTypingSpeed(
    numberOfCharactersTyped: number,
    timeInMilliseconds: number
) {
    const timeInMinutes = timeInMilliseconds / 60000;
    const CPM = numberOfCharactersTyped / timeInMinutes;
    const WPM = CPM / 5;

    return Math.floor(WPM);
}

export function findTypingAccuracy(
    numberOfCharactersTyped: number,
    numberOfCharactersMissed: number
) {
    if (numberOfCharactersTyped <= 0) return 100;
    if (numberOfCharactersMissed > numberOfCharactersTyped) return 0;

    const correctCharacters =
        numberOfCharactersTyped - numberOfCharactersMissed;

    const accuracy = (correctCharacters / numberOfCharactersTyped) * 1000;
    return Math.floor(accuracy) / 10;
}

const pattern = /^[a-zA-Z0-9]+$/;

export function isAlphanumerical(s: string): boolean {
    return pattern.test(s);
}
