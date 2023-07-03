import { ClassMetadata } from './metadata/class-metadata.interface';
import { DependenciesMetadata } from './metadata/dependencies-metadata.interface';

export type ClassMetadataFilter = (metadata: ClassMetadata) => boolean;
export interface IMetadataStore {
  /**
   * Save class metadata
   * @param decoratorMetadata {DecoratorMetadata} decorator metadata
   * @param metadata {ClassMetadata} metadata to save
   */
  saveClassMetadata<T extends ClassMetadata>(decoratorMetadata: DecoratorMetadata, metadata: T): void;
  /**
   * get class metadata
   * @param decoratorMetadata {DecoratorMetadata} decorator metadata
   * @returns {ClassMetadata} metadata
   */
  getClassMetadata<T extends ClassMetadata>(decoratorMetadata: DecoratorMetadata): T;
  /**
   * get all class metadata
   * @return {ClassMetadata[]}
   */
  listClassMetadata<T extends ClassMetadata>(filter?: ClassMetadataFilter): T[];
  /**
   * Save field metadata
   * @param decoratorMetadata {DecoratorMetadata} decorator metadata
   * @param metadata {DependenciesMetadata} metadata to save
   */
  saveDependenciesMetadata<T extends DependenciesMetadata>(decoratorMetadata: DecoratorMetadata, metadata: T): void;
  /**
   * Get field metadata
   * @param decoratorMetadata {DecoratorMetadata}
   * @return {DependenciesMetadata[]} field metadata
   */
  getDependenciesMetadata<T extends DependenciesMetadata>(decoratorMetadata: DecoratorMetadata): T[];
}
