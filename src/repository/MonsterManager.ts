import Monster, { MonsterParams } from './Monster';

type Listener = (monsters: Monster[]) => void;

interface Statuses {
  _dead: boolean;
  _friendly: boolean;
  _hidden: boolean;
}

type AdvantageStatus = 'adv' | 'dis' | 'none';

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
  public getMonster(id: number): Monster | undefined {
    return this.monsters.find((monster) => monster.id === id);
  }

  // Add a Monster to the Monster list
  public addMonster(params: MonsterParams, quantity: number = 1): void {
    if (quantity > 1) {
      for (let i = 1; i <= quantity; ++i) {
        const initiative = Math.floor(Math.random() * 20) + 1;
        const name = `${params.name} ${i}`;
        const currMonster: Monster = new Monster({
          ...params,
          name,
          initiative,
        });
        this.monsters.push(currMonster);
      }
    } else {
      const currMonster: Monster = new Monster(params);
      this.monsters.push(currMonster);
    }
    this.sortMonsters();
    this.notifyListeners();
  }

  // Permanently remove a Monster from the list
  public removeMonster(id: number): boolean {
    const index = this.monsters.findIndex((monster) => monster.id === id);
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

  public getName(id: number): string {
    const currMonster = this.getMonster(id);
    return currMonster?.name || 'Name missing';
  }

  public getStatuses(id: number): Statuses {
    const currMonster = this.getMonster(id);
    if (currMonster) {
      const _dead = currMonster.dead;
      const _friendly = currMonster.friendly;
      const _hidden = currMonster.hidden;
      return { _dead, _friendly, _hidden };
    }
    // eslint-disable-next-line no-console
    console.error('[MonsterManager] getStatuses invalid ID');
    return { _dead: false, _hidden: false, _friendly: false };
  }

  public getAdvantageStatus(id: number): AdvantageStatus {
    const currMonster = this.getMonster(id);
    if (currMonster) {
      if (currMonster.advantaged) return 'adv';
      if (currMonster.disadvantaged) return 'dis';
      return 'none';
    }
    // eslint-disable-next-line no-console
    console.error('[MonsterManager] getAdvantagedStatus invalid ID');
    return 'none';
  }

  public getInitiative(id: number): number {
    const currMonster = this.getMonster(id);
    if (currMonster) {
      return currMonster.initiative;
    }
    // eslint-disable-next-line no-console
    console.error('[MonsterManager] getInitiative invalid ID');
    return 0;
  }

  public sortMonsters(): void {
    this.monsters = this.monsters.sort((a, b) => {
      return b.initiative - a.initiative;
    });
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public importMonsters(data: any): void {
    try {
      this.monsters = data;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[MonsterManager] Error importing monsters');
      // eslint-disable-next-line no-console
      console.error(err);
    }
    this.notifyListeners();
  }

  public clearAllMonsters(): void {
    this.monsters = [];
    this.notifyListeners();
  }

  public applyHealthDelta(
    id: number,
    health: number,
    type: 'heal' | 'damage',
  ): void {
    const monster = this.getMonster(id);
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
