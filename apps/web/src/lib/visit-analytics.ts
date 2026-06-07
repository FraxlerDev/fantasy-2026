const BOT_USER_AGENT_PATTERN =
  /bot|crawler|spider|slurp|bingpreview|facebookexternalhit|telegrambot|whatsapp|discordbot|headless|lighthouse|pagespeed|uptimerobot|curl|wget|python-requests|httpclient|monitoring|preview/i;

export function isBotUserAgent(userAgent?: string | null) {
  if (!userAgent) return false;
  return BOT_USER_AGENT_PATTERN.test(userAgent);
}
