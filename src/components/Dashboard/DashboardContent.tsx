"use client";

import { Flex, Grid, GridCol } from "@mantine/core";
import { BalanceCard } from "./BalanceCard";
import { OverviewCard } from "./OverviewCard";
import  ProfileCard  from "./ProfileCard";
import { TransactionCard } from "./TransactionCard";
import { WelcomeCard } from "./WelcomeCard";
import { StatsGroup } from "../StatsGroup";
import { mockData } from "../StatsGroup/mock";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/services/supabase";
import { formatDateComparable, getAbsenToday, getCurrentLocation, getCurrentTimeText, getProfile, getRole } from "@/services/user";


export function DashboardContent() {
  const route = useRouter()
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({});
  const [role, setRole] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [absen, setAbsen] = useState({})
  const today = formatDateComparable(Date.now());
  
  const getUser = async () => {
    setLoading(true)
    const res = await supabase.auth.getUser();
    const profile = await getProfile(res.data.user?.id);
    const role = await getRole(res.data.user?.id);



    const { data, error } = await getAbsenToday(res.data.user?.id, today);

    if (error === null) {
      setAbsen(data);
    }


    if (res.error !== null) {

      route.replace('/login')
      return true
    }

    console.log(profile);

    setUser(e => res.data.user);
    setProfile(e => profile.data);
    setRole(e => role.data);
    setLoading(false)
  }

  const doAbsen = async (isKeluar : boolean = false) => {
    const key = isKeluar ? "jam_keluar" : "jam_masuk"
    const { data, error } = await supabase.from('absensi').insert([{
      jam_masuk: getCurrentTimeText(),
      lokasi: await getCurrentLocation(),
      user: user?.id,
      tanggal: today
    }]).select("*").single();

    if (error === null) {
      setAbsen(data);
    } else {

      const { data, error } = await supabase
        .from('absensi')
        .update({
          [key] : getCurrentTimeText(),
          lokasi: await getCurrentLocation(),
          user: user?.id,
        })
        .eq('tanggal', today)
        .select("*").single()
      if (error === null) {
        setAbsen(data);
      }
    }
  }

  useEffect(() => {
    getUser()


   
    

  }, [])


  return (
    <Grid>
      <GridCol span={{ sm: 12, md: 12, lg: 4 }}>
        <ProfileCard user={user} profile={profile} role={role} isLoading={isLoading} absen={absen} doAbsen={doAbsen}  />
      </GridCol>
      <GridCol span={{ sm: 12, md: 12, lg: 8 }}>
        <TransactionCard />
      </GridCol>


    </Grid>
  );
}
