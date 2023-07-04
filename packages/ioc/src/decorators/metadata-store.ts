import { IMetadataStore } from '../interface/decorators/metadata-store.interface';
import { ClassType } from '../interface/common/type';
import { SymbolMetadata } from '../utils/symbol.utils';

class MetadataStore implements IMetadataStore {
  // context与metadata的映射
  #contextMetadata = new WeakMap<any, Map<string, any>>();

  saveMetadata<T = unknown>(decorator: string, metadata: T, decoratorMetadata: DecoratorMetadata);
  saveMetadata<T = unknown>(decorator: string, metadata: T, context: DecoratorContext);
  saveMetadata<T = unknown>(decorator: string, metadata: T, target: ClassType);
  saveMetadata<T = unknown>(decorator: string, metadata: T, decoratorMetadata: DecoratorMetadata | DecoratorContext | ClassType) {
    if (decoratorMetadata[SymbolMetadata]) {
      decoratorMetadata = decoratorMetadata[SymbolMetadata];
    } else if ((decoratorMetadata as DecoratorContext)?.metadata) {
      decoratorMetadata = (decoratorMetadata as DecoratorContext).metadata;
    }
    try {
      if (!this.#contextMetadata.has(decoratorMetadata)) {
        this.#contextMetadata.set(decoratorMetadata, new Map<string, any>());
      }
      this.#contextMetadata.get(decoratorMetadata).set(decorator, metadata);
    } catch (e) {
      console.warn(`can not set metadata ${e}`);
    }
  }

  getMetadata<T = unknown>(decorator: string, target: ClassType): T;
  getMetadata<T = unknown>(decorator: string, decoratorContext: DecoratorContext): T;
  getMetadata<T = unknown>(decorator: string, decoratorMetadata: DecoratorMetadata): T;
  getMetadata<T = unknown>(decorator: string, decoratorMetadata: DecoratorMetadata | DecoratorContext | ClassType): T {
    if (decoratorMetadata[SymbolMetadata]) {
      decoratorMetadata = decoratorMetadata[SymbolMetadata];
    } else if ((decoratorMetadata as DecoratorContext)?.metadata) {
      decoratorMetadata = (decoratorMetadata as DecoratorContext).metadata;
    }
    if (!this.#contextMetadata.has(decoratorMetadata)) {
      return null;
    }
    return this.#contextMetadata.get(decoratorMetadata).get(decorator);
  }

  hasMetadata(decorator: string, target: ClassType): boolean;
  hasMetadata(decorator: string, context: DecoratorContext): boolean;
  hasMetadata(decorator: string, decoratorMetadata: DecoratorMetadata): boolean;
  hasMetadata(decorator: string, decoratorMetadata: ClassType | DecoratorContext | DecoratorMetadata): boolean {
    if (decoratorMetadata[SymbolMetadata]) {
      decoratorMetadata = decoratorMetadata[SymbolMetadata];
    } else if ((decoratorMetadata as DecoratorContext)?.metadata) {
      decoratorMetadata = (decoratorMetadata as DecoratorContext).metadata;
    }
    return this.#contextMetadata.has(decoratorMetadata) && this.#contextMetadata.get(decoratorMetadata).has(decorator);
  }
}
let metadataStore = new MetadataStore();
if (Symbol['metadataStore']) {
  metadataStore = Symbol['metadataStore'];
  console.warn('global metadata store already exists, please check @tinydi/core version by "npm ls @tinydi/core"');
} else {
  Symbol['metadataStore'] = metadataStore;
}

export function saveClassMetadata(decorator: string, metadata: any, context: ClassDecoratorContext) {
  return metadataStore.saveMetadata(decorator, metadata, context);
}

export function getClassMetadata(decorator: string, context: ClassDecoratorContext): any {
  return metadataStore.getMetadata(decorator, context);
}

export function getFieldMetadata(decorator: string, context: ClassFieldDecoratorContext): any {
  return metadataStore.getMetadata(decorator, context);
}

export function setFieldMetadata(decorator: string, metadata: any, context: ClassFieldDecoratorContext) {
  return metadataStore.saveMetadata(decorator, metadata, context);
}
