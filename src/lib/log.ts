/**
 * Minimal structured logger for the server.
 *
 * Emits one JSON object per line. Vercel's Runtime Logs parse JSON output and
 * let you filter by any field (e.g. `event:contact.resend_error`), and any
 * log drain (Axiom, Better Stack, Datadog) ingests it as-is. Plain
 * `console.error('Resend error', err)` lands as an unsearchable string.
 */

type Level = 'info' | 'warn' | 'error'
type Fields = Record<string, unknown>

function serializeError(error: unknown) {
  if (error instanceof Error) {
    return { name: error.name, message: error.message, stack: error.stack }
  }
  return { message: String(error) }
}

function emit(level: Level, event: string, fields: Fields = {}) {
  const line = JSON.stringify({
    level,
    event,
    ts: new Date().toISOString(),
    ...fields,
  })

  // Level maps to the console method so Vercel colours/filters it correctly.
  if (level === 'error') console.error(line)
  else if (level === 'warn') console.warn(line)
  else console.log(line)
}

export const log = {
  info: (event: string, fields?: Fields) => emit('info', event, fields),
  warn: (event: string, fields?: Fields) => emit('warn', event, fields),
  /** `error` is serialised into `{ name, message, stack }` under `error`. */
  error: (event: string, fields?: Fields, error?: unknown) =>
    emit('error', event, {
      ...fields,
      ...(error !== undefined ? { error: serializeError(error) } : {}),
    }),
}
