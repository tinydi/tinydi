import { NamespaceMetadata } from '../decorators/metadata/namespace-metadata';
import { TypeMetadata } from '../decorators/metadata/type-metadata.interface';
import { PropertyMetadata } from '../decorators/metadata/property-metadata.interface';

export interface IClassDefinition extends NamespaceMetadata, Pick<TypeMetadata, 'type'> {
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
}
