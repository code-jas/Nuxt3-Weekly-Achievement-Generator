//@ts-ignore
import VueExcelEditor from 'vue3-excel-editor';
//@ts-ignore
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueExcelEditor);
});
