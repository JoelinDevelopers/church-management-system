import { getServerUser } from "@/actions/auth";
import LoginForm from "@/components/auth/LoginForm";
// import Login from "@/components/frontend/auth/login";
import { redirect } from "next/navigation";
import React from "react";

export default async function page({params}:{params:Promise<{
  subdomain:string
}>}) {
  const {subdomain} = await params;
  const user = await getServerUser();
  if (user?.id) {
    if(subdomain){
      redirect("/dashboard")
    }else{
      redirect("/super-admin")
    }
  }
  return (
    <div>
      <LoginForm subdomain={subdomain}/>
    </div>
  );
}
