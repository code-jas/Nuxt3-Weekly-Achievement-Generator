<template>
  <div class="relative overflow-hidden min-h-screen flex flex-col">
    <CursorBlur />
    <Header />
    <main class="relative z-10 flex-grow">
      <slot />
    </main>
    <Footer />
  </div>
</template>
