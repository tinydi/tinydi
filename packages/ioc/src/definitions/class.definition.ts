import { IClassDefinition } from '../interface/definitions/class.definition.interface';
import { FieldMetadata } from '../interface/decorators/options/field-options.interface';
import { ClassType } from '../interface/common/type';
import { Scope } from '../enums/scope.enum';
import { FieldsDefinition } from './fields.definition';
import { IFieldDefinition } from '../interface/definitions/field.definition.interface';
import { MethodsDefinition } from './methods.definition';
import { IMethodDefinition } from '../interface/definitions/method.definition.interface';

export class ClassDefinition<T extends IFieldDefinition, U extends IMethodDefinition> implements IClassDefinition<T, U> {
  protected _asynchronous = false;
  id: string = null;
  name: string;
  uuid: string = null;
  namespaces: string[] = [];
  decorators: string[] = [];
  scope: Scope = Scope.Singleton;
  type: ClassType;
  fields = new FieldsDefinition<T>();
  methods = new MethodsDefinition<U>();
  constructorMethod: string;
  initMethod: string;
  destroyMethod: string;
}
