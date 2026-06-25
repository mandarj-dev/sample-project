import type { HealthCheckResult } from '~/utils/health'
import { HEALTH_CHECK_URL, isHealthyStatus } from '~/utils/health'

export async function fetchHealthCheck(): Promise<HealthCheckResult> {
  try {
    const response = await $fetch.raw(HEALTH_CHECK_URL, {
      method: 'GET',
      headers: { accept: 'application/json' },
      ignoreResponseError: true
    })

    return {
      ok: isHealthyStatus(response.status),
      status: response.status,
      statusText: response.statusText,
      url: HEALTH_CHECK_URL,
      data: response._data
    }
  } catch (err) {
    return {
      ok: false,
      status: null,
      statusText: 'Request failed',
      url: HEALTH_CHECK_URL,
      data: null,
      error: err instanceof Error ? err.message : 'Request failed'
    }
  }
}

export function useHealthCheck() {
  const health = ref<HealthCheckResult | null>(null)
  const pending = ref(true)
  const error = ref<Error | null>(null)

  async function refresh() {
    pending.value = true
    error.value = null

    try {
      health.value = await fetchHealthCheck()
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('Request failed')
      health.value = null
    } finally {
      pending.value = false
    }
  }

  onMounted(() => {
    refresh()
  })

  return { data: health, pending, error, refresh }
}
