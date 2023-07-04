import { Scope } from '../enums/scope.enum';
import { ClassMetadata } from '../interface/decorators/metadata/class-metadata.interface';
import { ClassType } from '../interface/common/type';
import { Identifier } from '../interface/common/identifier';

export class ClassDefinition implements ClassMetadata {
  identifier: Identifier;
  type: ClassType;
  decorator: string;
  scope: Scope;
}
