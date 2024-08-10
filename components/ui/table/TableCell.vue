<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import { cn } from '@/lib/utils';

  const props = defineProps<{
    class?: HTMLAttributes['class'];
    loading?: boolean;
  }>();
</script>

<template>
  <td :class="cn('p-3 align-middle [&:has([role=checkbox])]:pr-0', props.class)">
    <div v-if="loading"
class="skeleton-loader"
/>
    <slot v-else />
  </td>
</template>

<style scoped>
  .skeleton-loader {
    width: 100%;
    height: 20px;
    background: linear-gradient(
      90deg,
      var(--loader-background-color) 25%,
      var(--loader-highlight-color) 50%,
      var(--loader-background-color) 75%
    );
    background-size: 200% 100%;
    animation: loading 3s infinite ease-in-out;
    border-radius: 8px;
    margin: 0 12px 20px 12px;
  }

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }

    100% {
      background-position: -200% 0;
    }
  }
</style>
