import { Metadata } from './metadata.interface';
import { Identifier } from '../../common/identifier';

export interface MethodMetadata extends Metadata {
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
  propertyKey?: string;
}
