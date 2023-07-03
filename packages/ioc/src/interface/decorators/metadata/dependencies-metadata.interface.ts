import { ProvideMetadata } from './provide-metadata.interface';
import { Metadata } from './metadata.interface';

export interface DependenciesMetadata extends ProvideMetadata, Metadata {
  /**
   * The field is private or not.
   * @type {boolean}
   * @memberof FieldMetadata
   * @default false
   */
  private: boolean;
  /**
   * The field is static or not.
   * @type {boolean}
   * @memberof FieldMetadata
   * @default false
   */
  static: boolean;
  /**
   * The field property name.
   * @type {string}
   * @memberof FieldMetadata
   * @default ''
   */
  propertyName: string;
}
