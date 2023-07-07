import { IFieldsDefinition } from '../interface/definitions/fields.definition.interface';
import { FieldMetadata } from '../interface/decorators/options/field-options.interface';
import { Identifier } from '../interface/common/identifier';
import { IFieldDefinition } from '../interface/definitions/field.definition.interface';

export class FieldsDefinition<T extends IFieldDefinition> extends Map<Identifier, T> implements IFieldsDefinition<T> {
  getFieldKeys(): Identifier[] {
    return Array.from(this.keys());
  }
  getField(key: string, defaultValue?: T): T {
    return this.get(key) || defaultValue;
  }
  setField(key: string, value: T): void {
    this.set(key, value);
  }
}
