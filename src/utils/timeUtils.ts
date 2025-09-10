// Utility functions for time-based logic

/**
 * Check if current time is within 1 hour of event start time
 * @param eventDate - Event date (Today, Tomorrow, or formatted date)
 * @param eventTime - Event time string (e.g., "14:00 - 16:00")
 * @returns boolean - true if within 1 hour of event start
 */
export const isWithinOneHourOfEvent = (eventDate: string, eventTime: string): boolean => {
  try {
    const now = new Date();
    
    // Parse event date
    let eventDateTime = new Date();
    
    if (eventDate === "Today") {
      // Use today's date
      eventDateTime = new Date();
    } else if (eventDate === "Tomorrow") {
      // Use tomorrow's date
      eventDateTime = new Date();
      eventDateTime.setDate(eventDateTime.getDate() + 1);
    } else {
      // Parse formatted date (e.g., "Dec 12", "Jan 15, 2024")
      eventDateTime = new Date(eventDate);
    }
    
    // Parse event time (extract start time from "14:00 - 16:00" format)
    const timeMatch = eventTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/);
    if (!timeMatch) return false;
    
    let hours = parseInt(timeMatch[1]);
    const minutes = parseInt(timeMatch[2]);
    const ampm = timeMatch[3];
    
    // Convert 12-hour to 24-hour format if needed
    if (ampm) {
      if (ampm === 'PM' && hours !== 12) {
        hours += 12;
      } else if (ampm === 'AM' && hours === 12) {
        hours = 0;
      }
    }
    
    eventDateTime.setHours(hours, minutes, 0, 0);
    
    // Calculate time difference in milliseconds
    const timeDiff = eventDateTime.getTime() - now.getTime();
    
    // Check if within 1 hour (3600000 milliseconds)
    return timeDiff <= 3600000 && timeDiff > 0;
  } catch (error) {
    console.error('Error parsing event time:', error);
    return false;
  }
};

/**
 * Get time remaining until QR code becomes available
 * @param eventDate - Event date
 * @param eventTime - Event time string
 * @returns string - Human readable time remaining
 */
export const getTimeUntilQRAvailable = (eventDate: string, eventTime: string): string => {
  try {
    const now = new Date();
    
    let eventDateTime = new Date();
    
    if (eventDate === "Today") {
      eventDateTime = new Date();
    } else if (eventDate === "Tomorrow") {
      eventDateTime = new Date();
      eventDateTime.setDate(eventDateTime.getDate() + 1);
    } else {
      eventDateTime = new Date(eventDate);
    }
    
    const timeMatch = eventTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/);
    if (!timeMatch) return "Unable to calculate";
    
    let hours = parseInt(timeMatch[1]);
    const minutes = parseInt(timeMatch[2]);
    const ampm = timeMatch[3];
    
    if (ampm) {
      if (ampm === 'PM' && hours !== 12) {
        hours += 12;
      } else if (ampm === 'AM' && hours === 12) {
        hours = 0;
      }
    }
    
    eventDateTime.setHours(hours, minutes, 0, 0);
    
    // QR code becomes available 1 hour before event
    const qrAvailableTime = new Date(eventDateTime.getTime() - 3600000);
    const timeDiff = qrAvailableTime.getTime() - now.getTime();
    
    if (timeDiff <= 0) return "Available now";
    
    const hoursRemaining = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutesRemaining = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hoursRemaining > 0) {
      return `Available in ${hoursRemaining}h ${minutesRemaining}m`;
    } else {
      return `Available in ${minutesRemaining}m`;
    }
  } catch (error) {
    console.error('Error calculating time until QR available:', error);
    return "Unable to calculate";
  }
};