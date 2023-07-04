import { MethodMetadata } from './method-metadata.interface';
import { PropertyMetadata } from './property-metadata.interface';

export interface MethodParamPropertyMetadata extends MethodMetadata, PropertyMetadata {}
