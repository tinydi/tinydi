import { ClassType } from '../interface/common/type';
import { SymbolMetadata } from '../utils/symbol.utils';
import { ClassMetadata } from '../interface/decorators/metadata/class-metadata.interface';
import { PropertyMetadata } from '../interface/decorators/metadata/property-metadata.interface';
import { IClassDefinition } from '../interface/definitions/class.definition.interface';

export namespace Store {
  // Mapping of decorator metadata
  const decoratorContext = new Map<string, DecoratorMetadata>();
  // Mapping of metadata class
  const classStore = new WeakMap<any, IClassDefinition>();
  const getDecoratorMetadata = (target: ClassType | DecoratorContext | DecoratorMetadata): DecoratorMetadata => {
    if (target[SymbolMetadata]) {
      target = target[SymbolMetadata];
    } else if ((target as DecoratorContext)?.metadata) {
      target = (target as DecoratorContext).metadata;
    }
    return target as DecoratorMetadata;
  };
  export function saveClassMetadata(decorator: string, metadata: ClassMetadata, target: ClassType);
  export function saveClassMetadata(decorator: string, metadata: ClassMetadata, decoratorContext: DecoratorContext);
  export function saveClassMetadata(decorator: string, metadata: ClassMetadata, decoratorMetadata: DecoratorMetadata);
  export function saveClassMetadata(decorator: string, metadata: ClassMetadata, decoratorMetadata: ClassType | DecoratorContext | DecoratorMetadata) {
    const target = getDecoratorMetadata(decoratorMetadata);
    // If present, it indicates that the class has been scanned
    if (!classStore.has(target)) {
      classStore.set(target, {} as IClassDefinition);
    }
  }

  export function saveFieldMetadata(decorator: string, metadata: PropertyMetadata, taget: ClassType);
  export function saveFieldMetadata(decorator: string, metadata: PropertyMetadata, decoratorContext: DecoratorContext);
  export function saveFieldMetadata(decorator: string, metadata: PropertyMetadata, decoratorMetadata: DecoratorMetadata);
  export function saveFieldMetadata(decorator: string, metadata: PropertyMetadata, decoratorMetadata: ClassType | DecoratorContext | DecoratorMetadata) {
    const target = getDecoratorMetadata(decoratorMetadata);
    let classDefinition: IClassDefinition;
    if (!classStore.has(target)) {
      classDefinition = {} as IClassDefinition;
      classStore.set(target, classDefinition);
    } else {
      classDefinition = classStore.get(target);
    }
    let fieldDefinition: PropertyMetadata[];
    if (!classDefinition.fields) {
      fieldDefinition = [];
      classDefinition.fields = fieldDefinition;
    } else {
      fieldDefinition = classDefinition.fields;
    }
    fieldDefinition.push(metadata);
  }

  export function getClassDefinition(decorator: string) {}
  // /**
  //  * save metadata to store.
  //  * @param {string} decorator name of decorator
  //  * @param {any} metadata metadata to save
  //  * @param {DecoratorMetadata} decoratorMetadata  decorator metadata of decorator context
  //  */
  // export function saveMetadata<T = unknown>(decorator: string, metadata: T, decoratorMetadata: DecoratorMetadata);
  // /**
  //  * save metadata to store.
  //  * @param {string} decorator decorator name of decorator.
  //  * @param {T extends unknown} metadata  decorator metadata of decorator context
  //  * @param {DecoratorContext} context  decorator context of class
  //  */
  // export function saveMetadata<T = unknown>(decorator: string, metadata: T, context: DecoratorContext);
  // /**
  //  * save metadata to store.
  //  * @param {string} decorator
  //  * @param {metadata} metadata metadata of decorator.
  //  * @param {ClassType} target
  //  */
  // export function saveMetadata<T = unknown>(decorator: string, metadata: T, target: ClassType);
  // export function saveMetadata<T = unknown>(decorator: string, metadata: T, decoratorMetadata: DecoratorMetadata | DecoratorContext | ClassType) {
  //   if (decoratorMetadata[SymbolMetadata]) {
  //     decoratorMetadata = decoratorMetadata[SymbolMetadata];
  //   } else if ((decoratorMetadata as DecoratorContext)?.metadata) {
  //     decoratorMetadata = (decoratorMetadata as DecoratorContext).metadata;
  //   }
  //   try {
  //     if (!classStore.has(decoratorMetadata)) {
  //       classStore.set(decoratorMetadata, new Map<string, any>());
  //     }
  //     classStore.get(decoratorMetadata).set(decorator, metadata);
  //   } catch (e) {
  //     console.warn(`can not set metadata ${e}`);
  //   }
  // }
  //
  // /**
  //  * get metadata from store.
  //  * @param {string} decorator name of decorator.
  //  * @param {ClassType} target target class.
  //  * @returns {any}
  //  */
  // export function getMetadata<T = unknown>(decorator: string, target: ClassType): T;
  // /**
  //  * get metadata from store.
  //  * @param {string} decorator name of decorator.
  //  * @param {DecoratorContext} context context of target class.
  //  * @returns {any}
  //  */
  // export function getMetadata<T = unknown>(decorator: string, decoratorContext: DecoratorContext): T;
  // /**
  //  * get metadata from store.
  //  * @param {string} decorator name of decorator.
  //  * @param {DecoratorContext} decoratorMetadata decorator metadata of decorator context.
  //  * @returns {any}
  //  */
  // export function getMetadata<T = unknown>(decorator: string, decoratorMetadata: DecoratorMetadata): T;
  // /**
  //  * get metadata from store.
  //  * @param decorator
  //  * @param decoratorMetadata {DecoratorMetadata|DecoratorContext|ClassType}
  //  * @returns {any}
  //  */
  // export function getMetadata<T = unknown>(decorator: string, decoratorMetadata: DecoratorMetadata | DecoratorContext | ClassType): T {
  //   if (decoratorMetadata[SymbolMetadata]) {
  //     decoratorMetadata = decoratorMetadata[SymbolMetadata];
  //   } else if ((decoratorMetadata as DecoratorContext)?.metadata) {
  //     decoratorMetadata = (decoratorMetadata as DecoratorContext).metadata;
  //   }
  //   if (!classStore.has(decoratorMetadata)) {
  //     return null;
  //   }
  //   return classStore.get(decoratorMetadata).get(decorator);
  // }
  // /**
  //  * store have metadata or not.
  //  * @param decorator {string} name of decorator.
  //  * @param target {ClassType} target class.
  //  */
  // export function hasMetadata(decorator: string, target: ClassType): boolean;
  //
  // /**
  //  * store have metadata or not.
  //  * @param decorator {string} name of decorator.
  //  * @param context {DecoratorContext} context of target class.
  //  */
  // export function hasMetadata(decorator: string, context: DecoratorContext): boolean;
  //
  // /**
  //  * store have metadata or not.
  //  * @param decorator {string} name of decorator.
  //  * @param decoratorMetadata {DecoratorMetadata} decorator metadata of decorator context.
  //  */
  // export function hasMetadata(decorator: string, decoratorMetadata: DecoratorMetadata): boolean;
  // export function hasMetadata(decorator: string, decoratorMetadata: ClassType | DecoratorContext | DecoratorMetadata): boolean {
  //   if (decoratorMetadata[SymbolMetadata]) {
  //     decoratorMetadata = decoratorMetadata[SymbolMetadata];
  //   } else if ((decoratorMetadata as DecoratorContext)?.metadata) {
  //     decoratorMetadata = (decoratorMetadata as DecoratorContext).metadata;
  //   }
  //   return classStore.has(decoratorMetadata) && classStore.get(decoratorMetadata).has(decorator);
  // }
}
