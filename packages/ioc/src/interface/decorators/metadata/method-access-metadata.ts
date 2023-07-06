export interface MethodAccessMetadata<This = unknown, Value = unknown> {
  /**
   * Determines whether an object has a property with the same name as the decorated element.
   */
  has(object: This): boolean;

  /**
   * Gets the value of the field on the provided object.
   */
  get(object: This): Value;
}
