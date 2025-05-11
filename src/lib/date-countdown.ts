export default function dateCountdown(startDate: Date,endDate: Date): string {

  
    if (isNaN(endDate.getTime()) || isNaN(startDate.getTime())) {
      return "Invalid date format";
    }
  
    const diff = endDate.getTime() - startDate.getTime();
  
    if (diff <= 0) {
      return "Countdown finished!";
    }
  
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const daysMsg = days > 0 ? (`${days > 1 ? `${days} days`: `${days} day`}`) : "";
    const hoursMsg = hours > 0 ? (`${hours > 1 ? `${hours} hours`: `${hours} hour`}`) : "";
    const minutesMsg = minutes > 0 ? (`${minutes > 1 ? `${minutes} minutes`: `${minutes} minute`}`) : "";
  
    return `${daysMsg} ${hoursMsg ? "," : ""} ${minutesMsg ? "," : ""} remaining`;
  }
  
 
  