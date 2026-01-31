const crypto = require('crypto');

exports.handler = async (event) => {
  const now = new Date();
  const timeZone = 'America/Port-au-Prince';
  
  const timeStr = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(now);

  // Generate a code that ONLY changes every minute
  const minuteSeed = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(now);
  
  const hash = crypto.createHash('sha256').update(minuteSeed).digest('hex').substring(0, 4).toUpperCase();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Access-Control-Allow-Origin": "*"
    },
    body: `${timeStr} [HASH: ${hash}]`
  };
};
