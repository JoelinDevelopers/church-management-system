import RegisterForm from '@/components/auth/SignupForm'
import React from 'react'

export default async function page({params} : {params:Promise<{
  id:string
}>}) {
  const {id} = await params
  return (
    <div>
        <RegisterForm churchId={id}/>
    </div>
  )
}
