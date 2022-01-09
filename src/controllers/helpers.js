export function formatDate(timestampMs) {
  return new Date(timestampMs).toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

export function formatDuration(durationSeconds) {
  const durationSecondsRound = Math.round(durationSeconds);
  const secs = durationSecondsRound % 60;
  let mins = Math.floor(durationSecondsRound / 60);
  let hours = Math.floor(mins / 60);
  mins %= 60;
  const days = Math.floor(hours / 24);
  hours %= 24;

  let response = '';
  if (days > 0) response += `${days}d `;
  if (hours > 0 || days > 0) response += `${hours}h `;
  if (hours > 0 || days > 0 || mins > 0) response += `${mins}m `;
  response += `${secs}s`;
  return response;
}
