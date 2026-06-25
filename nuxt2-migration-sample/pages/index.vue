<template>
  <div>
    <h1>Nuxt 2 Migration Sample</h1>
    <p class="status">Vue 2.7 · Nuxt 2 · SPA (static-hostable)</p>

    <div class="card">
      <span class="badge">DevOps test</span>
      <p>
        Calls <code>{{ healthUrl }}</code> directly from the browser via <code>@nuxtjs/axios</code>.
        Deploy output folder <code>dist/</code> to S3 + CloudFront.
      </p>
    </div>

    <div class="card">
      <h2>Health check</h2>
      <p v-if="loading">Checking API…</p>
      <p v-else-if="health && health.ok" class="status ok">
        Healthy — HTTP {{ health.status }} {{ health.statusText }}
      </p>
      <p v-else class="status error">
        Unhealthy — HTTP {{ health && health.status ? health.status : 'n/a' }}
        <span v-if="health && health.error"> — {{ health.error }}</span>
      </p>

      <pre v-if="health" class="response">{{ formatHealth(health) }}</pre>

      <button :disabled="loading" @click="loadHealth">
        Refresh
      </button>
    </div>
  </div>
</template>

<script>
const HEALTH_CHECK_URL = 'https://appapi-dev.shipdelight.com/server/healthcheck'

export default {
  data() {
    return {
      health: null,
      healthUrl: HEALTH_CHECK_URL,
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
