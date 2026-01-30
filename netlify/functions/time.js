exports.handler = async () => {
  const options = {
    timeZone: 'America/Port-au-Prince',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const rawTime = formatter.format(now);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, OPTIONS"
    },
    body: rawTime
  };
};