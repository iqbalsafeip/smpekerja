"use client";

import { Flex, Grid, GridCol, LoadingOverlay, Paper, Space, Text, Title } from "@mantine/core";
import ProfileCard from "./ProfileCard";
import { TransactionCard } from "./TransactionCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/services/supabase";
import { formatDateComparable, getAbsenToday, getCurrentLocation, getCurrentTimeText, getLog, getLogToday, getPotensiToday, getProfile, getRole, getTamuToday } from "@/services/user";
import { useMounted } from "@/hooks/useMounted";
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false, // Ensure ApexCharts is not imported during SSR
});
import { TableLogPekerjaanToday } from "../Table/TableLogPekerjaanToday";
import { TableTamu } from "../Table/TableTamu";
import { TablePotensi } from "../Table/TablePotensi";

export function DashboardContentPimpinan({ user }: any) {
  const [profile, setProfile] = useState({});
  const [role, setRole] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [absen, setAbsen] = useState({})
  const today = formatDateComparable(Date.now());
  const [data, setData] = useState({
    potensi: [],
    tamu: [],
    absensi: []
  });
  const [logs, setLogs] = useState([]);
  const isMounted = useMounted()

  const getLog = async () => {
    try {
      const { data, error } =await getLogToday( today)
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
    const log = await getLogToday( today)
    const potensi = await getPotensiToday(today)
    const tamu = await getTamuToday(today)
    console.log("ini log ", log);

    if (potensi.error === null) {
      setData(e => ({...e, potensi: potensi.data}))
    }
    if (tamu.error === null) {
      setData(e => ({...e, tamu: tamu.data}))
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
    getLog()

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

      {/* <GridCol span={{ sm: 12, md: 12, lg: 12 }}>
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
      </GridCol> */}

      <GridCol span={{ sm: 12, md: 12, lg: 12 }}>
        <TableLogPekerjaanToday data={logs} withPekerja={true} />
      </GridCol>
      <GridCol span={{ sm: 12, md: 12, lg: 12 }}>
        <Paper radius="md" p="md" >
          <Title order={5}>Tamu Hari ini</Title>
          <Space h="md" />
          <TableTamu isLoading={isLoading} data={data.tamu} />
        </Paper>
      </GridCol>
      <GridCol span={{ sm: 12, md: 12, lg: 12 }}>
        <Paper radius="md" p="md" >
          <Title order={5}>Potensi Hari ini</Title>
          <Space h="md" />
          <TablePotensi isLoading={isLoading} data={data.potensi} />
        </Paper>
      </GridCol>




    </Grid>
  );
}
