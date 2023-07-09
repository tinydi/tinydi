import { Scope } from '../../../enums/scope.enum';
import { Identifier } from '../../common/identifier';

export interface ProviderMetadata {
  /**
   * provider identifier
   * @type {Identifier}
   * @memberof ProviderMetadata
   * @example Symbol('TinyService')
   */
  identifier?: Identifier;
  /**
   * provider uuid
   * @type {string}
   * @memberof ProviderMetadata
   * @example '98c63427-e11f-4303-8f61-8635257f0e3a'
   */
  uuid?: string;
  /**
   * provider name
   * @type {string}
   * @memberof ProviderMetadata
   * @example 'tinyService'
   */
  name?: string;
  /**
   * class provider origin name
   * @type {string}
   * @memberof ProviderMetadata
   * @example 'TinyService'
   */
  originName?: string;
  /**
   * provider scope
   * @type {Scope}
   * @memberof ProviderMetadata
   * @example Scope.Singleton
   */
  scope?: Scope;
}
