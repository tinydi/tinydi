import { FieldMetadata } from '../decorators/metadata/field-metadata.interface';
import { ClassType } from '../common/type';
import { Scope } from '../../enums/scope.enum';
import { IFieldsDefinition } from './fields.definition.interface';
import { Identifier } from '../common/identifier';

export interface IClassDefinition<T extends FieldMetadata> {
  /**
   * The class id
   * @type {string}
   * @memberof IClassDefinition
   */
  id: Identifier;
  /**
   * The class name
   * @type {string}
   * @memberof IClassDefinition
   */
  name: string;
  /**
   * The class guid
   * @type {string}
   * @memberof IClassDefinition
   */
  uuid: string;
  /**
   * The class type
   * @type {ClassType}
   * @memberof IClassDefinition
   */
  type: ClassType;
  /**
   * The namespace where the current class can provide services
   * @type {string[]}
   * @memberof IClassDefinition
   */
  namespaces: string[];
  /**
   * The class scope
   * @type {Scope}
   * @memberof IClassDefinition
   */
  scope: Scope;
  /**
   * The class constructor method
   * @type {string}
   * @memberof IClassDefinition
   */
  constructorMethod: string;
  /**
   * The class init method
   * @type {string}
   * @memberof IClassDefinition
   */
  initMethod: string;
  /**
   * The class destroy method
   * @type {string}
   * @memberof IClassDefinition
   */
  destroyMethod: string;
  /**
   * List of current classes marked by decorators
   * @type {string[]}
   * @memberof IClassDefinition
   */
  decorators: string[];
  /**
   * List of properties only Fields
   * @type {FieldMetadata[]}
   * @memberof IClassDefinition
   */
  fields: IFieldsDefinition<T>;
  /**
   * List of properties only methods
   */
  methods: FieldMetadata[];
}
