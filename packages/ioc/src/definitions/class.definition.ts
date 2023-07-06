import { IClassDefinition } from '../interface/definitions/class.definition.interface';
import { FieldMetadata } from '../interface/decorators/metadata/field-metadata.interface';
import { ClassType } from '../interface/common/type';
import { Scope } from '../enums/scope.enum';
import { FieldsDefinition } from './fields.definition';

export class ClassDefinition<T extends FieldMetadata> implements IClassDefinition<T> {
  protected _asynchronous = false;
  id: string = null;
  name: string;
  uuid: string = null;
  namespaces: string[] = [];
  decorators: string[] = [];
  scope: Scope = Scope.Singleton;
  type: ClassType;
  fields = new FieldsDefinition<T>();
  methods: FieldMetadata[];
  constructorMethod: string;
  initMethod: string;
  destroyMethod: string;
}
