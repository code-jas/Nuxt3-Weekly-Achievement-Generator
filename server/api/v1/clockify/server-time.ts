export default defineEventHandler(() => {
  const serverTime = new Date().toISOString();
  return {
    time: serverTime,
  };
});
