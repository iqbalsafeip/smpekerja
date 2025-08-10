"use client";

import { formatDateComparable, getCurrentLocation, getCurrentTimeText } from "@/services/user";
import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Dialog,
  Drawer,
  DrawerHeader,
  Flex,
  Group,
  Input,
  List,
  LoadingOverlay,
  Menu,
  Modal,
  Overlay,
  Paper,
  Radio,
  Skeleton,
  Space,
  Stack,
  Stepper,
  Text,
  Textarea,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconActivity, IconAlbum, IconCircleCheck, IconCircleDashed, IconClock, IconDots, IconEaseOut, IconEye, IconFileZip, IconInputCheck, IconLocation, IconMap, IconOutbound, IconSend, IconStepOut, IconTimeDuration0, IconTrash, IconUser } from "@tabler/icons-react";
import { useEffect, useMemo, useRef, useState } from "react";


import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import { supabase } from "@/services/supabase";
import { IconAnalyze } from "@tabler/icons-react";


const formFieldTamu = [
  {
    name: "nomor_ktp",
    type: "text",
    label: "Nomor KTP",
  },

  {
    name: "nomor_kpj",
    type: "text",
    label: "Nomor KPJ"
  },

  {
    name: "nama_lengkap",
    type: "text",
    label: "Nama Lengkap"
  },
  {
    name: "keperluan",
    type: "textarea",
    label: "Keperluan/Kendala"
  },
  {
    name: "nomor_hp",
    type: "text",
    label: "Nomor HP/WA",
  },
  {
    name: "penyelesaian",
    type: "textarea",
    label: "Penyelesaian",
  },
  {
    name: "kepuasan_pelayanan",
    type: "options",
    label: "Rating Kepuasan Pelayanan",
    options: [
      "Sangat Puas",
      "Puas",
      "Cukup Puas",
      "Tidak Puas",
      "Sangat Tidak Puas"
    ]
  },
  {
    name: "rating_pelayanan_informasi",
    type: "options",
    label: "Rating Pelayanan Informasi",
    options: [
      "Sangat Dipahami",
      "Dipahami",
      "Cukup Dipahami",
      "Tidak Dipahami",
      "Sangat Tidak Dipamahi"
    ]
  }


]


const formFieldPotensi = [
  {
    name: "nama_kelompok",
    type: "text",
    label: "Nama Kelompok/ Perorangan"
  },
  {
    name: "no_hp",
    type: "text",
    label: "Nomor HP/WA"
  },
  {
    name: "alamat",
    type: "text",
    label: "Alamat"
  },
  {
    name: "bidang_usaha",
    type: "text",
    label: "Bidang Usaha"
  },
  {
    name: "kategori",
    type: "options",
    label: "Kategori",
    options: [
      "PU",
      "BPU"
    ]
  },
  {
    name: "waktu",
    type: "text",
    label: "Waktu",

  },
  {
    name: "progress",
    type: "steps",
    label: "Progress",
    steps: [
      "Belum Memiliki Kontak",
      "Kontak Dimiliki",
      "Sudah Dihubungi",
      "Sedang Bersurat",
      "Meminta Sosialisasi",
      "Sudah Sosialisasi",
      "Selesai di daftarkan",
      "Tidak ada Respon"
    ]
  },
  {
    name: "keterangan",
    type: "textarea",
    label: "Keterangan",

  },
]

const sectionStyle = {
  padding: "var(--mantine-spacing-md)",
  borderTop:
    "1px solid lightdark(var(--mantine-colors-gray-3), var(--mantine-colors-dark-4))",
};

export default function ProfileCard({ user, profile, role, isLoading, absen, doAbsen, insertLog }: any) {
  const isMobile = useMediaQuery('(max-width: 50em)');
  const [opened, { close, open }] = useDisclosure(false);
  const [openedLog, { close: closeLog, open: openLog }] = useDisclosure(false);
  const [openedTamu, { close: closeTamu, open: openTamu }] = useDisclosure(false);
  const [openedPotensi, { close: closePotensi, open: openPotensi }] = useDisclosure(false);
  const [location, setLocation] = useState({});
  const [isLoadingMap, setLoading] = useState(true)
  const [currAbsen, setCurrAbsen] = useState({});
  const today = formatDateComparable(Date.now());
  const [form, setForm] = useState("")
  const [formTamu, setFormTamu] = useState({
    nomor_ktp: "",
    nomor_kpj: "",
    nama_lengkap: "",
    keperluan: "",
    nomor_hp: "",
    penyelesaian: "",
    kepuasan_pelayanan: "",
    rating_pelayanan_informasi: "",
    tanggal: today
  })

  const [formPotensi, setFormPotensi] = useState({
    nama_kelompok: "",
    no_hp: "",
    alamat: "",
    bidang_usaha: "",
    kategori: "",
    waktu: "",
    progress: "",
    keterangan: "",
    tanggal: today
  })
  const [laodingLog, setLoadingLog] = useState(false)
  const [loadingTamu, setLoadingTamu] = useState(false);
  const [loadingPotensi, setLoadingPotensi] = useState(false);

  const [openedAlert, { toggle, close: closeAlert }] = useDisclosure(false);

  useEffect(() => {
    setLoading(true)
    console.log("ini absen", absen);
    getCurrentLocation().then(res => {
      setLocation(e => res)
      console.log("ini lokasi", res);
      setLoading(false)
    })
    setCurrAbsen(absen);
  }, [absen])


  const doLog = async () => {
    setLoadingLog(true);
    await insertLog(form, location, callback)
    setLoadingLog(false);
  }

  const callback = async (val: any) => {
    setForm("");
    closeLog()
  }

  const insertAbsen = async (val: boolean) => {
    setLoading(true);
    await doAbsen(val, callbackMap);
    setLoading(false);
  }

  const callbackMap = async (val: any) => {
    setCurrAbsen(val)
  }

  const insertTamu = async () => {
    setLoadingTamu(true)
    try {

      const { data, error } = await supabase
        .from('tamu')
        .insert([
          formTamu,
        ])
        .select()
      closeTamu();
      toggle()
      setFormTamu({
        nomor_ktp: "",
        nomor_kpj: "",
        nama_lengkap: "",
        keperluan: "",
        nomor_hp: "",
        penyelesaian: "",
        kepuasan_pelayanan: "",
        rating_pelayanan_informasi: "",
        tanggal: today
      })
      setLoadingTamu(false)
    } catch (error) {
      closeTamu();
      setLoadingTamu(false)
    }
  }

  const insertPotensi = async () => {
    setLoadingPotensi(true)
    try {

      const { data, error } = await supabase
        .from('potensi')
        .insert([
          formPotensi,
        ])
        .select()
      closePotensi();
      toggle()
      setFormPotensi({
        nama_kelompok: "",
        no_hp: "",
        alamat: "",
        bidang_usaha: "",
        kategori: "",
        waktu: "",
        progress: "",
        keterangan: "",
        tanggal: today
      })
      setLoadingPotensi(false)
    } catch (error) {
      closePotensi();
      setLoadingPotensi(false)
    }
  }


  const RenderForm = (fields: any, setter: any, val: any) => {
    return fields?.map((e: any, i: any) => {
      switch (e.type) {
        case "text": return (
          <Input.Wrapper label={e.label} description={"Input " + e.label}>
            <Input placeholder={"Input " + e.label} onChange={ev => setter((prev: any) => ({ ...prev, [e.name]: ev.target.value }))} />
          </Input.Wrapper>
        )
        case "textarea": return (
          <Textarea
            label={e.label}
            description={"Input " + e.label}
            placeholder={"Input " + e.label}
            onChange={ev => setter((prev: any) => ({ ...prev, [e.name]: ev.target.value }))}
          />
        )
        case "options": return (
          <Radio.Group
            name={e.name}
            label={"Pilih " + e.label}
            description={"Input " + e.label}
            onChange={ev => setter((prev: any) => ({ ...prev, [e.name]: ev }))}
          >
            <Group mt="xs">
              {
                e.options?.map((opt: any, i: any) => (
                  <Radio value={opt} label={opt} />
                ))
              }
            </Group>
          </Radio.Group>
        )
        case "steps": return (
          <Input.Wrapper label={e.label} description={e.label}  >

            <Stepper mt={10} active={val[e.name]} onStepClick={ev => setter((prev: any) => ({ ...prev, [e.name]: ev }))} orientation="vertical">
              {
                e.steps?.map((opt: any, i: any) => (
                  <Stepper.Step value={i} label={opt} description={"Klik jika " + opt} />

                ))
              }
            </Stepper>
          </Input.Wrapper>
        )

      }
    })




  }



  return (
    <Card radius="md">
      <Dialog opened={openedAlert} withCloseButton onClose={closeAlert} size="lg" radius="md">
        <Flex dir="row" justify={"center"} align={"center"} >

          <ThemeIcon color="teal" size={24} radius="xl" me={10}>
            <IconCircleCheck size={16} />
          </ThemeIcon>
          <Text size="sm" fw={500}>
            Berhasil Menambahkan Data
          </Text>
        </Flex>
      </Dialog>
      <Card.Section style={sectionStyle}>
        <Group justify="space-between">
          <Avatar radius="xl" />
          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon variant="subtle">
                <IconDots size="1rem" />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item leftSection={<IconFileZip size={14} />}>
                Profile
              </Menu.Item>
              <Menu.Item leftSection={<IconEye size={14} />}>
                Privasi
              </Menu.Item>

            </Menu.Dropdown>
          </Menu>
        </Group>

        <Space h="md" />

        <Flex direction="column">
          {
            isLoading ? <Skeleton height={40} radius="md" width="70%" visible={true} /> : <Title order={5}>{profile?.name}</Title>
          }

          <Space h="xs" />
          <Group justify="space-between"  >

            <Stack gap={4} >
              <Text fz="sm" fw="500">
                Email
              </Text>
              {isLoading ? <Skeleton height={30} radius="md" width={120} visible={true} /> : <Text fz="sm" c="dimmed" fw="500" >
                {user?.email}
              </Text>}

            </Stack>
            <Stack gap={4}  >
              <Text fz="sm" fw="500">
                Jabatan
              </Text>
              {
                isLoading ? <Skeleton height={30} radius="md" width={120} visible={true} /> : <Title order={3}>{role.role}</Title>
              }

            </Stack>
          </Group>
        </Flex>
      </Card.Section>

      <Card.Section style={sectionStyle}>
        <Group grow>
          <Stack gap={4}>
            <List
              spacing="xs"
              size="sm"
              center
              icon={
                <ThemeIcon color="teal" size={24} radius="xl">
                  <IconCircleCheck size={16} />
                </ThemeIcon>
              }
            >
              <List.Item><Text size="sm" fw={700}>Jam Masuk : </Text><Text  >{absen.jam_masuk || "-"}</Text></List.Item>

              <List.Item
                icon={
                  <ThemeIcon color="red" size={24} radius="xl">
                    <IconCircleDashed size={16} />
                  </ThemeIcon>
                }
              >
                <Text size="sm" fw={700} >Jam Pulang : </Text><Text  >{absen.jam_keluar || "-"}</Text>
              </List.Item>
            </List>
          </Stack>

        </Group>
      </Card.Section>

      <Card.Section style={sectionStyle}>
        <Group>
          <Button variant="light" leftSection={<IconLocation size={14} />} onClick={open} >Detail Absen</Button>
          <Button onClick={openLog} leftSection={<IconActivity size={14} />} >Buat Log Hari ini</Button>
          <Button color="green" leftSection={<IconUser size={14} />} onClick={openTamu}>Tambah Tamu Hari ini</Button>
          <Button color="pink" leftSection={<IconAnalyze size={14} />} onClick={openPotensi}>Tambah Potensi Hari ini</Button>
        </Group>
      </Card.Section>
      <Modal opened={openedLog} onClose={closeLog} title="Buat Log" fullScreen={isMobile} centered >
        <List
          spacing="xs"
          size="sm"
          center
          mb={15}
        >

          <List.Item
            icon={
              <ThemeIcon color="blue" size={24} radius="xl">
                <IconClock size={16} />
              </ThemeIcon>
            }
          >
            <Text size="sm" fw={700}>Jam : </Text><Text  >{getCurrentTimeText()}</Text>
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon color="teal" size={24} radius="xl">
                <IconMap size={16} />
              </ThemeIcon>
            }
          >
            <Text size="sm" fw={500}>Lokasi akan diambil secara otomatis</Text>
          </List.Item>
        </List>
        <Textarea
          label="Uraian Pekerjaan"
          description="Pekerjaan yang dilakukan"
          placeholder="Input Uraian disini"
          onChange={ev => setForm(e => ev.target.value)}
        />
        <Button rightSection={<IconSend size={14} />} mt={15} loading={laodingLog} onClick={doLog} >Submit</Button>
      </Modal>
      <Modal opened={openedPotensi} onClose={closePotensi} title="Tambah Potensi Hari ini" fullScreen={isMobile} centered >
        <Box pos={"relative"}>

          <LoadingOverlay visible={loadingPotensi} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
          <List
            spacing="xs"
            size="sm"
            center
            mb={15}
          >

            <List.Item
              icon={
                <ThemeIcon color="blue" size={24} radius="xl">
                  <IconClock size={16} />
                </ThemeIcon>
              }
            >
              <Text size="sm" fw={700}>Jam : </Text><Text  >{getCurrentTimeText()}</Text>
            </List.Item>

          </List>
          {RenderForm(formFieldPotensi, setFormPotensi, formPotensi)}
          <Button rightSection={<IconSend size={14} />} mt={15} loading={laodingLog} onClick={insertPotensi} >Submit</Button>
        </Box>
      </Modal>
      <Modal opened={openedTamu} onClose={closeTamu} title="Tambah Tamu Hari ini" fullScreen={isMobile} centered >
        <Box pos={"relative"}>

          <LoadingOverlay visible={loadingTamu} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
          <List
            spacing="xs"
            size="sm"
            center
            mb={15}
          >

            <List.Item
              icon={
                <ThemeIcon color="blue" size={24} radius="xl">
                  <IconClock size={16} />
                </ThemeIcon>
              }
            >
              <Text size="sm" fw={700}>Jam : </Text><Text  >{getCurrentTimeText()}</Text>
            </List.Item>

          </List>
          {RenderForm(formFieldTamu, setFormTamu, formTamu)}
          <Button rightSection={<IconSend size={14} />} mt={15} loading={laodingLog} onClick={insertTamu} >Submit</Button>
        </Box>
      </Modal>

      <Modal opened={opened} onClose={close} title="Detail Absen" fullScreen={isMobile} centered>
        <Paper shadow="lg" withBorder p="md">
          <List
            mb={20}
            spacing="xs"
            size="sm"
            center
            w={"100%"}
            icon={
              <ThemeIcon color="teal" size={24} radius="xl">
                <IconCircleCheck size={16} />
              </ThemeIcon>
            }
          >
            <List.Item w={"100%"}>
              <Flex justify="space-between" direction={"row"} align={"center"} gap={60} >
                <Stack gap={1} >
                  <Text size="sm" fw={700}>Jam Masuk : </Text><Text  >{absen?.jam_masuk || "-"}</Text>
                </Stack>
                {
                  absen?.jam_masuk ? <Badge color="blue" radius="md">Sudah Absen</Badge> : <Button leftSection={<IconInputCheck size={14} />} loading={isLoadingMap} variant="filled" color="teal" onClick={() => insertAbsen(false)} >
                  Absen Masuk
                </Button>
                }
                
              </Flex>

            </List.Item>

            <List.Item
              icon={
                <ThemeIcon color="red" size={24} radius="xl">
                  <IconCircleDashed size={16} />
                </ThemeIcon>
              }
              w={"100%"}
            >
              <Flex justify="space-between" direction={"row"} align={"center"} gap={63} >
                <Stack gap={1} >
                  <Text size="sm" fw={700}>Jam Keluar : </Text><Text  >{absen?.jam_keluar || "-"}</Text>
                </Stack>
                <Button leftSection={<IconOutbound size={14} />} variant="filled" loading={isLoadingMap} color="red" onClick={() => insertAbsen(true)} >
                  Absen Keluar
                </Button>
              </Flex>
            </List.Item>
            
            {/* <List.Item
              icon={
                <ThemeIcon color="blue" size={24} radius="xl">
                  <IconAlbum size={16} />
                </ThemeIcon>
              }
            ><Text size="sm" fw={700}>Deskripsi : </Text><Text size="sm" >-</Text></List.Item> */}

          </List>
          <Paper w={"100%"} h={"100%"} style={{ overflow: "hidden" }} >
            {
              (!isLoadingMap && currAbsen?.lokasi) ? <MapContainer center={[currAbsen?.lokasi?.latitude, currAbsen?.lokasi?.longitude]} zoom={16} style={{
                height: 432
              }} >
                <TileLayer
                  url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                  subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                />
                {
                  (!isLoadingMap && currAbsen?.lokasi) && <Marker position={[currAbsen?.lokasi?.latitude, currAbsen?.lokasi?.longitude]}   >
                    <Popup>
                      Lokasi Absen mu
                    </Popup>
                  </Marker>
                }

              </MapContainer> : <Skeleton visible={true} height={432} width={"100%"} />
            }

          </Paper>

        </Paper>

      </Modal>
    </Card >
  );
}
