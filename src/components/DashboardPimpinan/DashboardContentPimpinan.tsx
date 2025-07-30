"use client";

import { Flex, Grid, GridCol, LoadingOverlay, Paper, Text } from "@mantine/core";
import ProfileCard from "./ProfileCard";
import { TransactionCard } from "./TransactionCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/services/supabase";
import { formatDateComparable, getAbsenToday, getCurrentLocation, getCurrentTimeText, getLog, getProfile, getRole } from "@/services/user";
import { useMounted } from "@/hooks/useMounted";
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false, // Ensure ApexCharts is not imported during SSR
});
import { TableLogPekerjaanToday } from "../Table/TableLogPekerjaanToday";

export function DashboardContentPimpinan({ user }: any) {
  const [profile, setProfile] = useState({});
  const [role, setRole] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [absen, setAbsen] = useState({})
  const today = formatDateComparable(Date.now());
  const [data, setData] = useState([]);
  const [logs, setLogs] = useState([]);
  const isMounted = useMounted()

  const getAllLog = async () => {
    try {
      const { data, error } = await supabase.from('log_harian').select("*");
      if (error === null) {
        setLogs(e => data)
      }

    } catch (error) {

    }
  }

  const getUser = async () => {
    setLoading(true)
    const profile = await getProfile(user.user?.id);
    const role = await getRole(user.user?.id);
    const log = await getLog(user.user?.id, today)

    console.log("ini log ", log);

    if (log.error === null) {
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

  useEffect(() => {
    getUser()
  }, [user])

  useEffect(() => {
    getAllLog()

  }, [])


  const [absenChart, setAbsenChart] = useState({
    options: {
      labels: ["Telat", "Tepat Waktu"],
      colors: ["#df0000ff", "#00c932ff"],
    },
    series: [45, 55,],
  })
  const [chartLogHarian, setLogHarian] = useState({
    options: {
      xaxis: {
        categories: ["Senin", "Selasa", "Rabu", "Kamis", "Jum'at"]
      }
    },
    series: [
      {
        name: "log harian",
        data: [20, 13, 8, 19, 15]
      }
    ],
  })

  const [chartTamu, setChartTamu] = useState({
    options: {
      xaxis: {
        categories: ["Senin", "Selasa", "Rabu", "Kamis", "Jum'at"]
      }
    },
    series: [
      {
        name: "Tamu Harian",
        data: [20, 13, 8, 19, 15]
      }
    ],
  })


  return (
    <Grid>
      <GridCol span={{ sm: 12, md: 12, lg: 4 }}>
        {isMounted && <ProfileCard user={user.user} profile={profile} role={role} isLoading={isLoading} absen={absen} doAbsen={() => { }} insertLog={() => { }} />}
      </GridCol>

      <GridCol span={{ sm: 12, md: 12, lg: 12 }}>
        <Paper p={15} >
          {
            isMounted && (
              <Grid>
                <GridCol span={{ sm: 12, md: 6, lg: 4 }}>
                  <Text>Absensi Berdasarkan Ketepatan (Minggu Ini)</Text>
                  <Chart options={absenChart.options} series={absenChart.series} type="donut" width="380" />
                </GridCol>
                <GridCol span={{ sm: 12, md: 6, lg: 4 }}>
                  <Text>Log Pekerjaan Yang Masuk (Minggu Ini)</Text>
                  <Chart options={chartLogHarian.options} series={chartLogHarian.series} type="bar" width="380" />
                </GridCol>
                <GridCol span={{ sm: 12, md: 6, lg: 4 }}>
                  <Text>Tamu Yang Datang (Minggu Ini)</Text>
                  <Chart options={chartTamu.options} series={chartTamu.series} type="line" width="380" />
                </GridCol>
              </Grid>
            )
          }
        </Paper>
      </GridCol>

      <GridCol span={{ sm: 12, md: 12, lg: 12 }}>
        <TableLogPekerjaanToday data={logs} withPekerja={true} />
      </GridCol>

    </Grid>
  );
}
