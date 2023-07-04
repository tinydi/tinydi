import { ProvideMetadata } from './provide-metadata.interface';
import { TypeMetadata } from './type-metadata.interface';
import { AccessMetadata } from './access-metadata';
import { InjectMode } from '../../../enums/inject-mode.enum';

export interface PropertyMetadata extends ProvideMetadata, TypeMetadata {
  /**
   * property is public
   * @type {boolean}
   * @memberof PropertyMetadata
   */
  public?: boolean;
  /**
   * property is private
   * @type {boolean}
   * @memberof PropertyMetadata
   */
  private?: boolean;
  /**
   * property key for class property
   * @type {string}
   * @memberof PropertyMetadata
   */
  propertyKey?: string | symbol;
  /**
   * property accessors
   * @type {AccessMetadata}
   * @memberof PropertyMetadata
   */
  access?: AccessMetadata;
  /**
   * property inject mode
   * @type {InjectMode}
   * @memberof PropertyMetadata
   */
  injectMode?: InjectMode;
}
