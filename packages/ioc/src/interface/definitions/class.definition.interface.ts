import { NamespaceMetadata } from '../decorators/metadata/namespace-metadata';
import { TypeMetadata } from '../decorators/metadata/type-metadata.interface';
import { PropertyMetadata } from '../decorators/metadata/property-metadata.interface';
import { ClassType } from '../common/type';
import { Scope } from '../../enums/scope.enum';

export interface IClassDefinition {
  /**
   * The class id
   * @type {string}
   * @memberof IClassDefinition
   */
  id: string;
  /**
   * The class guid
   * @type {string}
   * @memberof IClassDefinition
   */
  uuid: string;
  /**
   * The namespace where the current class can provide services
   * @type {string[]}
   * @memberof IClassDefinition
   */
  namespaces: string[];
  /**
   * The class scope
   * @type {Scope}
   */
  scope: Scope;
  /**
   * List of current classes marked by decorators
   * @type {string[]}
   * @memberof IClassDefinition
   */
  decorators: string[];
  /**
   * List of properties only Fields
   * @type {PropertyMetadata[]}
   * @memberof IClassDefinition
   */
  fields: PropertyMetadata[];
  /**
   * The class type
   * @type {ClassType}
   * @memberof IClassDefinition
   */
  type: ClassType;
}
