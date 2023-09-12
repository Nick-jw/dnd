// Calculates a number from dice notation, assumes input is correctly format
const calculateDiceValue = (input: string): number => {
  const [_multiplier, _dice] = input.toLowerCase().split('d');
  const multiplier = parseInt(_multiplier, 10);
  const dice = parseInt(_dice, 10);
  let value = 0;

  for (let i = 0; i < multiplier; ++i) {
    const diceVal = Math.floor(Math.random() * dice) + 1;
    value += diceVal;
  }
  return value;
};

const val = 1;

export { calculateDiceValue, val };
