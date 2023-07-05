import { IClassDefinition } from '../interface/definitions/class.definition.interface';
import { PropertyMetadata } from '../interface/decorators/metadata/property-metadata.interface';
import { ClassType } from '../interface/common/type';
import { Scope } from '../enums/scope.enum';

export class ClassDefinition implements IClassDefinition {
  id: string = null;
  uuid: string = null;
  namespaces: string[] = [];
  decorators: string[] = [];
  scope: Scope = Scope.Singleton;
  fields: PropertyMetadata[] = [];
  type: ClassType;
}
