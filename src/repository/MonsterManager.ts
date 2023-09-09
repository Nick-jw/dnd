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
    this.listeners.push(listener);
    console.log('listener added', listener);
  }

  // Unsubscribe
  public unsubscribe(listener: Listener): void {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  // Notify listeners of Monster list changes
  private notifyListeners(): void {
    console.log('notifying listeners', this.listeners);
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
    console.log('monster added', monster);
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
      const parsedData: any = JSON.parse(data);
      try {
        const monsters: Monster[] = parsedData.map(
          (params: MonsterParams) => new Monster(params),
        );
        this.monsters = monsters;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('Error loading monsters: Invalid data');
        return false;
      }
      this.notifyListeners();
      return true;
    }
    return false;
  }

  public setMonsterHealth(name: string, health: number): void {
    const monster = this.monsters.find((m) => m.name === name);
    if (monster) {
      monster.setHealth(health);
      this.notifyListeners();
    }
  }
}

export default MonsterManager;
