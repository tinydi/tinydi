import { ScopeEnum } from '../enums/scope.enum';
import { ClassType, Identifier } from '../interface/decorators/decorator';
import { ClassMetadata } from '../interface/decorators/metadata/class-metadata.interface';

export class ClassDefinition implements ClassMetadata {
  identifier: Identifier;
  type: ClassType;
  alias: string;
  decorator: string;
  scope: ScopeEnum;
}
