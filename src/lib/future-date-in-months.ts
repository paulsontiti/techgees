export function futureDateInMonths(startDate:Date, numberOfMonth:number){

    const futureDate = new Date(startDate); // clone the date
futureDate.setMonth(futureDate.getMonth() + numberOfMonth);

return futureDate;
}