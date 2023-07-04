import '../utils/symbol.utils';
import { ClassMetadataFilter, IMetadataStore } from '../interface/decorators/metadata-store.interface';
import { ClassMetadata } from '../interface/decorators/metadata/class-metadata.interface';
import { DependenciesMetadata } from '../interface/decorators/metadata/dependencies-metadata.interface';

class MetadataStore implements IMetadataStore {
  // context与metadata的映射
  #contextMetadata = new WeakMap<any, ClassMetadata>();
  saveMetadata(decorator: string, metadata: any, context: ClassDecoratorContext) {}
  getClassMetadata<T extends ClassMetadata>(decoratorMetadata: DecoratorMetadata): T {
    return null;
  }
  saveDependenciesMetadata<T extends DependenciesMetadata>(decoratorMetadata: DecoratorMetadata, metadata: T) {
    if (this.#contextMetadata.has(decoratorMetadata)) {
      this.#contextMetadata.get(decoratorMetadata).dependencies.push(metadata);
    } else {
      this.#contextMetadata.set(decoratorMetadata, {
        dependencies: [metadata],
      } as ClassMetadata);
    }
  }
  getDependenciesMetadata<T extends DependenciesMetadata>(decoratorMetadata: DecoratorMetadata): T[] {
    return null;
  }
  listClassMetadata<T extends ClassMetadata>(filter?: ClassMetadataFilter): T[] {
    const result: T[] = [];
    for (const contextMetadata in this.#contextMetadata) {
      if (filter && !filter(this.#contextMetadata.get(contextMetadata))) {
        continue;
      }
      result.push(this.#contextMetadata.get(contextMetadata) as T);
    }
    return result;
  }
}
let metadataStore = new MetadataStore();
if (Symbol['metadataStore']) {
  metadataStore = Symbol['metadataStore'];
  console.warn('global metadata store already exists, please check @tinydi/core version by "npm ls @tinydi/core"');
} else {
  Symbol['metadataStore'] = metadataStore;
}
