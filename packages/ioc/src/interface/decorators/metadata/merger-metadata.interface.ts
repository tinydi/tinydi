export interface MergerMetadata {
  /**
   * The name of the method that will be called when the object is created.
   * @type {string}
   * @memberOf  MergerMetadata
   */
  constructorMethod?: string;
  /**
   * The name of the method that will be called when the object is initialized.
   * @type {string}
   * @memberOf  MergerMetadata
   */
  initMethod?: string;
  /**
   * The name of the method that will be called when the object is destroyed.
   * @type {string}
   * @memberOf  MergerMetadata
   */
  destroyMethod?: string;
}
