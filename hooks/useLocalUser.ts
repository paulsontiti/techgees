"use client"
import { useEffect, useState } from "react";

const useLocalUser = () => {
    const [user,setUser] = useState()

    useEffect(()=>{
     if(window){
      const user = JSON.parse(localStorage.getItem('user') ?? "");
      setUser(user);
     }
    })

  return { user };
};

export default useLocalUser;