import { FieldMetadata } from '../decorators/options/field-options.interface';
import { Identifier } from '../common/identifier';
import { IFieldDefinition } from './field.definition.interface';

export interface IFieldsDefinition<T extends IFieldDefinition> {
  getFieldKeys(): Identifier[];
  getField(properKey: string | symbol, defaultValue?: T): T;
  setField(properKey: string | symbol, value: T): void;
}
