import React, { createContext, useContext, useRef } from 'react';
import MonsterManager from '../repository/MonsterManager';

const MonsterManagerContext = createContext<MonsterManager | null>(null);

type MonsterManagerProviderProps = {
  children: React.ReactNode;
};

export const useMonsterManager = (): MonsterManager => {
  const context = useContext(MonsterManagerContext);
  if (!context) {
    throw new Error(
      'useMonsterManager must be used within a MonsterManagerProvider',
    );
  }
  return context;
};

export const MonsterManagerProvider = ({
  children,
}: MonsterManagerProviderProps): JSX.Element => {
  const monsterManagerRef = useRef<MonsterManager | null>(null);

  if (!monsterManagerRef.current) {
    monsterManagerRef.current = MonsterManager.getInstance();
  }

  return (
    <MonsterManagerContext.Provider value={monsterManagerRef.current}>
      {children}
    </MonsterManagerContext.Provider>
  );
};
