import {
  ChildLoggerOptions,
  ContextLoggerOptions,
  IGenericChildLogger,
  IGenericLogger,
} from '../interface';
import { GenericContextLogger } from './context-logger';

export class GenericChildLogger implements IGenericChildLogger {
  constructor(
    private readonly parentLogger: IGenericLogger,
    private readonly options: ChildLoggerOptions
  ) {}
  trace(...args) {
    this.transformLog('debug', args);
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

  public getParentLogger(): IGenericLogger {
    return this.parentLogger;
  }

  public getLoggerOptions(): ChildLoggerOptions {
    return this.options;
  }

  public createContextLogger<Ctx>(
    ctx: Ctx,
    options: ContextLoggerOptions = {}
  ) {
    return new GenericContextLogger(ctx, this, {
      ...this.getLoggerOptions(),
      ...options,
    });
  }

  private transformLog(level, args) {
    return this.parentLogger[level].apply(this.parentLogger, [...args]);
  }

  write(...args): boolean {
    return this.parentLogger.write(...args);
  }
}
