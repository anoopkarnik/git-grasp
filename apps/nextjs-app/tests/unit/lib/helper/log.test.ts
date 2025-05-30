import { describe, test, expect } from 'vitest';
import { Loglevels } from "@repo/ts-types/scrape-flow/log";
import { createLogCollector } from '../../../../lib/helper/log';

describe('createLogCollector', () => {
  test('initializes with no logs', () => {
    const logger = createLogCollector();
    expect(logger.getAll()).toEqual([]);
  });

  test('logs messages correctly', () => {
    const logger = createLogCollector();
    
    logger.info('Info log message');
    logger.error('Error log message');

    const logs = logger.getAll();
    expect(logs.length).toBe(2);
    expect(logs[0]).toEqual({ level: 'info', message: 'Info log message', timestamp: expect.any(Date) });
    expect(logs[1]).toEqual({ level: 'error', message: 'Error log message', timestamp: expect.any(Date) });
  });

  test('logs at all defined levels', () => {
    const logger = createLogCollector();
    Loglevels.forEach(level => {
      logger[level](`${level} message`);
    });

    const logs = logger.getAll();
    expect(logs.length).toBe(Loglevels.length);

    logs.forEach((log, index) => {
      expect(log.level).toBe(Loglevels[index]);
      expect(log.message).toBe(`${Loglevels[index]} message`);
      expect(log.timestamp).toBeInstanceOf(Date);
    });
  });
});
