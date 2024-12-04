"use client"
import Loader from '@/components/loader'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import * as zod from "zod"
import { useCurrentUser } from '../../../../store/current-user-store'
import { bgNeutralColor, textPrimaryColor } from '@/utils/colors'




const formSchema = zod.object({
  email: zod
  .string()
  .min(1, { message: "This field has to be filled." })
  .email("This is not a valid email.")
  // .refine(async (e) => {
  //   const emails = await fetchEmails();
  //   return emails.includes(e);
  // }, "This email is not in our database")
  ,
    password:zod.string().min(1,{
      message:"Password is required"
  })
})

function SignUpForm() {
const router = useRouter();
const {updateUser} = useCurrentUser();
const [isLoading,setIsLoading] = useState(false);

    const form = useForm<zod.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            email:"",
            password:""
        }
    })


    const {isSubmitting,isValid} = form.formState
   
   
  


    const onSubmit = async(values:zod.infer<typeof formSchema>)=>{
        try{
          const response = await axios.post(`/api/user/sign-up`,values)
          if(response.data.successful){
            toast.success(response.data.message)
            updateUser(response.data.user.userId)
            router.push("/")
          }else{
            toast.error(response.data.message)
            
          }
           
        }catch(err:any){
            toast.error(err.message)
        }
    }
  return (
    <div className={`mt-6 
      border ${bgNeutralColor} ${textPrimaryColor} rounded-md p-4 w-full`}>
       
      <Form {...form}>
<form 
onSubmit={form.handleSubmit(onSubmit)}
className='space-y-4 mt-4'
>
<FormField 
control={form.control}
name='email'

render={({field})=>{
    return   <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
              <Input
              disabled={isSubmitting}
              placeholder='johndoe@gmail.com'
              type='email'
              {...field}
              />
          </FormControl>
          <FormDescription>What is your email address</FormDescription>
          <FormMessage/>
      </FormItem>
  }}
/>
<FormField 
control={form.control}
name='password'

render={({field})=>{
    return   <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
              <Input
              disabled={isSubmitting}
              {...field}
              type='password'
              />
          </FormControl>
          <FormDescription>What is your password</FormDescription>
          <FormMessage/>
      </FormItem>
  }}
/>
<div className='flex flex-col items-center gap-x-2'>
                        
                           <Button
                        type='submit'
                       disabled={!isValid || isSubmitting}
                       className='w-full'
                        >Continue <Loader loading={isSubmitting}/></Button>

<div className='my-10 flex items-center'>
                            Already have an account? <Button type='button' variant="tgg_link" onClick={()=>{
                                setIsLoading(true);
                                router.push("/sign-in")
                            }}>Sign in <Loader loading={isLoading}/></Button>
                        </div>
                    </div>
</form>
        </Form> 
    </div>
  )
}

export default SignUpForm