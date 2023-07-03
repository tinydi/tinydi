import { transport as Transport } from 'winston';
import { ColorizeOptions as WinstonColorizeOptions } from 'logform';

export type Level =
  | 'all'
  | 'trace'
  | 'debug'
  | 'info'
  | 'warn'
  | 'error'
  | 'none'
  | 'ALL'
  | 'TRACE'
  | 'DEBUG'
  | 'INFO'
  | 'WARN'
  | 'ERROR'
  | 'NONE';
export type LoggerContextFormat = (
  info: LoggerTransformableInfo,
  logger?: IGenericLogger
) => string;
export interface LoggerTransformableInfo {
  [key: string]: any;
  level: string;
  timestamp: string;
  LEVEL: string;
  pid: number;
  labelText: string;
  message: string;
  ctx: any;
  ignoreFormat: boolean;
  defaultLabel: string;
  originError?: Error;
  stack?: string;
  format?: LoggerContextFormat;
}

export type LoggerCustomInfoHandler = (
  info: LoggerTransformableInfo
) => LoggerTransformableInfo;

export interface LoggerOptions {
  // 当前日志的label
  name?: string;
  // 当前日志输出的等级
  level?: Level;
  // 是否在使用时再创建
  lazyLoad?: boolean;
  // 其他元数据
  metadata?: Record<string, unknown>;
  // 要使用的Transport
  transportRef?: Array<'Console' | 'File' | 'RotateFile'>;
}
export interface ILogger {
  trace(msg: any, ...args: any[]): void;
  debug(msg: any, ...args: any[]): void;
  info(msg: any, ...args: any[]): void;
  warn(msg: any, ...args: any[]): void;
  error(msg: any, ...args: any[]): void;
}

export type ChildLoggerOptions = LoggerOptions;
export type ContextLoggerOptions = LoggerOptions;

export interface IGenericLogger extends ILogger {
  metadata: Record<string, unknown>;
  level: Level;
  write(...args): boolean;
  add(transport: Transport): void;
  remove(transport: Transport): void;
  createChildLogger(options?: ChildLoggerOptions): IGenericChildLogger;
  createContextLogger<Ctx>(ctx: Ctx): IGenericContextLogger<Ctx>;
  close(): void;
}

export interface IGenericChildLogger
  extends ILogger,
    Pick<IGenericLogger, 'write' | 'createContextLogger'> {
  getParentLogger(): IGenericLogger;
  getLoggerOptions(): ChildLoggerOptions;
}

export interface IGenericContextLogger<Ctx> extends ILogger {
  getContext(): Ctx;
}

export interface LoggerProperties {
  // 日志输出地址
  LOG_HOME?: string;
  // 输出文件
  FILE_NAME?: string;
}
export type ColorizeOptions = WinstonColorizeOptions;
export interface ConsoleAppenderOptions {
  // 当前输出的类型
  type: 'Console';
  // 是否给输出添加颜色
  colorize?: boolean | ColorizeOptions;
  // 日志样式
  format?: LoggerContextFormat;
  // 格式化
  pattern?: string;
}

export interface FileAppenderOptions {
  // 文件类型
  type: 'File';
  // 日志样式
  format?: LoggerContextFormat;
  // 格式化
  pattern?: string;
  // 日志文件名
  fileName?: string;
}

export interface RotateFileAppenderOptions {
  // 文件类型
  type: 'RotateFile';
  // 日志样式
  format?: LoggerContextFormat;
  // 格式化
  pattern?: string;
  // 日志文件名
  fileName?: string;
  // 文件最大存储数量
  maxFiles?: string;
  // 文件存储最大大小
  maxSize?: string;
  // winston日志文件日期样式
  datePattern?: string;
  // 是否对存档日志近战gzip
  zippedArchive?: boolean;
  // 日志的行尾字符串
  eol?: string;
  // A directory of the audit file with absolute path
  auditFileDir?: string;
}

export type LoggerTransportOptions =
  | ConsoleAppenderOptions
  | FileAppenderOptions
  | RotateFileAppenderOptions;

export interface LoggerFactoryConfig {
  // 公共属性
  properties?: LoggerProperties;
  // 输出的接口
  transports?: {
    [name: string]: LoggerTransportOptions;
  };
  loggers?: Array<LoggerOptions>;
}
