import { ClassMetadata } from './metadata/class-metadata.interface';

export type ClassMetadataFilter = (metadata: ClassMetadata) => boolean;
export interface IMetadataStore {
  /**
   * save metadata to store.
   * @param {string} decorator name of decorator
   * @param {any} metadata metadata to save
   * @param {ClassDecoratorContext} context context of class decorator
   */
  saveMetadata(decorator: string, metadata: any, context: ClassDecoratorContext);
}
