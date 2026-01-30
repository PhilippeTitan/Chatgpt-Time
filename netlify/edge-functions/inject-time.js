export default async (request, context) => {
  const response = await context.next();
  const contentType = response.headers.get("content-type");

  if (!contentType || !contentType.includes("text/html")) {
    return response;
  }

  const text = await response.text();
  
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", { 
    timeZone: "America/Port-au-Prince", 
    hour12: false, 
    hour: "2-digit", 
    minute: "2-digit", 
    second: "2-digit" 
  });
  
  const dateStr = now.toLocaleDateString("en-US", { 
    timeZone: "America/Port-au-Prince", 
    weekday: "long", 
    year: "numeric", 
    month: "long", 
    day: "numeric" 
  });

  // Inject raw numbers into the HTML before sending to bot
  const updatedText = text
    .replace("00:00:00", timeStr)
    .replace("Loading...", dateStr)
    .replace("<!-- RAW_TIME_MARKER -->", `RAW_TIME_DATA: ${dateStr} ${timeStr}`);

  return new Response(updatedText, response);
};

export const config = { path: "/" };
