import '../utils/symbol.utils';
import { ClassMetadataFilter, IMetadataStore } from '../interface/decorators/store.interface';
import { ClassMetadata } from '../interface/decorators/metadata/class-metadata.interface';
import { DependenciesMetadata } from '../interface/decorators/metadata/dependencies-metadata.interface';

export class MetadataStore implements IMetadataStore {
  // context与metadata的映射
  #contextMetadata = new WeakMap<any, ClassMetadata>();
  saveClassMetadata<T extends ClassMetadata>(decoratorMetadata: DecoratorMetadata, metadata: T) {
    this.#contextMetadata.set(decoratorMetadata, metadata);
  }
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
if (typeof global === 'object') {
  if (global['TINYDI_GLOBAL_METADATA_STORE']) {
    console.warn('global metadata store already exists, please check @tinydi/core version by "npm ls @tinydi/core"');
    metadataStore = global['TINYDI_GLOBAL_METADATA_STORE'];
  } else {
    global['TINYDI_GLOBAL_METADATA_STORE'] = metadataStore;
  }
}
