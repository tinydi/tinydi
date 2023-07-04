import { Provide } from '../src/decorators/core/provide';
import { Autowired } from '../src/decorators/core/autowired';

export interface Animal {
  say(): void;
}
@Provide
export class Dog implements Animal {
  say() {
    console.log('dog');
  }
}
@Provide
export class Cat implements Animal {
  say() {
    console.log('cat');
  }
}
@Provide
export class User {
  private _id:number

  constructor(data:Animal) {
    console.log(data);
  }

  get id() {
    return this._id;
  }
  @Autowired([Dog,Cat])
  sayHi(dog:Animal,cat:Animal) {

  }
}

console.log("a".toString());
