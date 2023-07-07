import { Identifier } from '../../common/identifier';
import { ClassType } from '../../common/type';

export interface MethodMetadata {
  /**
   * provider identifiers for the method parameters.
   * If not set then the method parameter is not a provider.
   * @type  {Identifier[]}
   * @memberof MethodMetadata
   */
  providers?: Identifier[] | ClassType[];
}
