
import { getUserCookie } from '@/lib/get-user-cookie'
import { redirect } from 'next/navigation';

async function SignInCheck() {
  const userId = await getUserCookie();
  if(!userId) return redirect('/sign-in')
return null
}

export default SignInCheck

