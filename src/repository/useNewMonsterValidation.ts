import { useState } from 'react';
import { MonsterParams } from './Monster';

const useNewMonsterValidation = (
  createMonsterCallback: (monster: MonsterParams) => void,
): readonly [(monster: MonsterParams) => boolean, boolean, string] => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validate = (monster: MonsterParams): boolean => {
    // Name Validation
    if (monster.name === '') {
      setError(true);
      setErrorMessage('Name is required.');
      return false;
    }

    // Health validation
    const regex = /^(\d+[dD](1|2|4|6|8|10|12|20)?)(\+|\+\d+)?$/;
    if (Number.isNaN(+monster.health) || monster.health === '') {
      if (typeof monster.health === 'string' && !regex.test(monster.health)) {
        setError(true);
        setErrorMessage('Invalid health notation.');
        return false;
      }
    }

    // maxHealth validation
    if (monster.maxHealth !== undefined) {
      if (
        typeof monster.health === 'number' &&
        monster.maxHealth < monster.health
      ) {
        setError(true);
        setErrorMessage('Health cannot be greater than Max Health.');
        return false;
      }
    }

    // tempHealth validation
    if (monster.tempHealth !== undefined) {
      if (monster.tempHealth < 0) {
        setError(true);
        setErrorMessage('Temp health must not be negative.');
        return false;
      }
    }

    // advantaged / disadvantaged validation
    if (monster.advantaged && monster.disadvantaged) {
      setError(true);
      setErrorMessage('Cannot be both Advantaged and Disadvantaged.');
      return false;
    }
    // initiative validation
    if (monster.initiative !== undefined) {
      if (monster.initiative < 1) {
        setError(true);
        setErrorMessage('Initiative must not be negative.');
        return false;
      }
    }

    // All validations passed, create the monster and return true
    createMonsterCallback(monster);
    setError(false);
    setErrorMessage('');
    return true;
  };

  return [validate, error, errorMessage] as const;
};

export default useNewMonsterValidation;
