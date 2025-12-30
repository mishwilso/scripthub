export function getHeaderDate() {
  const currentDate = new Date();
  const date = currentDate.toLocaleDateString("en", {
    month: "long",
    day: "numeric",
  });
  const year = currentDate.getFullYear();
  const dayOfWeek = currentDate.toLocaleDateString("en", { weekday: "long" });
  return { day: dayOfWeek, date: `${date} ${year}` };
}

export function formatRelativeTime(date) {
  const now = new Date()
  const past = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000)

  const minute = 60
  const hour = minute * 60
  const day = hour * 24
  const week = day * 7
  const month = day * 30
  const year = day * 365

  if (diffInSeconds < minute) {
    return 'just now'
  } else if (diffInSeconds < hour) {
    const minutes = Math.floor(diffInSeconds / minute)
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`
  } else if (diffInSeconds < day) {
    const hours = Math.floor(diffInSeconds / hour)
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`
  } else if (diffInSeconds < week) {
    const days = Math.floor(diffInSeconds / day)
    return `${days} ${days === 1 ? 'day' : 'days'} ago`
  } else if (diffInSeconds < month) {
    const weeks = Math.floor(diffInSeconds / week)
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`
  } else if (diffInSeconds < year) {
    const months = Math.floor(diffInSeconds / month)
    return `${months} ${months === 1 ? 'month' : 'months'} ago`
  } else {
    const years = Math.floor(diffInSeconds / year)
    return `${years} ${years === 1 ? 'year' : 'years'} ago`
  }
}

export function formatExactDateTime(date) {
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

export function formatTimeAgo(date) {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return 'just now';
  if (seconds < 120) return '1 minute ago';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  
  return date.toLocaleTimeString();
}
