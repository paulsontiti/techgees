import crypto from 'crypto';


/**
 * Function to hash a password
 *@param {string} plainPassword - password to hash
 * @return {string | Error} hashed password or Error.
 */
 export function hashPassword(plainPassword:string):
 {hashedPassword:string,salt:string,error:any} {
   try{
    const salt = crypto.randomBytes(16).toString('hex'); // Generate a random salt if not provided
    const hashedPassword = crypto
        .pbkdf2Sync(plainPassword, salt, 1000, 64, 'sha512') // Hash the password with salt
        .toString('hex');
    return {hashedPassword,salt,error:null};
   }catch(err){
    return {hashedPassword:"",salt:"",error:err};
   }
}