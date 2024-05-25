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
    const correctCharacters =
        numberOfCharactersTyped - numberOfCharactersMissed;

    const accuracy = (correctCharacters / numberOfCharactersTyped) * 1000;
    return Math.floor(accuracy) / 10;
}
