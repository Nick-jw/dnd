interface MonsterParams {
  name: string;
  health: number;
  maxHealth?: number;
  lowHealth?: boolean;
  dead?: boolean;
  advantaged?: boolean;
  disadvantaged?: boolean;
  conditions?: string[];
}

// Maybe make a health object, to save having to check for lowHealth
// Constructor would still take raw values, but would contruct a health object and store as field
// interface Health {
//   health: number;
//   tempHealth: number;
//   maxHealth: number;
//   low: boolean;
// }

class Monster {
  public name: string = 'defaultMonster';
  public health: number = 1;
  public maxHealth: number = this.health;
  public lowHealth: boolean = false;
  public dead: boolean = false;
  public advantaged: boolean = false;
  public disadvantaged: boolean = false;
  public conditions: string[] = [];

  constructor(params: MonsterParams) {
    Object.assign(this, params);
    if (!params.maxHealth) {
      this.maxHealth = this.health;
    }
    this.lowHealth = this.health > this.maxHealth / 3;
  }

  public setHealth(value: number): void {
    this.health = value;
  }

  public getHealth(): number {
    return this.health;
  }
}

export default Monster;
export type { MonsterParams };
