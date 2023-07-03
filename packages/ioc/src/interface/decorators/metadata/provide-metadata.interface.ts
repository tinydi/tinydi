import { Identifier } from '../decorator';

/**
 * provide metadata
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
  /**
   * alias for the identifier
   * @type {string}
   * @memberOf ProvideMetadata
   */
  alias?: string;
}
