// import { Injectable } from './decorators/core/injectable';
// import { Scope } from './enums/scope.enum';
// import { Store } from './decorators/store';
// import { INJECT_CLASS_DECORATOR, INJECT_FIELD_DECORATOR, PROVIDE_DECORATOR } from './decorators/constant';
// import { SymbolMetadata } from './utils/symbol.utils';
// import { Autowired } from './decorators/core/autowired';
//
// @Injectable()
// export class Cat {
//   name: string;
//   say(): void {
//     console.log(this.name);
//   }
// }
// @Injectable
// export class Dog {
//   say() {
//     console.log('dog');
//   }
// }
//
// @Injectable()
// export class Animal {
//   @Autowired(Dog)
//   dog: Dog;
//   @Autowired()
//   cat: Cat;
// }
//
// console.log(Store.getMetadataKeys(Animal));
// console.log(Store.getProvideUUID(Animal));
// console.log(Store.getClassMetadata(INJECT_FIELD_DECORATOR, Animal[SymbolMetadata]));
import { Injectable } from './decorators/core/injectable';
import { Store } from './decorators/store';
import { Autowired } from './decorators/core/autowired';

@Injectable()
export class User {
  @Autowired()
  user: string;
}

console.log(Store.getTargetMetadata(User));
console.log(Store.getInjectFieldsMetadata(User));
