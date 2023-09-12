// Calculates a number from dice notation, assumes input is correctly format
const calculateDiceValue = (input: string): number => {
    const [ multiplier, dice ] = input.toLowerCase().split('d');
    const value = 0;

    for (let i = 0; i < multiplier; ++i) {
        const diceVal = Math.floor(Math.random() * dice) + 1;
        value += diceVal;
    }

    return value;
}

export { calculateDiceValue }
