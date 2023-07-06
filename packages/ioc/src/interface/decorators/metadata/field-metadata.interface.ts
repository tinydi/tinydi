import { FieldAccessMetadata } from './field-access-metadata';
import { InjectMode } from '../../../enums/inject-mode.enum';
import { Identifier } from '../../common/identifier';
import { ClassType } from '../../common/type';
import { Metadata } from './metadata.interface';

export interface FieldMetadata extends Metadata {
  /**
   * the field inject provider
   * @type {Identifier | ClassType}
   * @memberof FieldMetadata
   */
  provider?: Identifier | ClassType;
  /**
   * property is public
   * @type {boolean}
   * @memberof PropertyMetadata
   */
  public?: boolean;
  /**
   * property is private
   * @type {boolean}
   * @memberof PropertyMetadata
   */
  private?: boolean;
  /**
   * property key for class property
   * @type {string}
   * @memberof PropertyMetadata
   */
  propertyKey?: string | symbol;
  /**
   * property accessors
   * @type {FieldAccessMetadata}
   * @memberof PropertyMetadata
   */
  access?: FieldAccessMetadata;
  /**
   * property inject mode
   * @type {InjectMode}
   * @memberof PropertyMetadata
   */
  injectMode?: InjectMode;
}
