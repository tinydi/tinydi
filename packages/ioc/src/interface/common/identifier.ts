import { ClassType } from './type';

/**
 * define class id
 * @type {string|symbol}
 */
export type Identifier = string | symbol;

/**
 * @Autowired provider identifier
 * @type {string|symbol|ClassType}
 */
export type ProviderIdentifier = Identifier | ClassType;

export function isIdentifier(target: any): boolean {
  return typeof target === 'string' || typeof target === 'symbol';
}
