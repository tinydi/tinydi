import { Transport, WinstonLogger } from '../winston/logger';
import {
  IGenericChildLogger,
  IGenericContextLogger,
  IGenericLogger,
  Level,
  LoggerOptions,
} from '../interface';
import * as util from 'util';
import { formatLevel, isPlainObject } from '../utils';
import { ORIGIN_ARGS, ORIGIN_ERROR } from '../constant';
import { format } from 'winston';
import { displayCommonMessage, displayLabels } from '../fomat';

const LogLevels = {
  off: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
  all: 6,
};
export class GenericLogger extends WinstonLogger implements IGenericLogger {
  private readonly defaultLabel: string;
  private readonly defaultMetadata?: Record<string, unknown>;
  protected _level: Level;
  protected _metadata: Record<string, unknown>;
  set level(level: Level) {
    this._level = formatLevel(level);
  }
  get level(): Level {
    return this._level;
  }
  set metadata(metadata: Record<string, unknown>) {
    this._metadata = metadata;
  }
  get metadata(): Record<string, unknown> {
    return this._metadata;
  }
  constructor(options: LoggerOptions = {}) {
    super(
      Object.assign(options, {
        levels: LogLevels,
      })
    );
    // 设置日志等级
    this._level = formatLevel(options.level);
    // 设置默认的标签
    this.defaultLabel = options.name || '';
    // 元数据
    this.defaultMetadata = options.metadata || {};
    // 配置当前日志主体
    this.configure({
      format: this.getDefaultFormat(),
      exitOnError: false,
    });
  }
  protected getDefaultFormat() {
    return format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss,SSS',
      }),
      format.splat(),
      displayCommonMessage({
        defaultLabel: this.defaultLabel,
        defaultMeta: this.defaultMetadata,
        target: this,
      }),
      displayLabels()
    );
  }
  protected log(level, ...args) {
    // 拦截器，只有当要输出的日志等级小于当前日志等级的时候才进行记录，否则跳过
    if (LogLevels[level] > LogLevels[this._level]) return;
    const originArgs = [...args];
    let meta, msg;
    if (args.length > 1 && isPlainObject(args[args.length - 1])) {
      meta = args.pop();
    } else {
      meta = {};
    }
    const last = args.pop();
    if (last instanceof Error) {
      msg = util.format(...args, last);
      meta[ORIGIN_ERROR] = last;
    } else {
      msg = util.format(...args, last);
    }
    meta[ORIGIN_ARGS] = originArgs;
    return super.log(level, msg, meta);
  }
  trace(...args) {
    this.log('trace', ...args);
  }
  debug(...args) {
    this.log('debug', ...args);
  }
  info(...args) {
    this.log('info', ...args);
  }
  warn(...args) {
    this.log('warn', ...args);
  }
  error(...args) {
    this.log('error', ...args);
  }
  add(transport: Transport) {
    super.add(transport);
  }
  remove(transport: Transport) {
    super.remove(transport);
  }

  write(...args): boolean {
    if (
      (args.length === 1 && typeof args[0] !== 'object') ||
      !args[0]['level']
    ) {
      // 这里必须要用 none
      return super.log.apply(this, ['trace', ...args, { ignoreFormat: true }]);
    } else {
      return super.write.apply(this, args);
    }
  }
  close() {
    return super.close();
  }
  createChildLogger(options: LoggerOptions = {}): IGenericChildLogger {
    return null;
  }
  createContextLogger<Ctx>(ctx: Ctx): IGenericContextLogger<Ctx> {
    return null;
  }
}
