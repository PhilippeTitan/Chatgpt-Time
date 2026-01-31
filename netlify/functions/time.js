exports.handler = async () => {
  const now = new Date();
  const timeZone = 'America/Port-au-Prince';
  
  const h = new Intl.DateTimeFormat('en-US', { timeZone, hour: '2-digit', hour12: false }).format(now);
  const m = new Intl.DateTimeFormat('en-US', { timeZone, minute: '2-digit' }).format(now);
  const s = new Intl.DateTimeFormat('en-US', { timeZone, second: '2-digit' }).format(now);
  const d = new Intl.DateTimeFormat('en-US', { timeZone, day: '2-digit' }).format(now);
  const mo = new Intl.DateTimeFormat('en-US', { timeZone, month: '2-digit' }).format(now);
  const y = new Intl.DateTimeFormat('en-US', { timeZone, year: 'numeric' }).format(now);

  const data = {
    status: "SYNCED",
    location: "Port-au-Prince, Haiti",
    raw_haiti: { day: d, month: mo, year: y, hour: h, minute: m, second: s },
    unix_ms: now.getTime(),
    hash: Math.random().toString(36).substring(2, 7).toUpperCase()
  };

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(data)
  };
};