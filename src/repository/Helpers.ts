// Calculates a number from dice notation, assumes input is correctly format
const calculateDiceValue = (input: string): number => {
  const [_diceNotation, _scalar] = input.toLowerCase().split('+');
  const [_multiplier, _dice] = _diceNotation.toLowerCase().split('d');
  let scalar = parseInt(_scalar, 10);
  scalar = Number.isNaN(scalar) ? 0 : scalar;
  const multiplier = parseInt(_multiplier, 10);
  const dice = parseInt(_dice, 10);
  let value = 0;

  for (let i = 0; i < multiplier; ++i) {
    const diceVal = Math.floor(Math.random() * dice) + 1;
    value += diceVal;
  }
  value += scalar;
  return value;
};

const val = 1;

export { calculateDiceValue, val };
