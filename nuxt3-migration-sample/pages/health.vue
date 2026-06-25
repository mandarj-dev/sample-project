<script setup lang="ts">
import type { HealthCheckResult } from '~/utils/health'
import { HEALTH_CHECK_URL } from '~/utils/health'

const health = ref<HealthCheckResult | null>(null)
const loading = ref(true)

async function loadHealth() {
  loading.value = true

  try {
    health.value = await fetchHealthCheck()
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadHealth()
})
</script>

<template>
  <div>
    <h1>Health check (client-side)</h1>
    <p class="status">
      Same direct browser call as the home page — useful for CORS validation after deploy.
    </p>

    <div class="card">
      <p class="status">Target: <code>{{ HEALTH_CHECK_URL }}</code></p>
    </div>

    <div v-if="loading" class="card">
      <p>Loading health check…</p>
    </div>

    <div v-else-if="health" class="card">
      <p :class="['status', health.ok ? 'ok' : 'error']">
        {{ health.ok ? 'Healthy' : 'Unhealthy' }} — HTTP {{ health.status }} {{ health.statusText }}
      </p>
      <pre class="response">{{ JSON.stringify(health, null, 2) }}</pre>
      <button @click="loadHealth">Retry</button>
    </div>
  </div>
</template>

<style scoped>
.response {
  background: #111827;
  border: 1px solid #374151;
  border-radius: 8px;
  padding: 1rem;
  overflow-x: auto;
  font-size: 0.85rem;
}
</style>
