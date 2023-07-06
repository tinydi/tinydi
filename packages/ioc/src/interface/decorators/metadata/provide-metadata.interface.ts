import { Identifier } from '../../common/identifier';
import { PatternMetadata } from './scope-metadata.interface';

/**
 * provide metadata
 * @export
 * @interface ProvideMetadata
 * @extends {Metadata}
 * @template T
 */
export interface ProvideMetadata extends PatternMetadata {
  /**
   * The token to provide.
   * @type {Identifier}
   * @memberOf ProvideMetadata
   */
  identifier?: Identifier;
}
