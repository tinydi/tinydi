import { Identifier } from '../../common/identifier';
import { MethodAccessMetadata } from './method-access-metadata';
import { Metadata } from './metadata.interface';

export interface MethodMetadata extends Metadata {
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
   * method accessors
   * @type {FieldAccessMetadata}
   * @memberof PropertyMetadata
   */
  access?: MethodAccessMetadata;
  /**
   * provider identifiers for the method parameters.
   * If not set then the method parameter is not a provider.
   * @type  {Identifier[]}
   * @memberof MethodMetadata
   */
  providers?: Identifier[];
  /**
   * method property key.
   * @type  {string}
   * @memberof MethodMetadata
   */
  propertyKey?: string | symbol;
}
