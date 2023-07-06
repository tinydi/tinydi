import { FieldMetadata } from '../decorators/metadata/field-metadata.interface';
import { Identifier } from '../common/identifier';

export interface IFieldsDefinition<T extends FieldMetadata> {
  getFieldKeys(): Identifier[];
  getField(properKey: string | symbol, defaultValue?: T): T;
  setField(properKey: string | symbol, value: T): void;
}
