import {
  ContextLoggerOptions,
  IGenericChildLogger,
  IGenericContextLogger,
  ILogger,
} from '../interface';

export class GenericContextLogger<CTX> implements IGenericContextLogger<CTX> {
  constructor(
    protected readonly ctx: CTX,
    protected readonly appLogger: ILogger | IGenericChildLogger,
    protected readonly options: ContextLoggerOptions = {}
  ) {
    if ('getParentLogger' in this.appLogger) {
      this.appLogger = this.appLogger.getParentLogger();
    }
  }

  protected log(...args) {
    if (!['trace', 'debug', 'info', 'warn', 'error'].includes(args[0])) {
      args.unshift('info');
    }
    this.transformLog('log', args);
  }

  trace(...args) {
    this.transformLog('trace', args);
  }

  public debug(...args) {
    this.transformLog('debug', args);
  }

  public info(...args) {
    this.transformLog('info', args);
  }

  public warn(...args) {
    this.transformLog('warn', args);
  }

  public error(...args) {
    this.transformLog('error', args);
  }

  verbose(msg: any, ...args) {
    this.transformLog('verbose', args);
  }

  silly(msg: any, ...args) {
    this.transformLog('silly', args);
  }

  public getContext(): CTX {
    return this.ctx;
  }

  private transformLog(level, args) {
    return this.appLogger[level].apply(this.appLogger, [
      ...args,
      {
        ctx: this.ctx,
      },
    ]);
  }
}
