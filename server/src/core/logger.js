const LEVELS = { debug: 10, info: 20, warn: 30, error: 40, silent: 99 };

function threshold() {
  return LEVELS[process.env.LOG_LEVEL || (process.env.NODE_ENV === "test" ? "silent" : "info")] ?? LEVELS.info;
}

function write(level, args) {
  if (LEVELS[level] < threshold()) return;
  const stamp = new Date().toISOString().replace("T", " ").slice(0, 19);
  const line = `${stamp} ${level.toUpperCase().padEnd(5)}`;
  (level === "error" ? console.error : console.log)(line, ...args);
}

export const logger = {
  debug: (...args) => write("debug", args),
  info: (...args) => write("info", args),
  warn: (...args) => write("warn", args),
  error: (...args) => write("error", args),
};
