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

export function formatRelativeTime(updatedDate) {
  const now = new Date();
  const diffMilliseconds = now - updatedDate;
  const diffDays = Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24));

  if (diffDays === 0 && now.getDate() === updatedDate.getDate()) {
    return "Today";
  } else if (diffDays === 1 && now.getDate() - updatedDate.getDate() === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 14) {
    return 'Last week';
  } else {
    // Fallback to a standard date format
    return updatedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) 
  }
}


