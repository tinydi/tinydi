import { Types } from '../utils/types.utils';
import { ArgsContext, ArgsIteratorAction } from './args';
import { chain } from '../interface/common/handler';
import { ClassOptions } from '../interface/decorators/options/class-options.interface';

import { FieldMetadata } from '../interface/decorators/options/field-options.interface';
import { AutowiredOptions } from '../interface/decorators/options/autowired-options.interface';
import { MethodMetadata } from '../interface/decorators/options/method-metadata.interface';
import isMetadataObject = Types.isMetadataObject;

/**
 * extend options.
 *
 * @export
 * @interface MetadataExtends
 * @template T
 */
export interface MetadataExtends<T = any> {
  (metadata: T): void;
}

export function createDecorator<T>(name: string, actions?: ArgsIteratorAction<T>[], metadataExtends?: MetadataExtends<T>): any {
  const metaName = `@${name}`;
  const factory = (...args: any[]) => {
    let metadata: T = null;
    //@example @Injectable()
    if (args.length < 1) {
      return (...args) => {
        return storeMetadata(name, metaName, args[0], args[1], metadata, metadataExtends);
      };
    }
    //@example @Injectable
    if (args.length === 2 && args[1].kind) {
      return storeMetadata(name, metaName, args[0], args[1], metadata, metadataExtends);
    }
    //@example @Injectable(...)
    metadata = argsToMetadata<T>(args, actions);
    return (...args) => {
      return storeMetadata(name, metaName, args[0], args[1], metadata, metadataExtends);
    };
  };
  factory.toString = () => metaName;
  return factory;
}
/**
 * create class decorator
 *
 * @export
 * @template T
 * @param {string} name
 * @param {boolean} [appendCheck]
 */
export function createClassDecorator<T extends ClassOptions>(name: string, appendCheck?: boolean);
/**
 * create class decorator
 *
 * @export
 * @template T
 * @param {string} name
 * @param {ArgsIteratorAction<T>[]} [actions]
 * @param {boolean} [appendCheck]
 */
export function createClassDecorator<T extends ClassOptions>(name: string, actions?: ArgsIteratorAction<T>[], appendCheck?: boolean);
/**
 * create class decorator
 *
 * @export
 * @template T options type.
 * @param {string} name decorator name.
 * @param {ArgsIteratorAction<T>[]} [actions]  options iterator action.
 * @param {MetadataExtends<T>} [metadataExtends] add extents for options.
 * @param {boolean} [appendCheck] default false
 * @returns {*}
 */
export function createClassDecorator<T extends ClassOptions>(name: string, actions?: ArgsIteratorAction<T>[], metadataExtends?: MetadataExtends<T>, appendCheck?: boolean);

export function createClassDecorator<T extends ClassOptions>(name: string, actions?: any, metadataExtends?: any, appendCheck = false) {
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
        ctx.metadata.identifier = ctx.currArg;
        ctx.next(next);
      },
      (ctx, next) => {
        ctx.metadata.scope = ctx.currArg;
        ctx.next(next);
      }
    );
  }
  return createDecorator<T>(name, actions, metadataExtends);
}

/**
 * create field method param decorator
 * @param name {string} decorator name
 * @param actions {ArgsIteratorAction<T extends FieldMetadata>[]} options iterator action.options iterator action.
 * @param metadataExtends {MetadataExtends<T extends FieldMetadata>} add extents for options.
 */
export function createMethodPropParamDecorator<T extends AutowiredOptions>(name: string, actions?: ArgsIteratorAction<T>[], metadataExtends?: MetadataExtends<T>) {
  actions = actions || [];
  actions.push((ctx, next) => {
    const arg = ctx.currArg;
    if (Types.isArray(arg)) {
      ctx.metadata.providers = arg;
      ctx.next(next);
    } else {
      ctx.metadata.provider = arg;
      ctx.next(next);
    }
  });
  return createDecorator<T>(name, actions, metadataExtends);
}

function argsToMetadata<T extends Record<string, any>>(args: any[], actions?: ArgsIteratorAction<T>[]): T {
  let metadata: T = null;
  if (args.length) {
    if (args.length === 1 && isMetadataObject(args[0])) {
      metadata = args[0];
    } else if (actions) {
      const ctx = new ArgsContext<T>(args);
      chain(actions, ctx);
      metadata = ctx.getMetadata();
    }
  }
  return metadata;
}

function storeMetadata<T>(name: string, metaName: string, target: any, context: DecoratorContext, metadata?: any, metadataExtends?: MetadataExtends<T>) {
  switch (context.kind) {
    case 'class':
      storeClassMetadata(name, metaName, target, context, metadata, metadataExtends);
      break;
    case 'field':
      storeFieldMetadata(name, metaName, target, context, metadata, metadataExtends);
      break;
    case 'method':
      storeMethodMetadata(name, metaName, target, context, metadata, metadataExtends);
      break;
  }
}

function storeClassMetadata<T extends ClassOptions>(name: string, metaName: string, target: any, context: DecoratorContext, metadata?: any, metadataExtends?: MetadataExtends<T>) {
  // const classMetadata = (metadata || {}) as T;
  // if (!classMetadata.type) {
  //   classMetadata.type = target;
  // }
  // classMetadata.decorator = name;
  // classMetadata.name = camelCase(context.name.toString());
  // classMetadata.originalName = context.name.toString();
  // if (metadataExtends) {
  //   metadataExtends(classMetadata);
  // }
  // Store.saveClassMetadata(metaName, classMetadata, context);
}

function storeFieldMetadata<T extends FieldMetadata>(
  name: string,
  metaName: string,
  target: any,
  context: ClassFieldDecoratorContext,
  metadata?: T,
  metadataExtends?: MetadataExtends<T>
) {
  // const fieldDefinition = new FieldDefinition();
  //
  // const fieldMetadata = (metadata || {}) as T;
  // fieldMetadata.propertyKey = context.name;
  // fieldMetadata.decorator = name;
  // fieldMetadata.access = context.access;
  // if (fieldMetadata.provider) {
  //   if (isClass(fieldMetadata.provider)) {
  //     fieldMetadata.injectMode = InjectMode.Class;
  //   } else {
  //     fieldMetadata.injectMode = InjectMode.Identifier;
  //   }
  // } else {
  //   fieldMetadata.injectMode = InjectMode.PropertyKey;
  // }
  // if (metadataExtends) {
  //   metadataExtends(fieldMetadata);
  // }
  // return Store.saveFieldMetadata(metaName, fieldMetadata, context);
}

function storeMethodMetadata<T extends MethodMetadata>(
  name: string,
  metaName: string,
  target: any,
  context: ClassMethodDecoratorContext,
  metadata?: T,
  metadataExtends?: MetadataExtends<T>
) {
  // const methodMetadata = {} as T;
  // methodMetadata.propertyKey = context.name;
  // methodMetadata.decorator = name;
  // methodMetadata.access = context.access;
  // if (metadata.providers && Types.isArray(metadata.providers)) {
  //   console.log(metadata.providers);
  // }
  // const params = getParamNames(target);
  // if (metadataExtends) {
  //   metadataExtends(methodMetadata);
  // }
  // return Store.saveMethodMetadata(metaName, methodMetadata, context);
}
