interface MonsterParams {
  name: string;
  health: number;
  maxHealth?: number;
  dead?: boolean;
  advantaged?: boolean;
  disadvantaged?: boolean;
  conditions?: string[];
}

class Monster {
  public name: string = 'defaultMonster';
  public health: number = 1;
  public maxHealth: number = this.health;
  public dead: boolean = false;
  public advantaged: boolean = false;
  public disadvantaged: boolean = false;
  public conditions: string[] = [];

  constructor(params: MonsterParams) {
    Object.assign(this, params);
    if (!params.maxHealth) {
      this.maxHealth = this.health;
    }
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
