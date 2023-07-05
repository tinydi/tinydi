import { ClassType } from './type';

/**
 * define a type of identifier
 */
export type Identifier<T = any> = string | symbol | ClassType<T>;
