import { useState, useEffect } from 'react';

export interface TimeTogether {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  formatted: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
}

/**
 * Parses YYYY-MM-DD or YYYY-M-D string into local Date object safely
 */
function parseDateString(dateStr: string): Date {
  const parts = dateStr.split('-').map(Number);
  if (parts.length === 3 && !parts.some(isNaN)) {
    return new Date(parts[0], parts[1] - 1, parts[2], 0, 0, 0);
  }
  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? new Date() : parsed;
}

/**
 * Hook to calculate live ticking time since [MEET_DATE]
 * Updates every second via JS interval.
 */
export function useTimeTogether(startDateStr: string): TimeTogether {
  const [time, setTime] = useState<TimeTogether>(() => calculateTime(startDateStr));

  function calculateTime(dateStr: string): TimeTogether {
    const start = parseDateString(dateStr);
    const now = new Date();
    const diffMs = Math.max(0, now.getTime() - start.getTime());
    const totalSeconds = Math.floor(diffMs / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      days,
      hours,
      minutes,
      seconds,
      totalSeconds,
      formatted: {
        days: days.toLocaleString(),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
      },
    };
  }

  useEffect(() => {
    // Initial sync
    setTime(calculateTime(startDateStr));

    const interval = setInterval(() => {
      setTime(calculateTime(startDateStr));
    }, 1000);

    return () => clearInterval(interval);
  }, [startDateStr]);

  return time;
}
