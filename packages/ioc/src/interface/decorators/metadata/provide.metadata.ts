import { Scope } from '../../../enums/scope.enum';
import { Identifier } from '../../common/identifier';

export interface ProvideMetadata {
  identifier?: Identifier;
  uuid?: string;
  name?: string;
  originName?: string;
  scope?: Scope;
}
