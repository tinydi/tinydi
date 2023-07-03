import { createLogger, Logger, transport } from 'winston';

const EmptyLogger = createLogger().constructor as any;

export type Transport = transport;

type WinstonInnerLogger = Omit<
  Logger,
  | 'error'
  | 'warn'
  | 'debug'
  | 'info'
  | 'level'
  | 'log'
  | 'write'
  | 'close'
  | 'add'
  | 'remove'
  | 'verbose'
  | 'silly'
>;

export class WinstonLogger extends EmptyLogger {
  constructor(options) {
    super(options);
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface WinstonLogger extends WinstonInnerLogger {
  // empty
}
