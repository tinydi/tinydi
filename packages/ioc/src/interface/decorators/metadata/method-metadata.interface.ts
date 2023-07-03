import { Metadata } from './metadata.interface';

export interface MethodMetadata extends Metadata {
  /**
   * Method name.
   */
  propertyName: string;
}
