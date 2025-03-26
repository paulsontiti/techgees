export default function dateCountdown(targetDate: string): string {
    const now = new Date();
    const target = new Date(targetDate);
  
    if (isNaN(target.getTime())) {
      return "Invalid date format";
    }
  
    const diff = target.getTime() - now.getTime();
  
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
  
    return `${daysMsg}, ${hoursMsg}, ${minutesMsg} remaining`;
  }
  
 
  