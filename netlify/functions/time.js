exports.handler = async () => {
  const now = new Date();

  const rawTime = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Port-au-Prince',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(now);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*"
    },
    body: rawTime
  };
};