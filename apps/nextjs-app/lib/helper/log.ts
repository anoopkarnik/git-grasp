import { Log, LogCollector, LogFunction, LogLevel, Loglevels } from "@repo/ts-types/scrape-flow/log"

export function createLogCollector(): LogCollector {
    const logs: Log[] = [];
    const getAll = () => logs;
    const logFunctions = {} as Record<LogLevel, LogFunction>;
    Loglevels.forEach((level) => {
        logFunctions[level] = (message: string) => logs.push({ level, message, timestamp: new Date() });
    })
    return {
        getAll,
        ...logFunctions
    }
}