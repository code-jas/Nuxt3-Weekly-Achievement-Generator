<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { useUserStore } from '~/stores/useUserStore';

  const { fetchUserData } = useUserStore();

  onMounted(() => {
    fetchUserData();
  });
</script>

<template>
  <div>
    <WarTable />
  </div>
</template>
