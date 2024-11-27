import { textPrimaryColor } from '@/utils/colors'
import React from 'react'

function Heading({type,text,className}:{type?:number,text:string,className?:string}) {
    switch(type){
        case 2:{
            return (
                <h2 className={`${textPrimaryColor} ${className}`}>{text}</h2>
              )
              
        }
        case 3:{
            return (
                <h3 className={`${textPrimaryColor} ${className}`}>{text}</h3>
              )
              
        }
        case 4:{
            return (
                <h4 className={`${textPrimaryColor} ${className}`}>{text}</h4>
              )
              
        }
        case 5:{
            return (
                <h5 className={`${textPrimaryColor} ${className}`}>{text}</h5>
              )
              
        } case 6:{
            return (
                <h6 className={`${textPrimaryColor} ${className}`}>{text}</h6>
              )
              
        }
        default:{
            return (
                <h1 className={`${textPrimaryColor} ${className}`}>{text}</h1>
              )
        }
    }
 
}

export default Heading