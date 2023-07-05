import { ClassType } from '../interface/common/type';
import { SymbolMetadata } from '../utils/symbol.utils';
import { ClassMetadata } from '../interface/decorators/metadata/class-metadata.interface';
import { PropertyMetadata } from '../interface/decorators/metadata/property-metadata.interface';
import { IClassDefinition } from '../interface/definitions/class.definition.interface';
import { generateUUID } from '../utils/uui.utils';

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
    let classDefinition: IClassDefinition;
    if (!classStore.has(target)) {
      const decoratorName = metadata.decorator;
      decoratorName && delete metadata['decorator'];
      classDefinition = {
        uuid: generateUUID(), // guid
        decorators: [decoratorName],
        namespaces: [metadata],
        type: metadata.type,
      } as IClassDefinition;
      classStore.set(target, classDefinition);
    } else {
      classDefinition = classStore.get(target);
    }
  }

  export function saveFieldMetadata(decorator: string, metadata: PropertyMetadata, target: ClassType);
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

  export function getClassDefinition(decorator: string, target: ClassType): ClassMetadata;
  export function getClassDefinition(decorator: string, decoratorContext: DecoratorContext): ClassMetadata;
  export function getClassDefinition(decorator: string, decoratorMetadata: DecoratorMetadata): ClassMetadata;
  export function getClassDefinition(decorator: string, decoratorMetadata: ClassType | DecoratorContext | DecoratorMetadata): ClassMetadata {
    const metadata = {} as ClassMetadata;
    const target = getDecoratorMetadata(decoratorMetadata);
    if (!classStore.has(target)) {
      return {} as IClassDefinition;
    }
    return classStore.get(target);
  }
}
