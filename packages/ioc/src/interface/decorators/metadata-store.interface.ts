import { ClassMetadata } from './metadata/class-metadata.interface';
import { ClassType } from '../common/type';

export type ClassMetadataFilter = (metadata: ClassMetadata) => boolean;
export interface IMetadataStore {
  /**
   * save metadata to store.
   * @param {string} decorator name of decorator
   * @param {any} metadata metadata to save
   * @param {DecoratorMetadata} decoratorMetadata  decorator metadata of decorator context
   */
  saveMetadata<T = unknown>(decorator: string, metadata: T, decoratorMetadata: DecoratorMetadata);

  /**
   * save metadata to store.
   * @param {string} decorator decorator name of decorator.
   * @param {T extends unknown} metadata  decorator metadata of decorator context
   * @param {DecoratorContext} context  decorator context of class
   */
  saveMetadata<T = unknown>(decorator: string, metadata: T, context: DecoratorContext);

  /**
   * save metadata to store.
   * @param {string} decorator
   * @param {metadata} metadata metadata of decorator.
   * @param {ClassType} target
   */
  saveMetadata<T = unknown>(decorator: string, metadata: T, target: ClassType);

  /**
   * get metadata from store.
   * @param {string} decorator name of decorator.
   * @param {DecoratorContext} decoratorMetadata decorator metadata of decorator context.
   * @returns {any[]}
   */
  getMetadata<T = unknown>(decorator: string, decoratorMetadata: DecoratorMetadata): T;
  /**
   * get metadata from store.
   * @param {string} decorator name of decorator.
   * @param {DecoratorContext} context context of target class.
   * @returns {any[]}
   */
  getMetadata<T = unknown>(decorator: string, context: DecoratorContext): T;
  /**
   * get metadata from store.
   * @param {string} decorator name of decorator.
   * @param {ClassType} target target class.
   * @returns {any[]}
   */
  getMetadata<T = unknown>(decorator: string, target: ClassType): T;

  /**
   * store have metadata or not.
   * @param decorator {string} name of decorator.
   * @param target {ClassType} target class.
   */
  hasMetadata(decorator: string, target: ClassType): boolean;

  /**
   * store have metadata or not.
   * @param decorator {string} name of decorator.
   * @param context {DecoratorContext} context of target class.
   */
  hasMetadata(decorator: string, context: DecoratorContext): boolean;

  /**
   * store have metadata or not.
   * @param decorator {string} name of decorator.
   * @param decoratorMetadata {DecoratorMetadata} decorator metadata of decorator context.
   */
  hasMetadata(decorator: string, decoratorMetadata: DecoratorMetadata): boolean;
}
