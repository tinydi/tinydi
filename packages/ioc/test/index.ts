import { Singleton } from '../src/decorators/core/singleton';
import { Autowired } from '../src/decorators/core/autowired';
import { SymbolMetadata } from '../src/utils/symbol.utils';
import { Init } from '../src/decorators/core/definition';


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
@Singleton()
export class User {
  @Init([Dog])
  init(dog:Dog){

  }
  @Autowired()
  dog:Dog
}
const data = User[SymbolMetadata]
console.log(data);
