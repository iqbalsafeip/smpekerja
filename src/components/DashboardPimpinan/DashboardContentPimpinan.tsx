"use client";

import { Flex, Grid, GridCol, LoadingOverlay } from "@mantine/core";
import ProfileCard from "./ProfileCard";
import { TransactionCard } from "./TransactionCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/services/supabase";
import { formatDateComparable, getAbsenToday, getCurrentLocation, getCurrentTimeText, getLog, getProfile, getRole } from "@/services/user";
import { useMounted } from "@/hooks/useMounted";


export function DashboardContentPimpinan({user }:any) {
  const [profile, setProfile] = useState({});
  const [role, setRole] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [absen, setAbsen] = useState({})
  const today = formatDateComparable(Date.now());
  const [data, setData] = useState([]);
  const isMounted = useMounted()

  const getUser = async () => {
    setLoading(true)
    const profile = await getProfile(user.user?.id);
    const role = await getRole(user.user?.id);
    const log = await getLog(user.user?.id, today)

    console.log("ini log ",log);
    
    if(log.error === null) {
      setData(e => log.data)
    }
     
    const { data, error } = await getAbsenToday(user.user?.id, today);

    if (error === null) {
      setAbsen(e => data);
    }

    console.log("ini absen", data);
    console.log("ini user", user);





    console.log(profile);

    setProfile(e => profile.data);
    setRole(e => role.data);
    setLoading(false)
  }

  const doAbsen = async (isKeluar: boolean = false, cb: any) => {
    const key = isKeluar ? "jam_keluar" : "jam_masuk"



    if (JSON.stringify(absen) === "{}") {
      const { data, error } = await supabase.from('absensi').insert([{
        jam_masuk: getCurrentTimeText(),
        lokasi: await getCurrentLocation(),
        user: user?.user?.id,
        tanggal: today
      }]).select("*").single();
      setAbsen(e => data);
      cb(data)
    } else {

      const { data, error } = await supabase
        .from('absensi')
        .update({
          [key]: getCurrentTimeText(),
          lokasi: await getCurrentLocation(),
          user: user?.id,
        })
        .eq('tanggal', today)
        .eq('user', user?.user?.id)
        .select("*").single()
      if (error === null) {
        setAbsen(e => data);
        cb(data)
      }
    }
  }

  useEffect(() => {
    getUser()





  }, [user])

  const insertLog = async (val: any, location: any, cb:any) => {
    const {data, error} = await supabase.from('log_harian').insert([{
      lokasi: location,
      uraian_pekerjaan: val,
      user: user?.user?.id,
      tanggal: formatDateComparable(Date.now())
    }]).select("*").single();

    if(error === null){
      cb(data)
      setData(e => ([...e, data]))
    }


    console.log(data);
    

  }



  return (
    <Grid>
      <GridCol span={{ sm: 12, md: 12, lg: 4 }}>
        {isMounted && <ProfileCard user={user.user} profile={profile} role={role} isLoading={isLoading} absen={absen} doAbsen={doAbsen} insertLog={insertLog} />}
      </GridCol>
      <GridCol span={{ sm: 12, md: 12, lg: 8 }}>
      </GridCol>


    </Grid>
  );
}
