export default async (request, context) => {
  const response = await context.next();
  
  // Only process HTML
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("text/html")) {
    return response;
  }

  let text = await response.text();
  
  const now = new Date();
  const timeOptions = { 
    timeZone: "America/Port-au-Prince", 
    hour12: false, 
    hour: "2-digit", 
    minute: "2-digit", 
    second: "2-digit" 
  };
  
  const dateOptions = { 
    timeZone: "America/Port-au-Prince", 
    weekday: "long", 
    year: "numeric", 
    month: "long", 
    day: "numeric" 
  };

  const timeStr = new Intl.DateTimeFormat('en-US', timeOptions).format(now);
  const dateStr = new Intl.DateTimeFormat('en-US', dateOptions).format(now);

  // Forcing the replacement even if multiple occurrences exist
  text = text.replaceAll("00:00:00", timeStr);
  text = text.replaceAll("Loading...", dateStr);
  text = text.replace("<!-- RAW_TIME_MARKER -->", `SERVER_TIME_CONFIRMED: ${dateStr} ${timeStr}`);

  return new Response(text, {
    headers: response.headers
  });
};

export const config = { path: "/" };