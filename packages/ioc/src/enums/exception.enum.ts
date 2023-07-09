import { groupEnum } from '../utils/exception.utils';

export const ExceptionCode = groupEnum('ioc', {
  UNKNOWN: 10000,
  COMMON: 10001,
  DECORATOR_NOT_VALID: 10002,
} as const);
