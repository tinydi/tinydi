import { IFieldsDefinition } from '../interface/definitions/fields.definition.interface';
import { FieldMetadata } from '../interface/decorators/metadata/field-metadata.interface';
import { Identifier } from '../interface/common/identifier';

export class FieldsDefinition<T extends FieldMetadata> extends Map<Identifier, T> implements IFieldsDefinition<T> {
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
