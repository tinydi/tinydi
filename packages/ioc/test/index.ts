import { Provide } from '../src/decorators/core/provide';
import { Autowired } from '../src/decorators/core/autowired';
import {SymbolMetadata} from '../src/utils/symbol.utils';
import {getFieldMetadata} from '../src/decorators/metadata-store';
import {AutowiredMetadata} from '../src/interface/decorators/metadata/autowired-metadata.interface';

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
@Provide
export class User {
  @Autowired(Dog)
  dog:Dog
}

const metadata =getFieldMetadata('@Autowired',User[SymbolMetadata])
console.log(metadata);
