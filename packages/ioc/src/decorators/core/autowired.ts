import { createDecorator } from '../factory';
import { AutowiredMetadata } from '../../interface/decorators/metadata/autowired-metadata.interface';
import { ClassFieldDecoratorFunction, ClassMemberDecoratorFunction, Identifier } from '../../interface/decorators/decorator';

export interface AutowiredDecorator {
  /**
   * autowired decorator
   * @export
   * @example
   * ```typescript
   * @Autowired()
   * userService: UserService;
   * @param identifier
   */
  (identifier?: Identifier): ClassFieldDecoratorFunction<any, any, any>;
  /**
   * autowired decorator
   * @param alias
   * @example
   * ```typescript
   * @Autowired('userServiceAlias')
   * userService: UserService;
   */
  (alias?: string): ClassFieldDecoratorFunction<any, any, any>;

  /**
   * autowired decorator
   * @param metadata
   * @example
   * ```typescript
   * @Autowired({
   *   identifier: UserService,
   *   alias: 'userServiceAlias',
   * })
   * userService: UserService;
   */
  (metadata?: AutowiredMetadata): ClassMemberDecoratorFunction<any, any, any>;

  /**
   * autowired decorator
   * @param target
   * @param context
   * @example
   * ```typescript
   * @Autowired
   * userService: UserService;
   */
  (target: any, context: ClassMemberDecoratorContext): void;
}

export const Autowired: AutowiredDecorator = createDecorator<AutowiredMetadata>('Autowired', []);
