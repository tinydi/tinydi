import { ClassType } from '../interface/common/type';
import { SymbolMetadata } from '../utils/symbol.utils';
import { IClassDefinition } from '../interface/definitions/class.definition.interface';
import { IFieldDefinition } from '../interface/definitions/field.definition.interface';
import { IMethodDefinition } from '../interface/definitions/method.definition.interface';

export namespace Store {
  // Mapping of decorator options
  const decoratorContext = new Map<string, DecoratorMetadata>();
  // Mapping of options class
  const classStore = new WeakMap<any, IClassDefinition<IFieldDefinition, IMethodDefinition>>();
  const getDecoratorMetadata = (target: ClassType | DecoratorContext | DecoratorMetadata): DecoratorMetadata => {
    if (target[SymbolMetadata]) {
      target = target[SymbolMetadata];
    } else if ((target as DecoratorContext)?.metadata) {
      target = (target as DecoratorContext).metadata;
    }
    return target as DecoratorMetadata;
  };
  export function saveClassMetadata(decorator: string, metadata: IClassDefinition<IFieldDefinition, IMethodDefinition>, target: ClassType);
  export function saveClassMetadata(decorator: string, metadata: IClassDefinition<IFieldDefinition, IMethodDefinition>, decoratorContext: DecoratorContext);
  export function saveClassMetadata(decorator: string, metadata: IClassDefinition<IFieldDefinition, IMethodDefinition>, decoratorMetadata: DecoratorMetadata);
  export function saveClassMetadata(
    decorator: string,
    metadata: IClassDefinition<IFieldDefinition, IMethodDefinition>,
    decoratorMetadata: ClassType | DecoratorContext | DecoratorMetadata
  ) {
    // const target = getDecoratorMetadata(decoratorMetadata);
    // let classDefinition: IClassDefinition<IFieldDefinition, IMethodDefinition>;
    // if (!classStore.has(target)) {
    //   classDefinition = new ClassDefinition();
    //   classStore.set(target, classDefinition);
    // } else {
    //   classDefinition = classStore.get(target);
    //   if (classDefinition.uuid) {
    //     if (metadata.identifier) {
    //       if (classDefinition.id !== metadata.identifier) {
    //         classDefinition.id = metadata.identifier;
    //         console.debug(`update provide: ${target.name} -> ${classDefinition.uuid}`);
    //       }
    //     }
    //   } else {
    //     classDefinition.id = metadata.identifier;
    //     classDefinition.uuid = generateUUID();
    //     classDefinition.type = metadata.type;
    //     classDefinition.scope = metadata.scope;
    //     classDefinition.name = metadata.name;
    //   }
    // }
    // classDefinition.decorators.push(decorator);
    // classDefinition.namespaces.push(metadata.namespace ?? 'root');
    // console.log(classStore.get(target));
  }

  export function saveFieldMetadata(decorator: string, metadata: IFieldDefinition, target: ClassType);
  export function saveFieldMetadata(decorator: string, metadata: IFieldDefinition, decoratorContext: DecoratorContext);
  export function saveFieldMetadata(decorator: string, metadata: IFieldDefinition, decoratorMetadata: DecoratorMetadata);
  export function saveFieldMetadata(decorator: string, metadata: IFieldDefinition, decoratorMetadata: ClassType | DecoratorContext | DecoratorMetadata) {
    // const target = getDecoratorMetadata(decoratorMetadata);
    // let classDefinition: IClassDefinition<ClassOptions>;
    // if (!classStore.has(target)) {
    //   classDefinition = new ClassDefinition();
    //   classStore.set(target, classDefinition);
    // } else {
    //   classDefinition = classStore.get(target);
    // }
    // let fieldDefinition: IFieldsDefinition<ClassOptions>;
    // if (!classDefinition.fields) {
    //   fieldDefinition = new FieldsDefinition();
    //   classDefinition.fields = new FieldsDefinition();
    // } else {
    //   fieldDefinition = classDefinition.fields;
    // }
    // fieldDefinition.setField(metadata.propertyKey, metadata);
    // console.log(classStore.get(target));
  }

  // export function saveMergerDefinition(decorator: string, metadata: ClassOptions, target: ClassType);
  // export function saveMergerDefinition(decorator: string, metadata: ClassOptions, decoratorContext: DecoratorContext);
  // export function saveMergerDefinition(decorator: string, metadata: ClassOptions, decoratorMetadata: DecoratorMetadata);
  // export function saveMergerDefinition(decorator: string, metadata: ClassOptions, target: ClassType | DecoratorContext | DecoratorMetadata) {}

  export function saveMethodMetadata(decorator: string, metadata: IMethodDefinition, target: ClassType);
  export function saveMethodMetadata(decorator: string, metadata: IMethodDefinition, decoratorContext: DecoratorContext);
  export function saveMethodMetadata(decorator: string, metadata: IMethodDefinition, decoratorMetadata: DecoratorMetadata);
  export function saveMethodMetadata(decorator: string, metadata: IMethodDefinition, target: ClassType | DecoratorContext | DecoratorMetadata) {}
}
