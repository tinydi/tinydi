import { InjectMode } from '../../../enums/inject-mode.enum';
import { Identifier } from '../../common/identifier';
import { ClassType } from '../../common/type';

export interface FieldMetadata {
  /**
   * the field inject provider
   * @type {Identifier | ClassType}
   * @memberof FieldMetadata
   */
  provider?: Identifier | ClassType;
}
