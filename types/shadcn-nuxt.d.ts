// types/shadcn-nuxt.d.ts
declare module '@nuxt/schema' {
    interface NuxtConfig {
      shadcn?: {
        prefix?: string;
        componentDir?: string;
      };
    }
  }
  