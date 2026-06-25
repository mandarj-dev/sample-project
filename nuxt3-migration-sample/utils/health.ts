export const HEALTH_CHECK_URL = 'https://appapi-dev.shipdelight.com/server/healthcheck'

export function isHealthyStatus(status: number) {
  return status >= 200 && status < 400
}

export interface HealthCheckResult {
  ok: boolean
  status: number | null
  statusText: string
  url: string
  data: unknown
  error?: string
}
