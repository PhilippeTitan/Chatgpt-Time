exports.handler = async (event) => {
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
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Access-Control-Allow-Origin": "*",
      "Pragma": "no-cache",
      "Expires": "0"
    },
    body: rawTime
  };
};
