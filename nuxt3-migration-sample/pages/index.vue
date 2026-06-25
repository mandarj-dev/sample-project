<script setup lang="ts">
import type { HealthCheckResult } from '~/utils/health'
import { HEALTH_CHECK_URL } from '~/utils/health'

const { data: health, error, pending, refresh } = useHealthCheck()

function formatHealth(value: HealthCheckResult | null) {
  return JSON.stringify(value, null, 2)
}
</script>

<template>
  <div>
    <h1>Nuxt 3 Migration Sample</h1>
    <p class="status">Vue 3 · Nuxt 3 · SPA (static-hostable)</p>

    <div class="card">
      <span class="badge">DevOps test</span>
      <p>
        Calls <code>{{ HEALTH_CHECK_URL }}</code> directly from the browser.
        Deploy output folder <code>.output/public/</code> to S3 + CloudFront.
      </p>
    </div>

    <div class="card">
      <h2>Health check</h2>
      <p v-if="pending">Checking API…</p>
      <p v-else-if="error" class="status error">Request error: {{ error.message }}</p>
      <p v-else-if="health?.ok" class="status ok">
        Healthy — HTTP {{ health.status }} {{ health.statusText }}
      </p>
      <p v-else class="status error">
        Unhealthy — HTTP {{ health?.status ?? 'n/a' }}
        <span v-if="health?.error"> — {{ health.error }}</span>
      </p>

      <pre v-if="health" class="response">{{ formatHealth(health) }}</pre>

      <button :disabled="pending" @click="refresh()">
        Refresh
      </button>
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
