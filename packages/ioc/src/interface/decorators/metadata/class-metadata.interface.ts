import { Metadata } from './metadata.interface';
import { PatternMetadata } from './scope-metadata.interface';
import { TypeMetadata } from './type-metadata.interface';
import { ProvideMetadata } from './provide-metadata.interface';
import { NamespaceMetadata } from './namespace-metadata';

export interface ClassMetadata extends Metadata, PatternMetadata, TypeMetadata, ProvideMetadata, NamespaceMetadata {
  /**
   * The class uuid.
   * @type {string}
   * @memberof ClassMetadata
   */
  uuid?: string;
  /**
   * The name of the class.
   * @type {string}
   * @memberof ClassMetadata
   */
  name?: string;
  /**
   * The original name of the class.
   * @type {string}
   * @memberof ClassMetadata
   */
  originalName?: string;
}
