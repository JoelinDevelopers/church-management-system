import React from 'react'
import AdminListing from '../../../components/AdminListing'
 

export default async function page({
      params }: {
          params: Promise<{
              id: string;
          }>
}) {
  const { id } = await params
  return (
    
    <div>
      { <AdminListing churchId={id}/>}
    </div>
  )
}
