import { Metadata } from '../interface/decorators/metadata/metadata.interface';
import { DecoratorUtils } from '../utils/decorator.utils';

/**
 * args iterator context.
 *
 * @export
 * @class ArgsContext
 */
export class ArgsContext<T extends Metadata = Metadata> {
  constructor(public args: any[]) {
    this.currIndex = 0;
    this.metadata = {} as T;
  }
  metadata: T;
  currIndex: number;

  get currArg() {
    if (this.args.length) {
      return this.args[this.currIndex];
    }
    return null;
  }

  next(next: () => void, checkNextArg = true) {
    if (checkNextArg) {
      this.currIndex++;
    }
    if (!this.isCompeted()) {
      next();
    }
  }

  getMetadata() {
    return this.currIndex > 0 ? this.metadata : null;
  }

  isCompeted(): boolean {
    return this.currIndex >= this.args.length;
  }
}

/**
 * args iterator action.
 */
export type ArgsIteratorAction<T extends Metadata = Metadata> = DecoratorUtils.Handler<ArgsContext<T>>;
