export const daysLeft = (deadline) => {
  const difference = new Date(deadline).getTime() - new Date().getTime();
  if (difference < 0) return 0;
  const remainingDays = difference / (1000 * 3600 * 24);

  return Math.ceil(remainingDays);
};


export const calculateBarPercentage = (goal, raisedAmount) => {
  if (goal === 0) return 0;
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage;
};


export const checkIfImage = (url, callback) => {
  const img = new Image();
  img.src = url;

  img.onload = () => {
    img.onload = null;
    img.onerror = null;
    callback(true);
  };

  img.onerror = () => {
    img.onload = null;
    img.onerror = null;
    callback(false);
  };

  if (img.complete) {
    img.onload = null;
    img.onerror = null;
    callback(true);
  }
};

