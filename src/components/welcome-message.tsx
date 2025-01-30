import { DBUser } from '@prisma/client';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Skeleton } from './ui/skeleton';

function WelcomeMessage() {
    const [user, setUser] = useState<DBUser | undefined>(undefined);

    useEffect(() => {
        (async () => {
            try {
              
                const res = await axios.get(`/api/user`);
                setUser(res.data);
            } catch (errror: any) {
                toast.error("Error occurred while trying to fetch user details")
            } 
        })();
    }, []);

  return (
    <div className="">
    {user === undefined ? <Skeleton className="w-10 h-5"/> :  
     <div>{`Hello ${user.userName ?? user.email}`}</div>}
    </div>
  )
}

export default WelcomeMessage