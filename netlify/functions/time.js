const crypto = require('crypto');

exports.handler = async (event) => {
  const now = new Date();
  const timeZone = 'America/Port-au-Prince';
  
  const timeStr = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(now);

  const dateStr = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(now);

  // Simple 4-digit Pulse based on the current minute
  const minuteSeed = Math.floor(now.getTime() / 60000).toString();
  const pulse = crypto.createHash('md5').update(minuteSeed).digest('hex').substring(0, 4).toUpperCase();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Access-Control-Allow-Origin": "*"
    },
    body: `[${dateStr} | ${timeStr} | PULSE:${pulse}]`
  };
};