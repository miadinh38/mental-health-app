export const formatDate = (createdAt) => {
  const postDate = new Date(createdAt);

  // Format the date
  const formattedDate = postDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Format the time
  const formattedTime = postDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  // Calculate time ago
  const currentTime = new Date();
  const differenceInMs = currentTime - postDate;
  const differenceInMinutes = Math.floor(differenceInMs / 1000 / 60);
  let timeAgo;

  if (differenceInMinutes < 1) {
    timeAgo = "Just now";
  } else if (differenceInMinutes === 1) {
    timeAgo = "1 min ago";
  } else if (differenceInMinutes < 60) {
    timeAgo = `${differenceInMinutes} mins ago`;
  } else {
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    if (differenceInHours === 1) {
      timeAgo = "1 hour ago";
    } else if (differenceInHours < 24) {
      timeAgo = `${differenceInHours} hours ago`;
    } else {
      const differenceInDays = Math.floor(differenceInHours / 24);
      if (differenceInDays === 1) {
        timeAgo = "1 day ago";
      } else {
        timeAgo = `${differenceInDays} days ago`;
      }
    }
  }

  return { formattedDate, formattedTime, timeAgo };
};
