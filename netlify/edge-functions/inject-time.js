export default async (request, context) => {
  const response = await context.next();
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("text/html")) return response;

  let text = await response.text();
  
  // Haiti Time + 10 Minutes
  const now = new Date();
  const adjusted = new Date(now.getTime() + (10 * 60000)); 
  
  const timeStr = new Intl.DateTimeFormat('en-US', { 
    timeZone: "America/Port-au-Prince", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" 
  }).format(adjusted);
  
  const dateStr = new Intl.DateTimeFormat('en-US', { 
    timeZone: "America/Port-au-Prince", weekday: "long", year: "numeric", month: "long", day: "numeric" 
  }).format(adjusted);

  text = text.replaceAll("00:00:00", timeStr);
  text = text.replaceAll("Loading...", dateStr);
  text = text.replace("<!-- RAW_TIME_MARKER -->", `TIMESTAMP_PROTOCOL: [${dateStr} ${timeStr} - Haiti]`);

  return new Response(text, { headers: response.headers });
};
export const config = { path: "/" };
