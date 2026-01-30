exports.handler = async () => {
  const options = {
    timeZone: 'America/Port-au-Prince',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const now = new Date();
  const rawTime = new Intl.DateTimeFormat('en-US', options).format(now);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-cache"
    },
    body: rawTime
  };
};
