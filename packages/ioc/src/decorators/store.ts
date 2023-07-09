import { SymbolMetadata } from '../utils/symbol.utils';
import { ProviderMetadata } from '../interface/decorators/metadata/provide.metadata';
import { DecoratorTarget } from '../interface/decorators/decorator';
import { Identifier, isIdentifier } from '../interface/common/identifier';
import { INJECT_DECORATOR, INJECT_FIELD_DECORATOR, PROVIDE_DECORATOR } from './constant';
import { generateUUID } from '../utils/uui.utils';
import { camelCase } from '../utils/camelcase.utils';
import { InjectMode } from '../enums/inject-mode.enum';
import { Types } from '../utils/types.utils';
import { FieldMetadata } from '../interface/decorators/metadata/field.metadata';

export namespace Store {
  import isPrimitiveType = Types.isPrimitiveType;
  import isClass = Types.isClass;
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
      dataMap = new Map<Identifier, any>();
      storeMap.set(target, dataMap);
    } else {
      dataMap = storeMap.get(target);
    }
    return dataMap;
  };
  export function getMetadataKeys(target: DecoratorTarget) {
    return Array.from(getDataContainer(getDecoratorMetadata(target)).keys());
  }

  export function getTargetMetadata(target: DecoratorTarget) {
    return getDataContainer(getDecoratorMetadata(target));
  }

  export function saveMetadata(target: DecoratorTarget, decorator: Identifier, data: any) {
    const dataContainer = getDataContainer(getDecoratorMetadata(target));
    dataContainer.set(decorator, data);
  }

  export function getMetadata(target: DecoratorTarget, decorator: Identifier) {
    const dataContainer = getDataContainer(getDecoratorMetadata(target));
    return dataContainer.get(decorator);
  }

  export function hasMetadata(target: DecoratorTarget, decorator: Identifier): boolean {
    const dataContainer = getDataContainer(getDecoratorMetadata(target));
    return dataContainer.has(decorator);
  }

  export function saveProviderMetadata(data: ProviderMetadata, target: DecoratorTarget) {
    if (hasProviderMetadata(target)) {
      const meta = getProviderMetadata(target);
      // update identifier
      if (data.identifier) {
        if (meta.identifier !== data.identifier) {
          meta.identifier = data.identifier;
        }
      }
      // update scope
      if (data.scope) {
        if (meta.scope !== data.scope) {
          meta.scope = data.scope;
        }
      }
      saveMetadata(target, PROVIDE_DECORATOR, meta);
    } else {
      const uuid = generateUUID();
      saveMetadata(target, PROVIDE_DECORATOR, {
        identifier: data.identifier,
        uuid: uuid,
        name: camelCase(target.name?.toString()),
        originName: target.name,
        scope: data.scope,
      } as ProviderMetadata);
    }
    return target;
  }

  export function getProviderMetadata(target: DecoratorTarget): ProviderMetadata {
    return getMetadata(target, PROVIDE_DECORATOR);
  }

  export function hasProviderMetadata(target: DecoratorTarget): boolean {
    return hasMetadata(target, PROVIDE_DECORATOR);
  }

  export function saveInjectMetadata(target: DecoratorTarget, decorator: Identifier, data: any) {
    let dataMap: Map<Identifier, any>;
    if (!hasMetadata(target, INJECT_DECORATOR)) {
      dataMap = new Map<Identifier, any>();
      saveMetadata(target, INJECT_DECORATOR, dataMap);
    } else {
      dataMap = getMetadata(target, INJECT_DECORATOR);
    }
    dataMap.set(decorator, data);
    saveMetadata(target, INJECT_DECORATOR, dataMap);
  }

  export function getInjectMetadata(target: DecoratorTarget, decorator: Identifier) {
    const dataMap = getMetadata(target, INJECT_DECORATOR);
    if (dataMap) {
      return dataMap.get(decorator);
    }
    return undefined;
  }

  export function hasInjectMetadata(target: DecoratorTarget, decorator: Identifier) {
    const dataMap = getMetadata(target, INJECT_DECORATOR);
    if (dataMap) {
      return dataMap.has(decorator);
    }
    return false;
  }

  export function saveInjectFieldMetadata(target: ClassFieldDecoratorContext, provider: any) {
    let dataMap: Map<Identifier, any>;
    if (!hasInjectMetadata(target, INJECT_FIELD_DECORATOR)) {
      dataMap = new Map<Identifier, any>();
    } else {
      dataMap = getInjectMetadata(target, INJECT_FIELD_DECORATOR);
    }
    const metadata = {} as FieldMetadata;
    metadata.static = target.static;
    metadata.private = target.private;
    metadata.access = target.access;
    metadata.propertyKey = target.name;
    if (!provider) {
      metadata.identifier = target.name;
      metadata.injectMode = InjectMode.PropertyKey;
    } else {
      if (!isPrimitiveType(provider) && isClass(provider)) {
        metadata.identifier = Store.getProviderMetadata(provider).uuid;
        metadata.injectMode = InjectMode.Class;
      }
      if (!metadata.identifier) {
        if (isIdentifier(provider)) {
          metadata.identifier = provider as Identifier;
          metadata.injectMode = InjectMode.Identifier;
        }
      }
      if (!metadata.identifier) {
        metadata.identifier = target.name;
        metadata.injectMode = InjectMode.PropertyKey;
      }
    }
    dataMap.set(metadata.propertyKey, metadata);
    saveInjectMetadata(target, INJECT_FIELD_DECORATOR, dataMap);
  }

  export function getInjectFieldMetadata(target: ClassFieldDecoratorContext, decorator: Identifier) {
    const dataMap = getInjectMetadata(target, INJECT_FIELD_DECORATOR);
    if (dataMap) {
      return dataMap.get(decorator);
    }
    return undefined;
  }

  export function getInjectFieldsMetadata(target: DecoratorTarget) {
    return getInjectMetadata(target, INJECT_FIELD_DECORATOR);
  }

  export function saveInjectMethodMetadata(target: ClassMethodDecoratorContext, providers: any) {}

  export function saveExtraMetadata() {}

  export function getExtraMetadata() {}

  export function hasExtraMetadata() {}

  // export function saveClassMetadata<T>(decorator: Identifier, data: T, target: DecoratorTarget, merge?: boolean) {
  //   if (merge && typeof data === 'object') {
  //     const originData = getClassMetadata(decorator, target);
  //     if (!originData) {
  //       return saveMetadata(INJECT_CLASS_DECORATOR, target, data, decorator);
  //     }
  //     if (Array.isArray(originData)) {
  //       return saveMetadata(INJECT_CLASS_DECORATOR, target, originData.concat(data), decorator);
  //     } else {
  //       return saveMetadata(INJECT_CLASS_DECORATOR, target, Object.assign(originData, data), decorator);
  //     }
  //   }
  //   return saveMetadata(INJECT_CLASS_DECORATOR, target, data, decorator);
  // }
  //
  // export function getClassMetadata<T>(decorator: Identifier, target: DecoratorTarget): T {
  //   return getMetadata(INJECT_CLASS_DECORATOR, target, decorator);
  // }
  //
  // export function hasClassMetadata(decorator: Identifier, target: DecoratorTarget) {
  //   return hasMetadata(INJECT_CLASS_DECORATOR, target, decorator);
  // }
  //
  // export function saveProvide(data: ProvideMetadata, target: DecoratorTarget) {
  //   if (isProvide(target)) {
  //     const meta = getClassMetadata<ProvideMetadata>(PROVIDE_DECORATOR, target);
  //     // update identifier
  //     if (data.identifier) {
  //       if (meta.identifier !== data.identifier) {
  //         meta.identifier = data.identifier;
  //       }
  //     }
  //     // update scope
  //     if (data.scope) {
  //       if (meta.scope !== data.scope) {
  //         meta.scope = data.scope;
  //       }
  //     }
  //     saveClassMetadata(PROVIDE_DECORATOR, meta, target);
  //   } else {
  //     const uuid = generateUUID();
  //     saveClassMetadata(
  //       PROVIDE_DECORATOR,
  //       {
  //         identifier: data.identifier,
  //         uuid: uuid,
  //         name: camelCase(target.name?.toString()),
  //         originName: target.name,
  //         scope: data.scope,
  //       } as ProvideMetadata,
  //       target
  //     );
  //   }
  //   return target;
  // }
  //
  // export function isProvide(target: DecoratorTarget) {
  //   return hasClassMetadata(PROVIDE_DECORATOR, target);
  // }
  //
  // export function getProvideUUID(provider) {
  //   const metaData = getClassMetadata<ProvideMetadata>(PROVIDE_DECORATOR, provider);
  //   if (metaData && metaData.uuid) {
  //     return metaData.uuid;
  //   }
  //   return undefined;
  // }
  //
  // export function attachClassMetadata(dataKey: Identifier, data: any, target: any, groupBy?: Identifier, groupMode: GroupModeType = 'one') {
  //   let m: Map<Identifier, any>;
  //   if (hasMetadata(INJECT_CLASS_DECORATOR, target, dataKey)) {
  //     m = getMetadata(INJECT_CLASS_DECORATOR, target, dataKey);
  //   } else {
  //     m = new Map<Identifier, any>();
  //   }
  //   if (groupBy) {
  //     if (groupMode === 'one') {
  //       m.set(groupBy, data);
  //     } else {
  //       if (m.get(groupBy)) {
  //         m.get(groupBy).push(data);
  //       } else {
  //         m.set(groupBy, [data]);
  //       }
  //     }
  //   } else {
  //     if (m.get(dataKey)) {
  //       m.get(dataKey).push(data);
  //     } else {
  //       m.set(dataKey, [data]);
  //     }
  //   }
  //   saveMetadata(INJECT_CLASS_DECORATOR, target, m, dataKey);
  // }
  // export function saveFieldMetadata(provide: any, target: ClassFieldDecoratorContext) {
  //   const metadata = {} as FieldMetadata;
  //   metadata.static = target.static;
  //   metadata.private = target.private;
  //   metadata.access = target.access;
  //   metadata.propertyKey = target.name;
  //   if (!provide) {
  //     metadata.identifier = target.name;
  //     metadata.injectMode = InjectMode.PropertyKey;
  //   } else {
  //     if (!isPrimitiveType(provide) && isClass(provide)) {
  //       const uuid = Store.getProvideUUID(provide);
  //       metadata.identifier = uuid;
  //       metadata.injectMode = InjectMode.Class;
  //     }
  //     if (!metadata.identifier) {
  //       if (isIdentifier(provide)) {
  //         metadata.identifier = provide as Identifier;
  //         metadata.injectMode = InjectMode.Identifier;
  //       }
  //     }
  //     if (!metadata.identifier) {
  //       metadata.identifier = target.name;
  //       metadata.injectMode = InjectMode.PropertyKey;
  //     }
  //   }
  //   attachClassMetadata(INJECT_FIELD_DECORATOR, metadata, target, metadata.propertyKey);
  // }
  //
  // export function getFieldMetadata(target: ClassFieldDecoratorContext) {
  //   console.log(target);
  // }
  //
  // export function saveMethodMetadata(provide: ProviderIdentifier, target: ClassMethodDecoratorContext) {
  //   console.log(provide, target);
  // }
}
