import { ArgsContext, ArgsIteratorAction } from './args';
import { Metadata } from '../interface/decorators/metadata/metadata.interface';
import { Types } from '../utils/types.utils';
import { ClassMetadata } from '../interface/decorators/metadata/class-metadata.interface';
import { ClassType, isIdentifier, ProvideIdentifier } from '../interface/decorators/decorator';
import { DecoratorUtils } from '../utils/decorator.utils';
import { DependenciesMetadata } from '../interface/decorators/metadata/dependencies-metadata.interface';
import { Runtime } from '../utils/runtime.utils';
import getParamNames = Runtime.getParamNames;

const provideIds = new Map<string, ProvideIdentifier<any>>();
/**
 * extend metadata.
 *
 * @export
 * @interface MetadataExtends
 * @template T
 */
export interface MetadataExtends<T = any> {
  (metadata: T): void;
}

/**
 * The *only* valid way to create a {{ProvideIdentifier}}.
 * @return {ProvideIdentifier}
 */
export function createProvideIdentifierDecorator<T>(provideId: string): ProvideIdentifier<T> {
  const metaName = `@${provideId}`;
  if (provideIds.has(provideId)) {
    return provideIds.get(provideId)!;
  }
  const id = <any>function (target: ClassType, context: ClassMemberDecoratorContext): any {
    if (['field'].indexOf(context.kind) === -1) {
      throw new Error('@IServiceName-decorator can only be used to decorate a field');
    }
    storeMetadata(provideId, metaName, [target, context], {
      identifier: id.toString(),
      private: context.private,
      static: context.static,
    } as DependenciesMetadata);
  };
  id.provideId = true;
  id.toString = () => provideId;
  provideIds.set(provideId, id);
  return id;
}
/**
 * create class decorator
 *
 * @export
 * @template T
 * @param {string} name
 * @param {boolean} [appendCheck]
 */
export function createClassDecorator<T extends ClassMetadata>(name: string, appendCheck?: boolean);
/**
 * create class decorator
 *
 * @export
 * @template T
 * @param {string} name
 * @param {ArgsIteratorAction<T>[]} [actions]
 * @param {boolean} [appendCheck]
 */
export function createClassDecorator<T extends ClassMetadata>(name: string, actions?: ArgsIteratorAction<T>[], appendCheck?: boolean);
/**
 * create class decorator
 *
 * @export
 * @template T metadata type.
 * @param {string} name decorator name.
 * @param {ArgsIteratorAction[]} [actions]  metadata iterator action.
 * @param {MetadataExtends} [metadataExtends] add extents for metadata.
 * @param {boolean} [appendCheck] default false
 * @returns {*}
 */
export function createClassDecorator<T extends ClassMetadata>(name: string, actions?: ArgsIteratorAction<T>[], metadataExtends?: MetadataExtends<T>, appendCheck?: boolean);
export function createClassDecorator<T extends ClassMetadata>(name: string, actions?: any, metadataExtends?: any, appendCheck = false) {
  if (Types.isBoolean(actions)) {
    appendCheck = actions;
    actions = undefined;
    metadataExtends = undefined;
  } else if (Types.isBoolean(metadataExtends)) {
    appendCheck = metadataExtends;
    metadataExtends = undefined;
  }

  if (appendCheck) {
    actions = actions || [];
    actions.push(
      (ctx, next) => {
        const arg = ctx.currArg;
        if (ctx.args.length > 1 && isIdentifier(arg)) {
          ctx.metadata.identifier = arg;
          ctx.next(next);
        }
      },
      (ctx, next) => {
        const arg = ctx.currArg;
        if (Types.isString(arg)) {
          ctx.metadata.alias = arg;
          ctx.next(next);
        }
      },
      (ctx, next) => {
        const arg = ctx.currArg;
        if (Types.isBoolean(arg)) {
          ctx.metadata.singleton = arg;
          ctx.next(next);
        } else if (Types.isNumber(arg)) {
          ctx.metadata.expires = arg;
          ctx.next(next);
        } else if (isIdentifier(arg)) {
          ctx.metadata.refs = { target: arg, provide: ctx.metadata.provide || ctx.metadata.type, alias: ctx.metadata.alias };
          ctx.next(next);
        }
      }
    );
  }
  return createDecorator<T>(name, actions, metadataExtends);
}
/**
 * create decorator for class params props methods.
 * @export
 * @template T
 * @param {string} name
 * @param {ArgsIteratorAction[]} [actions]  metadata iterator actions.
 * @param {MetadataExtends<T>} [metadataExtends] add extents for metadata.
 * @returns {*}
 */
export function createDecorator<T>(name: string, actions: ArgsIteratorAction[], metadataExtends?: MetadataExtends<T>): any {
  const metaName = `@${name}`;
  const factory = (...args: any[]) => {
    let metadata: T = null;
    if (args.length === 0) {
      return (...args: any[]) => {
        return storeMetadata(name, metaName, args, metadata, metadataExtends);
      };
    }
    metadata = argsToMetadata<T>(args, actions);
    if (metadata) {
      return (...args: any[]) => {
        return storeMetadata(name, metaName, args, metadata, metadataExtends);
      };
    } else {
      if (args.length === 1) {
        if (!Types.isClass(args[0])) {
          return (...args: any[]) => {
            return storeMetadata(name, metaName, args, metadata, metadataExtends);
          };
        }
      }
    }
    // 执行保存元数据
    return storeMetadata(name, metaName, args, metadataExtends);
  };
  factory.toString = () => metaName;
  return factory;
}
function argsToMetadata<T extends Metadata>(args: any[], actions?: ArgsIteratorAction<T>[]): T {
  let metadata: T = null;
  if (args.length) {
    if (args.length === 1 && DecoratorUtils.isMetadataObject(args[0])) {
      metadata = args[0];
    } else if (metadata) {
      metadata = null;
    } else {
      const ctx = new ArgsContext<T>(args);
      DecoratorUtils.chain(actions, ctx);
      metadata = ctx.getMetadata();
    }
  }
  return metadata;
}

function storeMetadata(name: string, metaName: string, args: any[], metadata?: any, metadataExtends?: MetadataExtends): any {
  let target;
  if (args.length === 2) {
    target = args[0];
    const context = args[1] as DecoratorContext;
    switch (context.kind) {
      case 'class':
        storeClassMetadata(name, metaName, target, context, metadata, metadataExtends);
        return target;
      case 'field':
        storeFieldMetadata(name, metaName, context, metadata);
        return target;
      case 'method':
        console.log(getParamNames(target));
        storeMethodMetadata(name, metaName, target, context, metadata, metadataExtends);
        return target;
      default:
        throw new Error(`Invalid @${name} Decorator declaration.`);
    }
  }
  throw new Error(`Invalid @${name} Decorator declaration.`);
}
function storeClassMetadata<T extends ClassMetadata>(name: string, metaName: string, target, context: ClassDecoratorContext, metadata?: T, metadataExtends?: MetadataExtends) {
  // 设置数据
}
function storeFieldMetadata(name: string, metaName: string, context: ClassFieldDecoratorContext<unknown, unknown>, metadata: any, metadataExtends?: MetadataExtends) {}

function storeMethodMetadata(name: string, metaName: string, target: any, context: ClassMethodDecoratorContext, metadata: any, metadataExtends?: MetadataExtends) {}
