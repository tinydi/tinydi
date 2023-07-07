import { ProviderIdentifier } from '../../common/identifier';

export interface AutowiredOptions {
  /**
   * The provider of the provider to Autowired.
   * @type {ProviderIdentifier}
   * @memberof AutowiredMetadata
   */
  provider: ProviderIdentifier;
  /**
   * The identifiers of the providers to Autowired.
   * @type {ProviderIdentifier[]}
   */
  providers: ProviderIdentifier[];
  /**
   * The name of the property to Autowired.
   * @type {string}
   * @memberof AutowiredMetadata
   */
  propertyName?: string;
}
