<template>
  <div ref="blob" class="blob"></div>
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';

  const blob = ref(null);

  function handleMouseMove(event) {
    if (blob.value) {
      blob.value.style.transform = `translate3d(calc(${event.clientX}px - 50%), calc(${event.clientY}px - 50%), 0)`;
    }
  }

  onMounted(() => {
    window.addEventListener('mousemove', handleMouseMove);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('mousemove', handleMouseMove);
  });
</script>

<style scoped>
  .blob {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 250px;
    height: 250px;
    border-radius: 100%;
    background-image: linear-gradient(var(--branding) 10%, var(--background));
    filter: blur(100px);
    transition: all 450ms ease-out;
    position: fixed;
    pointer-events: none;
    left: 0;
    top: 0;
    transform: translate(calc(-50% + 15px), -50%);
    z-index: -1;
  }
</style>
