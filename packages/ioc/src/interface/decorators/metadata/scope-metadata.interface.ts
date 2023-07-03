import { ScopeEnum } from '../../../enums/scope.enum';

/**
 * scope metadata
 * @export
 * @interface PatternMetadata
 * @template T
 */
export interface PatternMetadata {
  /**
   * class scope
   * @Type {ScopeEnum}
   * @memberOf PatternMetadata
   */
  scope?: ScopeEnum;
}
