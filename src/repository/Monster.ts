import { calculateDiceValue } from './Helpers';

interface MonsterParams {
  name: string;
  health: string | number;
  maxHealth?: number;
  tempHealth?: number;
  lowHealth?: boolean;
  dead?: boolean;
  friendly?: boolean;
  hidden?: boolean;
  advantaged?: boolean;
  disadvantaged?: boolean;
  initiative?: number;
  conditions?: string[];
}

interface Health {
  val: number;
  temp: number;
  max: number;
  low: boolean;
}

class Monster {
  static defaultHealth: Health = {
    val: 0,
    temp: 0,
    max: 0,
    low: true,
  };
  static getNextId(): number {
    Monster.id += 1;
    return Monster.id;
  }
  static id: number = 0;

  public id: number = Monster.getNextId();
  public name: string = 'defaultMonster';
  public health: Health = Monster.defaultHealth;
  public dead: boolean = false;
  public friendly: boolean = false;
  public hidden: boolean = false;
  public advantaged: boolean = false;
  public disadvantaged: boolean = false;
  public initiative: number = 0;
  public conditions: string[] = [];

  constructor(params: MonsterParams) {
    Object.assign(this, params);
    let healthVal = 0;
    if (Number.isNaN(+params.health)) {
      healthVal = calculateDiceValue(params.health as string);
    } else {
      healthVal = params.health as number;
    }
    const healthObj: Health = {
      val: healthVal,
      temp: params.tempHealth || 0,
      max: params.maxHealth || healthVal,
      low: false,
    };
    healthObj.low = healthObj.val < healthObj.max / 3;
    this.health = healthObj;
  }

  public setHealth(value: number): void {
    this.health.val = value;
  }

  public getHealth(): number {
    return this.health.val;
  }
}

export default Monster;
export type { MonsterParams };
