export const useLogger = () => {
  const logDateRange = (query: { start: string; end: string }) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'Asia/Manila',
      hour12: false,
    };
    const formattedStart = new Intl.DateTimeFormat('en-US', options).format(new Date(query.start));
    const formattedEnd = new Intl.DateTimeFormat('en-US', options).format(new Date(query.end));

    console.log('Start:', formattedStart);
    console.log('End:', formattedEnd);
  };

  return { logDateRange };
};
