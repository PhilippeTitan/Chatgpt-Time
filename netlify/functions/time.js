exports.handler = async (event) => {
  const now = new Date();
  const timeStr = new Intl.DateTimeFormat('en-US', {
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

  // Generate a random 3-character proof key
  const proofKey = Math.random().toString(36).substring(2, 5).toUpperCase();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Access-Control-Allow-Origin": "*"
    },
    body: `${timeStr} [KEY: ${proofKey}]`
  };
};