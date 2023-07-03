import { Metadata } from './metadata.interface';
import { ClassType } from '../decorator';

/**
 * type metadata
 * @export
 * @extends {Metadata}
 * @interface TypeMetadata
 * @template T
 */
export interface TypeMetadata extends Metadata {
  /**
   * class type
   * @type {ClassType}
   * @memberOf TypeMetadata
   */
  type?: ClassType;
}