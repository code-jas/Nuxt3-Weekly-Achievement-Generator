<template>
  <div class="min-h-screen w-full flex flex-col">
    <Header />
    <main class="flex-grow">
      <WarTable />
    </main>
    <Footer />
  </div>
</template>

<script>
  export default {
    name: 'IndexPage',
  };
</script>
