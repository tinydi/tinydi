import { Identifier } from '../../common/identifier';
import { InjectMode } from '../../../enums/inject-mode.enum';
import { FieldAccessMetadata } from './field-access.metadata';

export interface FieldMetadata {
  /**
   * private field or not
   * @type {boolean}
   * @memberof FieldMetadata
   */
  private?: boolean;
  /**
   * static field or not
   * @type {boolean}
   * @memberof FieldMetadata
   */
  static?: boolean;
  /**
   * context access
   * @type {FieldAccessMetadata}
   * @memberof FieldMetadata
   */
  access?: FieldAccessMetadata;
  /**
   * property key
   * @type {Identifier}
   * @memberof FieldMetadata
   */
  propertyKey?: Identifier;
  /**
   * inject identifier
   * @type {Identifier}
   * @memberof FieldMetadata
   */
  identifier?: Identifier;
  /**
   * inject mode
   * @type {InjectMode}
   * @memberof FieldMetadata
   */
  injectMode?: InjectMode;
}
