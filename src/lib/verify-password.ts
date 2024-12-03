import crypto from 'crypto';


/**
 * Function to hash a password
 *@param {string} plainPassword - plain password from user
  *@param {string} hashedPassword - hashed password from database
   *@param {string} salt - salt used to hash the db password
 * @return {string} hashed password.
 */
 export function verifyPassword(plainPassword:string, hashedPassword:string,salt:string) {
 
    const hashToVerify = crypto
        .pbkdf2Sync(plainPassword, salt, 1000, 64, 'sha512') // Hash the input password with the same salt
        .toString('hex');
    return hashedPassword === hashToVerify; // Compare the hashes
}