<template>
  <div>
    <h1>Health check (client-side)</h1>
    <p class="status">Fetched in <code>mounted</code> — useful for browser/CORS migration tests</p>

    <div v-if="loading" class="card">
      <p>Loading health check…</p>
    </div>

    <div v-else-if="health" class="card">
      <p :class="['status', health.ok ? 'ok' : 'error']">
        {{ health.ok ? 'Healthy' : 'Unhealthy' }} — HTTP {{ health.status }} {{ health.statusText }}
      </p>
      <p class="status">URL: {{ health.url }}</p>
      <pre class="response">{{ formatHealth(health) }}</pre>
      <button @click="loadHealth">Retry</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      health: null,
      loading: true
    }
  },
  mounted() {
    this.loadHealth()
  },
  methods: {
    formatHealth(health) {
      return JSON.stringify(health, null, 2)
    },
    async loadHealth() {
      this.loading = true
      try {
        this.health = await this.$healthCheck()
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.response {
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 1rem;
  overflow-x: auto;
  font-size: 0.85rem;
}
</style>
