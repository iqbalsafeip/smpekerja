"use client"

import { DashboardContent } from "@/components/Dashboard/DashboardContent";
import { DashboardContentPimpinan } from "@/components/DashboardPimpinan/DashboardContentPimpinan";
import { Logo } from "@/components/Logo/Logo";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import { useMounted } from "@/hooks/useMounted";
import { supabase } from "@/services/supabase";
import { getRole } from "@/services/user";
import { Loader, LoadingOverlay, Stack } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Dashboard() {
  const label = {
    "PEKERJA" : "Pekerja",
    "PIMPINAN" : "Pimpinan"
  }
  const isMounted = useMounted()
  const route = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState({})
  const [role, setRole] = useState({});
  const getUser = async () => {
    setLoading(true);
    const res = await supabase.auth.getUser();
    if (res.error === null) {
      const role = await getRole(res.data.user?.id); 
      if(role.error === null) {
        setRole(e => role.data)
        setUser(e => res.data);
        setLoading(false);
        return true
      }
    }

    route.replace('/login')

  }

  useEffect(() => {
    getUser()
  }, [])

  if (isLoading) {
    return (
      <LoadingOverlay visible={true} loaderProps={{
        children: <Stack justify="center" align="center" >
          <Logo />
          <Loader color="black" />
        </Stack>
      }} />
    )
  }

  return (
    <PageContainer title={`Dashboard ${label[role?.role]}`} >
      {
        role.role === "PEKERJA" ? <DashboardContent user={user} /> : <DashboardContentPimpinan user={user} />
      }
      
    </PageContainer>
  )

}
