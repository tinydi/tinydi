import { SymbolMetadata } from '../utils/symbol.utils';
import { ProvideMetadata } from '../interface/decorators/metadata/provide.metadata';
import { DecoratorTarget } from '../interface/decorators/decorator';
import { Identifier } from '../interface/common/identifier';
import { INJECT_CLASS_DECORATOR } from './constant';

export namespace Store {
  const storeMap = new WeakMap<DecoratorMetadataObject, any>();
  const getDecoratorMetadata = (target: DecoratorTarget): DecoratorMetadataObject => {
    if (target[SymbolMetadata]) {
      target = target[SymbolMetadata];
    } else if ((target as DecoratorContext)?.metadata) {
      target = (target as DecoratorContext).metadata;
    }
    return target as DecoratorMetadata;
  };
  const getDataContainer = (target: DecoratorMetadataObject): Map<Identifier, any> => {
    let dataMap;
    if (!storeMap.has(target)) {
      dataMap = new Map<string | symbol, any>();
      storeMap.set(target, dataMap);
    }
    return dataMap;
  };
  export function saveMetadata(decorator: Identifier, target: DecoratorTarget, key: Identifier, data: any) {
    const dataContainer = getDataContainer(getDecoratorMetadata(target));
    let dataMap: Map<Identifier, any>;
    if (dataContainer.has(decorator)) {
      dataMap = dataContainer.get(decorator);
    } else {
      dataMap = new Map<Identifier, any>();
    }
    dataMap.set(key, data);
  }

  export function getMetadata(decorator: Identifier, target: DecoratorTarget, key?: Identifier) {
    const dataContainer = getDataContainer(getDecoratorMetadata(target));
    let dataMap: Map<Identifier, any>;
    if (dataContainer.has(decorator)) {
      dataMap = dataContainer.get(decorator);
    } else {
      dataMap = new Map<Identifier, any>();
    }
    if (!key) return dataMap;
    return dataMap.get(key);
  }

  export function hasMetadata(decorator: Identifier, target: DecoratorTarget, key?: Identifier) {
    const dataContainer = getDataContainer(getDecoratorMetadata(target));
    if (!dataContainer.has(decorator)) return false;
    if (!key) return true;
    return dataContainer.get(decorator).has(key);
  }

  export function saveClassMetadata(decorator: Identifier, data: any, target: DecoratorTarget, merge?: boolean) {
    if (merge && typeof data === 'object') {
      const oldData = getClassMetadata(decorator, target);
      if (!oldData) {
        saveMetadata(INJECT_CLASS_DECORATOR, target, decorator, data);
      }
    }
  }

  export function getClassMetadata(decorator: Identifier, target: DecoratorTarget) {
    return getMetadata(INJECT_CLASS_DECORATOR, target, decorator);
  }

  export function hasClassMetadata(decorator: Identifier, target: DecoratorTarget) {}

  export function saveProvide(data: ProvideMetadata, target: DecoratorTarget) {}

  export function isProvide(target: DecoratorTarget) {}
}
