import { addDays, parse, isBefore, addHours } from "date-fns";

/**
 * Check if cancellation is allowed (more than 1 hour before event)
 * @param date - Event date (Today, Tomorrow, or formatted date)
 * @param time - Event time string (e.g., "14:00 - 16:00")
 * @returns boolean - true if cancellation is allowed
 */
export const isCancellationAllowed = (date: string, time: string): boolean => {
  try {
    const now = new Date();
    let bookingDate: Date;
    
    // Parse the date
    if (date === "Today") {
      bookingDate = new Date();
    } else if (date === "Tomorrow") {
      bookingDate = addDays(new Date(), 1);
    } else {
      // Try to parse date formats like "Dec 12" or "Dec 12, 2024"
      const currentYear = new Date().getFullYear();
      const dateWithYear = date.includes(',') ? date : `${date}, ${currentYear}`;
      bookingDate = parse(dateWithYear, 'MMM dd, yyyy', new Date());
    }
    
    // Parse the start time (we only care about start time for cancellation)
    const startTime = time.split(' - ')[0];
    const [hours, minutes] = startTime.split(':').map(Number);
    
    // Set the booking time
    bookingDate.setHours(hours, minutes, 0, 0);
    
    // Check if current time is more than 1 hour before booking time
    const oneHourBeforeBooking = addHours(bookingDate, -1);
    
    return isBefore(now, oneHourBeforeBooking);
  } catch (error) {
    console.error('Error parsing booking time:', error);
    // If parsing fails, allow cancellation to be safe
    return true;
  }
};

/**
 * Convert 24-hour time to AM/PM format
 * @param timeRange - Time range string (e.g., "14:00 - 16:00")
 * @returns string - Formatted time range in AM/PM format
 */
export const convertTo12HourFormat = (timeRange: string): string => {
  // Check if time already has AM/PM format
  if (timeRange.includes('AM') || timeRange.includes('PM')) {
    return timeRange; // Already formatted, return as is
  }
  
  const [startTime, endTime] = timeRange.split(' - ');
  
  const convertTime = (time: string): string => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };
  
  return `${convertTime(startTime)} - ${convertTime(endTime)}`;
};