export type CreateDecoratorCallBack = (target: any, context: DecoratorContext, ...args: any[]) => any;

export function createDecorator(callBack: CreateDecoratorCallBack): any {
  const factory = (...args: any[]) => {
    //@example @Injectable()
    if (args.length < 1) {
      return (...args) => {
        return callBack(args[0], args[1]);
      };
    }
    //@example @Injectable
    if (args.length === 2 && args[1].kind) {
      return callBack(args[0], args[1]);
    }
    //@example @Injectable(...)
    const options = args;
    return (...args) => {
      return callBack(args[0], args[1], ...options);
    };
  };
  return factory;
}
