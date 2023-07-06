import { Types } from '../utils/types.utils';
import { ArgsContext, ArgsIteratorAction } from './args';
import { Metadata } from '../interface/decorators/metadata/metadata.interface';
import { chain } from '../interface/common/handler';
import { ClassMetadata } from '../interface/decorators/metadata/class-metadata.interface';

import { camelCase } from '../utils/camelcase.utils';
import { FieldMetadata } from '../interface/decorators/metadata/field-metadata.interface';
import { InjectMode } from '../enums/inject-mode.enum';
import { AutowiredMetadata } from '../interface/decorators/metadata/autowired-metadata.interface';
import { MethodMetadata } from '../interface/decorators/metadata/method-metadata.interface';
import { Store } from './store';
import { Runtime } from '../utils/runtime.utils';
import isMetadataObject = Types.isMetadataObject;
import isClass = Types.isClass;
import getParamNames = Runtime.getParamNames;

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
 * @param {ArgsIteratorAction<T>[]} [actions]  metadata iterator action.
 * @param {MetadataExtends<T>} [metadataExtends] add extents for metadata.
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
        ctx.metadata.identifier = ctx.currArg;
        ctx.next(next);
      },
      (ctx, next) => {
        ctx.metadata.scope = ctx.currArg;
        ctx.next(next);
      }
    );
  }
  const decorator = createDecorator<T>(name, actions, metadataExtends);
  return decorator;
}

/**
 * create field method param decorator
 * @param name {string} decorator name
 * @param actions {ArgsIteratorAction<T extends FieldMetadata>[]} metadata iterator action.metadata iterator action.
 * @param metadataExtends {MetadataExtends<T extends FieldMetadata>} add extents for metadata.
 */
export function createMethodPropParamDecorator<T extends AutowiredMetadata>(name: string, actions?: ArgsIteratorAction<T>[], metadataExtends?: MetadataExtends<T>) {
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
  const decorator = createDecorator<T>(name, actions, metadataExtends);
  return decorator;
}

function argsToMetadata<T extends Metadata>(args: any[], actions?: ArgsIteratorAction<T>[]): T {
  let metadata: T = null;
  if (args.length) {
    if (args.length === 1 && isMetadataObject(args[0])) {
      metadata = args[0];
    } else if (actions) {
      const ctx = new ArgsContext<T>(args);
      chain(actions, ctx);
      metadata = ctx.getMetadate();
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

function storeClassMetadata<T extends ClassMetadata>(name: string, metaName: string, target: any, context: DecoratorContext, metadata?: any, metadataExtends?: MetadataExtends<T>) {
  const classMetadata = (metadata || {}) as T;
  if (!classMetadata.type) {
    classMetadata.type = target;
  }
  classMetadata.decorator = name;
  classMetadata.name = camelCase(context.name.toString());
  classMetadata.originalName = context.name.toString();
  if (metadataExtends) {
    metadataExtends(classMetadata);
  }
  Store.saveClassMetadata(metaName, classMetadata, context);
}

function storeFieldMetadata<T extends FieldMetadata>(
  name: string,
  metaName: string,
  target: any,
  context: ClassFieldDecoratorContext,
  metadata?: any,
  metadataExtends?: MetadataExtends<T>
) {
  const fieldMetadata = (metadata || {}) as T;
  fieldMetadata.propertyKey = context.name;
  fieldMetadata.decorator = name;
  fieldMetadata.access = context.access;
  if (fieldMetadata.provider) {
    if (isClass(fieldMetadata.provider)) {
      fieldMetadata.injectMode = InjectMode.Class;
    } else {
      fieldMetadata.injectMode = InjectMode.Identifier;
    }
  } else {
    fieldMetadata.injectMode = InjectMode.PropertyKey;
  }
  if (metadataExtends) {
    metadataExtends(fieldMetadata);
  }
  return Store.saveFieldMetadata(metaName, fieldMetadata, context);
}

function storeMethodMetadata<T extends MethodMetadata>(
  name: string,
  metaName: string,
  target: any,
  context: ClassMethodDecoratorContext,
  metadata?: any,
  metadataExtends?: MetadataExtends<T>
) {
  const methodMetadata = (metadata || {}) as T;
  methodMetadata.propertyKey = context.name;
  methodMetadata.decorator = name;
  methodMetadata.access = context.access;
  if (metadata.providers && Types.isArray(metadata.providers)) {
    metadata.providers.forEach(provider => {});
  }
  const params = getParamNames(target);
  if (metadataExtends) {
    metadataExtends(methodMetadata);
  }
  return Store.saveMethodMetadata(metaName, methodMetadata, context);
}
