import Monster, { MonsterParams } from './Monster';

type Listener = (monsters: Monster[]) => void;

class MonsterManager {
  private static instance: MonsterManager;

  private monsters: Monster[] = [];
  private listeners: Listener[] = [];

  // Get single MonsterManager instance
  public static getInstance(): MonsterManager {
    if (!MonsterManager.instance) {
      MonsterManager.instance = new MonsterManager();
    }
    return MonsterManager.instance;
  }

  // Subscribe to MonsterManager list updates
  public subscribe(listener: Listener): void {
    // eslint-disable-next-line no-console
    console.log('[MonsterManager] Adding listener: ', listener.name);
    this.listeners.push(listener);
  }

  // Unsubscribe
  public unsubscribe(listener: Listener): void {
    // eslint-disable-next-line no-console
    console.log('[MonsterManager] Removing listener: ', listener.name);
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  // Notify listeners of Monster list changes
  private notifyListeners(): void {
    for (const listener of this.listeners) {
      listener([...this.monsters]);
    }
  }

  // Get full array of Monsters
  public getMonsters(): Monster[] {
    return this.monsters;
  }

  // Get Monster by name, returns first occurence
  public getMonster(name: string): Monster | undefined {
    return this.monsters.find((monster) => monster.name === name);
  }

  // Add a Monster to the Monster list
  public addMonster(params: MonsterParams): void {
    const monster: Monster = new Monster(params);
    this.monsters.push(monster);
    this.notifyListeners();
  }

  // Permanently remove a Monster from the list
  public removeMonster(name: string): boolean {
    const index = this.monsters.findIndex((monster) => monster.name === name);

    if (index !== -1) {
      this.monsters.splice(index, 1);
      this.notifyListeners();
      return true;
    }
    return false;
  }

  // Add multiple identical Monsters
  public addMonsters(params: MonsterParams, count: number): void {
    for (let i = 1; i <= count; i++) {
      const name = params.name + i;
      this.addMonster({ ...params, name });
    }
    this.notifyListeners();
  }

  // Load Monster list from localStorage
  public loadFromBrowserStorage(): boolean {
    const data: string | null = localStorage.getItem('monsters');
    if (data) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const parsedData: any = JSON.parse(data);
      try {
        const monsters: Monster[] = parsedData.map(
          (params: MonsterParams) => new Monster(params),
        );
        this.monsters = monsters;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('[MonsterManager] Error loading from local storage');
        return false;
      }
      this.notifyListeners();
      return true;
    }
    return false;
  }

  public clearAllMonsters(): void {
    this.monsters = [];
    this.notifyListeners();
  }

  public applyHealthDelta(
    name: string,
    health: number,
    type: 'heal' | 'damage',
  ): void {
    const monster = this.getMonster(name);
    if (monster) {
      const newHealth =
        type === 'heal'
          ? monster.health.val + health
          : monster.health.val - health;
      if (newHealth <= 0) {
        monster.health.val = 0;
        monster.dead = true;
      } else if (newHealth >= monster.health.max) {
        monster.health.val = monster.health.max;
      } else {
        monster.health.val = newHealth;
      }
      this.notifyListeners();
    }
  }
}

export default MonsterManager;
