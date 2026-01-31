const crypto = require('crypto');

exports.handler = async () => {
  const now = new Date();
  const timeStr = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Port-au-Prince',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  }).format(now);

  // Generate a completely random 10-char token
  const token = crypto.randomBytes(5).toString('hex').toUpperCase();

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain", "Cache-Control": "no-cache" },
    body: `TOKEN:[${token}] TIME:[${timeStr}]`
  };
};
