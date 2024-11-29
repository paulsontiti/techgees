
/**
 * Create the initials from a full name
 * @param {string} fullName - fullname of the user
 * @return {string} the fullname initials.
 */
export const getFullNameInitials = (fullName:string)=>{
    const first = fullName.split(" ")[0][0].toUpperCase();
    const second = fullName.split(" ")[1][0].toUpperCase();
    return `${first}${second}`
}