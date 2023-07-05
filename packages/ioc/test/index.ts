import { Autowired } from '../src/decorators/core/autowired';
import { Provide } from '../src/decorators/core/provide';


// export interface Animal {
//   say(): void;
// }
// @Provide
export class Dog {
  say() {
    console.log('dog');
  }
}
// @Provide
// export class Cat implements Animal {
//   say() {
//     console.log('cat');
//   }
// }
@Provide()
export class User {
  @Autowired(Dog)
  dog:Dog
}

