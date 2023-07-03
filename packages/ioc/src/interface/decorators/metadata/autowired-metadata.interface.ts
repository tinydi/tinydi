import { Metadata } from './metadata.interface';
import { ProvideMetadata } from './provide-metadata.interface';

export interface AutowiredMetadata extends Metadata, ProvideMetadata {
  /**
   * The name of the property to Autowired.
   * @type {string}
   * @memberof AutowiredMetadata
   */
  propertyName?: string;
}
