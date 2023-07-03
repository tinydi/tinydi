import { createProvideIdentifierDecorator } from '../src/decorators/factory';
import { Provide } from '../src/decorators/core/provide';
import {Autowired} from '../src/decorators/core/autowired';

const IDataProviderId = createProvideIdentifierDecorator('IDataProviderId');
@Provide
export class Data {}

// @Injectable(Data as unknown as Identifier)
export class User {
  private _id:number
  // @IDataProviderId
  data: Data;
  get id() {
    return this._id;
  }

  constructor(id:number) {
  }
  @Autowired
  sayHi(data:string) {

  }
}
