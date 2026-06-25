const HEALTH_CHECK_URL = 'https://appapi-dev.shipdelight.com/server/healthcheck'

function isHealthyStatus(status) {
  return status >= 200 && status < 400
}

export default function ({ $axios }, inject) {
  inject('healthCheck', async () => {
    try {
      const response = await $axios.get(HEALTH_CHECK_URL, {
        validateStatus: () => true,
        headers: { accept: 'application/json' }
      })

      return {
        ok: isHealthyStatus(response.status),
        status: response.status,
        statusText: response.statusText,
        url: HEALTH_CHECK_URL,
        data: response.data
      }
    } catch (err) {
      return {
        ok: false,
        status: err.response?.status || null,
        statusText: err.response?.statusText || 'Request failed',
        url: HEALTH_CHECK_URL,
        data: err.response?.data || null,
        error: err.message || 'Request failed'
      }
    }
  })
}
