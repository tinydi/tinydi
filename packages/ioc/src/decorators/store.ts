import { ClassType } from '../interface/common/type';
import { SymbolMetadata } from '../utils/symbol.utils';
import { ClassMetadata } from '../interface/decorators/metadata/class-metadata.interface';
import { FieldMetadata } from '../interface/decorators/metadata/field-metadata.interface';
import { IClassDefinition } from '../interface/definitions/class.definition.interface';
import { FieldsDefinition } from '../definitions/fields.definition';
import { IFieldsDefinition } from '../interface/definitions/fields.definition.interface';
import { ClassDefinition } from '../definitions/class.definition';
import { generateUUID } from '../utils/uui.utils';
import { MethodMetadata } from '../interface/decorators/metadata/method-metadata.interface';

export namespace Store {
  // Mapping of decorator metadata
  const decoratorContext = new Map<string, DecoratorMetadata>();
  // Mapping of metadata class
  const classStore = new WeakMap<any, IClassDefinition<ClassMetadata>>();
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
    let classDefinition: IClassDefinition<ClassMetadata>;
    if (!classStore.has(target)) {
      classDefinition = new ClassDefinition();
      classStore.set(target, classDefinition);
    } else {
      classDefinition = classStore.get(target);
      if (classDefinition.uuid) {
        if (metadata.identifier) {
          if (classDefinition.id !== metadata.identifier) {
            classDefinition.id = metadata.identifier;
            console.debug(`update provide: ${target.name} -> ${classDefinition.uuid}`);
          }
        }
      } else {
        classDefinition.id = metadata.identifier;
        classDefinition.uuid = generateUUID();
        classDefinition.type = metadata.type;
        classDefinition.scope = metadata.scope;
        classDefinition.name = metadata.name;
      }
    }
    classDefinition.decorators.push(metadata.decorator);
    classDefinition.namespaces.push(metadata.namespace ?? 'root');
    console.log(classStore.get(target));
  }

  export function saveFieldMetadata(decorator: string, metadata: FieldMetadata, target: ClassType);
  export function saveFieldMetadata(decorator: string, metadata: FieldMetadata, decoratorContext: DecoratorContext);
  export function saveFieldMetadata(decorator: string, metadata: FieldMetadata, decoratorMetadata: DecoratorMetadata);
  export function saveFieldMetadata(decorator: string, metadata: FieldMetadata, decoratorMetadata: ClassType | DecoratorContext | DecoratorMetadata) {
    const target = getDecoratorMetadata(decoratorMetadata);
    let classDefinition: IClassDefinition<ClassMetadata>;
    if (!classStore.has(target)) {
      classDefinition = new ClassDefinition();
      classStore.set(target, classDefinition);
    } else {
      classDefinition = classStore.get(target);
    }
    let fieldDefinition: IFieldsDefinition<ClassMetadata>;
    if (!classDefinition.fields) {
      fieldDefinition = new FieldsDefinition();
      classDefinition.fields = new FieldsDefinition();
    } else {
      fieldDefinition = classDefinition.fields;
    }
    fieldDefinition.setField(metadata.propertyKey, metadata);
    console.log(classStore.get(target));
  }

  export function saveMergerDefinition(decorator: string, metadata: ClassMetadata, target: ClassType);
  export function saveMergerDefinition(decorator: string, metadata: ClassMetadata, decoratorContext: DecoratorContext);
  export function saveMergerDefinition(decorator: string, metadata: ClassMetadata, decoratorMetadata: DecoratorMetadata);
  export function saveMergerDefinition(decorator: string, metadata: ClassMetadata, target: ClassType | DecoratorContext | DecoratorMetadata) {}

  export function saveMethodMetadata(decorator: string, metadata: MethodMetadata, target: ClassType);
  export function saveMethodMetadata(decorator: string, metadata: MethodMetadata, decoratorContext: DecoratorContext);
  export function saveMethodMetadata(decorator: string, metadata: MethodMetadata, decoratorMetadata: DecoratorMetadata);
  export function saveMethodMetadata(decorator: string, metadata: MethodMetadata, target: ClassType | DecoratorContext | DecoratorMetadata) {}
}
