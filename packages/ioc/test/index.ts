import { Injectable } from '../src/decorators/core/injectable';
import { Scope } from '../src/enums/scope.enum';

export class Animal {
  name: string;
  say(): void {
    console.log(this.name);
  }
}
// @Provide
export class Dog {
  say() {
    console.log('dog');
  }
}

@Injectable({
  scope:Scope.Request,
  identifier:'cat'
})
export class Cat extends Animal {
  name = 'cat';
}
// @Singleton()
// export class User {
//   @Init([Dog])
//   init(dog: Dog) {}
//   @Autowired()
//   dog: Dog;
// }
// const data = User[SymbolMetadata];
// console.log(data);
