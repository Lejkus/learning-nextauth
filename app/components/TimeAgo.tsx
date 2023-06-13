import React, { useEffect, useState } from 'react';

const getTimeSince = (date:string) => {
  const currentDate: Date = new Date();
  const timestamp = Date.parse(date);
  const elapsed = currentDate.getTime() - timestamp;

  if (elapsed < 0) {
    return 'Invalid Date';
  }

  const seconds = Math.floor(elapsed / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
  } else if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else {
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  }
};

const TimeSince = ({ date }:{date:string}) => {
  const [timeSince, setTimeSince] = useState('');

  useEffect(() => {
    setTimeSince(getTimeSince(date));
  }, [date]);

  return <span>{timeSince}</span>;
};

export default TimeSince;
