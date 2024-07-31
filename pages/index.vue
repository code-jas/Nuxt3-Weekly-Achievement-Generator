<script setup>

const { data, error, pending } = useFetch('/api/v1/user');
</script>

<template>
  <Header />
  <WarTable />
  <div>
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>
      <h1>User Data</h1>
      <pre>{{ JSON.parse(data.data) }}</pre>
    </div>
  </div>
</template>
