import { Identifier } from '../../common/identifier';

/**
 * provide options
 * @export
 * @interface ProvideMetadata
 * @extends {Metadata}
 * @template T
 */
export interface ProvideMetadata {
  /**
   * The token to provide.
   * @type {Identifier}
   * @memberOf ProvideMetadata
   */
  identifier?: Identifier;
}
